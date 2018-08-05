#!/usr/bin/env node

const { h, render, Component } = require('ink');
const Image = require('ink-image');
const got = require('got');
const fs = require('fs');
const Spinner = require('ink-spinner');
const Args = require('./args');
const probe = require('probe-image-size');
const parrotSizes = require('./parrotsizes');
const path = require('path');
const homedir = require('os').homedir();

class Parrotify extends Component {
  constructor() {
    super();

    this.endpoint = 'https://ppaas.herokuapp.com/partyparrot';
    this.state = {
      parrot: undefined,
      argsEntered: false
    };
  }

  render(props, state) {
    if (!this.state.argsEntered) {
      return;
    }
    if (!this.state.parrot) {
      return (
        <div>
          <Spinner green /> Busy generating your parrot
        </div>
      );
    }
    return <Image src={`${this.state.parrot}`} />;
  }

  getRatio(parrot, position, result) {
    let size;
    switch (position) {
      case 'face':
        size = parrot.width * 0.5;
        break;
      case 'hat':
        size = parrot.height * 0.3;
        break;
      default:
        size = parrot.width * 0.3;
    }
    return Math.min(size / result.width, size / result.height);
  }

  getOffset(parrot, position, result) {
    let x;
    let y;
    switch (position) {
      case 'face':
        x = result.width > result.height ? parrot.width / 8 * -1 : 0;
        y = result.height > result.width ? parrot.height / 2 * -1 : parrot.height / 2 * -1;
        break;
      case 'hat':
        x = parrot.width / 10;
        y = result.height > result.width ? parrot.height / 1.8 * -1 : parrot.height / 2 * -1;
        break;
      default:
        x = parrot.width / 4;
        y = result.height / 5;
    }
    return { x: Math.round(x), y: Math.round(y) };
  }

  requestParrot() {
    got(`${this.endpoint}`, { encoding: null })
      .then(response => {
        let data =
          'data:' + response.headers['content-type'] + ';base64,' + new Buffer(response.body).toString('binary');
        let base64Data = data.replace(/^data:image\/gif;base64,/, '');

        fs.writeFile('parrot.gif', base64Data, 'binary', err => {
          this.setState({
            parrot: 'parrot.gif'
          });
        });
      })
      .catch(error => {
        console.log(error.response.body);
      });
  }

  componentDidMount() {
    console.log('the position is', this.args.position);
    if (this.args.overlay !== '') {
      const res = probe(this.args.overlay);
      res.then(
        result => {
          if (result) {
            const ratio = this.getRatio(parrotSizes[this.args.base], this.args.position, result);
            const imgSizes = { width: Math.round(result.width * ratio), height: Math.round(result.height * ratio) };
            this.endpoint = `${this.endpoint}&overlayHeight=${imgSizes.height}`;
            this.endpoint = `${this.endpoint}&overlayWidth=${imgSizes.width}`;
            this.endpoint = `${this.endpoint}&overlayOffsetX=${this.getOffset(
              parrotSizes[this.args.base],
              this.args.position,
              imgSizes
            ).x}`;
            this.endpoint = `${this.endpoint}&overlayOffsetY=${this.getOffset(
              parrotSizes[this.args.base],
              this.args.position,
              imgSizes
            ).y}`;
          }
          this.requestParrot();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.requestParrot();
    }
  }

  componentWillMount() {
    this.args = new Args().program;
    if (this.args.wizard) {
      const spawn = require('child_process').spawnSync;
      spawn('node', ['parrotInquirer.js'], {
        cwd: __dirname,
        stdio: 'inherit'
      });
      const answers = JSON.parse(fs.readFileSync(`${homedir}/.parrotify/parrot.tmp.json`, 'utf8'));
      fs.unlinkSync(path.resolve(`${homedir}/.parrotify/parrot.tmp.json`));
      
      this.args.base = answers.base;
      this.args.overlay = answers.overlay;
      this.args.delay = answers.delay;
      this.args.position = answers.position;
    }
    this.endpoint = `${this.endpoint}/${this.args.base}`;
    this.endpoint = `${this.endpoint}?overlay=${this.args.overlay}`;
    this.endpoint = `${this.endpoint}&delay=${this.args.delay}`;
    this.setState({
      argsEntered: true
    });
  }
}

render(<Parrotify />);
