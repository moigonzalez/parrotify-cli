const program = require('commander');

class Args {
	constructor() {
		program
			.version('0.1.0')
			.option('-b --base [base]', 'Base parrot to use', /^(boredparrot|congaparrot|mega|middleparrot|parrot|rightparrot)$/i, 'parrot')
			.option('-o --overlay [overlay]', 'Image to place on top of the parrot', '')
			.option('-x --posX [posX]', 'X Position of the overlay', parseInt)
			.option('-y --posY [posY]', 'Y Position of the overlay', parseInt)
			.option('-h --overlayHeight [overlayHeight]', 'Height of the overlay', '')
			.option('-w --overlayWidth [overlayWidth]', 'Width of the overlay', '')
			.option('-d --delay [delay]', 'How hard does the parrot party?', '')
			.parse(process.argv);
		this.program = program;
	}
}

module.exports = Args;

