const { h, render, Component } = require('ink');
const Image = require('ink-image');
const got = require('got');
const fs = require('fs');
const Spinner = require('ink-spinner');

class Parrotify extends Component {

	constructor() {
		super();

		this.basicCall = 'https://ppaas.herokuapp.com/partyparrot';
		this.state = {
			'parrot': undefined
		};
	}

	render(props, state) {
		if (!this.state.parrot) {
			// Note that you can return false it you want nothing to be put in the dom
			// This is also your chance to render a spinner or something...
			return h(
				'div',
				null,
				h(Spinner, { green: true }),
				' Busy generating your parrot'
			);
		}
		return h(Image, { preserveAspectRatio: true, src: `${this.state.parrot}` });
	}

	componentDidMount() {
		const self = this;
		got(`${this.basicCall}`, { encoding: null }).then(response => {
			let data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(response.body).toString('binary');
			let base64Data = data.replace(/^data:image\/gif;base64,/, '');

			fs.writeFile('out.gif', base64Data, 'binary', function (err) {
				self.setState({
					parrot: 'out.gif'
				});
			});
		}).catch(error => {
			console.log(error.response.body);
		});
	}
}

const unmount = render(h(Parrotify, null));