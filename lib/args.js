const program = require('commander');

class Args {
  constructor() {
    program
      .version('1.0.7')
      .option('-w --wizard', 'Use the wizrd to create your parrot!')
      .option(
        '-b --base [base]',
        'Base parrot to use',
        /^(boredparrot|congaparrot|mega|middleparrot|parrot|rightparrot)$/i,
        'parrot'
      )
      .option('-o --overlay [overlay]', 'Image to place on top of the parrot', '')
      .option('-p --position [position]', 'Position of the overlay (face, hat or hand)', /^(face|hat|hand)$/i, 'face')
      .option('-d --delay [delay]', 'How hard does the parrot party?', '')
      .parse(process.argv);
    this.program = program;
  }
}

module.exports = Args;
