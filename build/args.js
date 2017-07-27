const program = require('commander');

class Args {
  constructor() {
    program.version('0.1.0').option('-b --base [base]', 'Base parrot to use', /^(boredparrot|congaparrot|mega|middleparrot|parrot|rightparrot)$/i, 'parrot').option('-o --overlay [overlay]', 'Image to place on top of the parrot', '').option('-p --position [position]', 'Position of the overlay (face, hat or hand)', /^(face|hat|hand)$/i, 'face').option('-d --delay [delay]', 'How hard does the parrot party?', '').parse(process.argv);
    this.program = program;
  }
}

module.exports = Args;