const got = require('got');
const inquirer = require('inquirer');

class ParrotInquirer {
    constructor() {}

    getBaseParrotChoices() {
        return got('https://ppaas.herokuapp.com/baseparrots').then(res => {
            return JSON.parse(res.body.replace(/'/g, '"'));
        });
    }

    init() {
        return this.getBaseParrotChoices().then(choices => {
            return inquirer.prompt([{
                type: 'list',
                name: 'base',
                message: 'What base parrot do you want?',
                choices: choices
            }, {
                type: 'input',
                name: 'overlay',
                message: 'Which image would you like to overlay?'
            }, {
                type: 'list',
                name: 'delay',
                message: 'How hard does the parrot party?',
                choices: ['meh...', 'kinda hard', 'HARD AF'],
                filter: function (val) {
                    if (val === 'meh...') {
                        return '50';
                    } else if (val === 'kinda hard') {
                        return '30';
                    } else {
                        return '20';
                    }
                }
            }]).then(answers => {
                return answers;
            });
        });
    }
}

module.exports = ParrotInquirer;