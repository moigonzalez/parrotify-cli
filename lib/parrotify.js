const { h, render, Component } = require('ink');
const Image = require('ink-image');
const got = require('got');
const fs = require('fs');
const Spinner = require('ink-spinner');
const Args = require('./args');
const probe = require('probe-image-size');

class Parrotify extends Component {
  constructor() {
    super();

    this.endpoint = 'https://ppaas.herokuapp.com/partyparrot';
    this.state = {
      parrot: undefined
    };
  }

  render(props, state) {
    if (!this.state.parrot) {
      return (
        <div>
          <Spinner green /> Busy generating your parrot
        </div>
      );
    }
    return <Image src={`${this.state.parrot}`} />;
  }

  getRatio(base, position, result) {
    let size;
    if (base === 'mega') {
      if (position === 'face') {
        size = 329 * 0.5;
      } else if (position === 'hat') {
        size = 229 * 0.3;
      } else {
        size = 329 * 0.3;
      }
    } else {
      if (position === 'face') {
        size = 39 * 0.5;
      } else if (position === 'hat') {
        size = 25 * 0.2;
      } else {
        size = 39 * 0.3;
      }
    }
    return Math.min(size / result.width, size / result.height);
  }

  getOffset(base, position, size) {
    let x;
    let y;
    if (base === 'mega') {
      if (position === 'face') {
        x = size.width > size.height ? 329 / 8 * -1 : 0;
        y = size.height > size.width ? 229 / 2 * -1 : 229 / 2 * -1;
      } else if (position === 'hat') {
        x = 329/10;
        y = size.height > size.width ? 229 / 1.8 * -1 : 229 / 2 * -1;
      } else {
        x = 329 / 4;
        y = size.height > size.width ? size.height / 5 : size.height / 5;
      }
    } else {
      if (position === 'face') {
        x = size.width > size.height ? 35 / 8 * -1 : 0;
        y = size.height > size.width ? 25 / 2 * -1 : 25 / 2 * -1;
      } else if (position === 'hat') {
        x = 35 / 10;
        y = size.height > size.width ? 25 / 1.8 * -1 : 25 / 2 * -1;
      } else {
        x = 35 / 4;
        y = size.height > size.width ? size.height / 5 : size.height / 5;
      }
    }
    return { x: Math.round(x), y: Math.round(y) };
  }

  componentDidMount() {
    const self = this;
    if (this.args.overlay !== '') {
      probe(this.args.overlay, (err, result) => {
        if (result) {
          const ratio = this.getRatio(this.args.base, this.args.position, result);
          const imgSizes = { width: Math.round(result.width * ratio), height: Math.round(result.height * ratio) };
          this.endpoint = `${this.endpoint}&overlayHeight=${imgSizes.height}`;
          this.endpoint = `${this.endpoint}&overlayWidth=${imgSizes.width}`;
          this.endpoint = `${this.endpoint}&overlayOffsetX=${this.getOffset(
            this.args.base,
            this.args.position,
            imgSizes
          ).x}`;
          this.endpoint = `${this.endpoint}&overlayOffsetY=${this.getOffset(
            this.args.base,
            this.args.position,
            imgSizes
          ).y}`;
          got(`${this.endpoint}`, { encoding: null })
            .then(response => {
              let data =
                'data:' + response.headers['content-type'] + ';base64,' + new Buffer(response.body).toString('binary');
              let base64Data = data.replace(/^data:image\/gif;base64,/, '');

              fs.writeFile('parrot.gif', base64Data, 'binary', function(err) {
                self.setState({
                  parrot: 'parrot.gif'
                });
              });
            })
            .catch(error => {
              console.log(error.response.body);
            });
        }
      });
    }
  }

  componentWillMount() {
    const args = new Args().program;
    this.endpoint = `${this.endpoint}/${args.base}`;
    this.endpoint = `${this.endpoint}?overlay=${args.overlay}`;
    this.endpoint = `${this.endpoint}&delay=${args.delay}`;
    this.args = args;
  }
}

render(<Parrotify />);
