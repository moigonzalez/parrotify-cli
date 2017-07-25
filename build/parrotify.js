#!/usr/bin/env node

const { h, render, Component } = require('ink');
const Image = require('ink-image');
const got = require('got');
const fs = require('fs');
const Spinner = require('ink-spinner');
const Args = require('./args');

class Parrotify extends Component {

	constructor() {
		super();

		this.endpoint = 'https://ppaas.herokuapp.com/partyparrot';
		this.state = {
			'parrot': undefined
		};
	}

	render(props, state) {
		if (!this.state.parrot) {
			return h(
				'div',
				null,
				h(Spinner, { green: true }),
				' Busy generating your parrot'
			);
		}

		return h(Image, { src: `${this.state.parrot}` });
	}

	componentDidMount() {
		const self = this;
		got(`${this.endpoint}`, { encoding: null }).then(response => {
			let data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(response.body).toString('binary');
			let base64Data = data.replace(/^data:image\/gif;base64,/, '');

			fs.writeFile('parrot.gif', base64Data, 'binary', function (err) {
				self.setState({
					parrot: 'parrot.gif'
				});
			});
		}).catch(error => {
			console.log(error.response.body);
		});
	}

	componentWillMount() {
		const args = new Args().program;
		this.endpoint = `${this.endpoint}/${args.base}`;
		this.endpoint = `${this.endpoint}?overlay=${args.overlay}`;
		this.endpoint = `${this.endpoint}&delay=${args.delay}`;
		this.endpoint = `${this.endpoint}&overlayOffsetX=${args.posX}`;
		this.endpoint = `${this.endpoint}&overlayOffsetY=${args.posY}`;
		this.endpoint = `${this.endpoint}&overlayHeight=${args.overlayHeight}`;
		this.endpoint = `${this.endpoint}&overlayWidth=${args.overlayWidth}`;
	}
}

render(h(Parrotify, null));