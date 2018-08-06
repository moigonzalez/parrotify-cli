# parrotify-cli

Custom parrots from your command line :tada:

![parrotify-cli demo](images/parrotify-demo.gif "parrotify-cli demo")

## Installation

```
npm install -g parrotify-cli
```

Requires node > 8

To display the parrot in your command line you need iTerm > 3, a parrot.gif will be generated in your current directory anyway.

## Usage

Just running

``` 
> parrotify
```

Will start the wizard ✨ which will guide you through the parrot generation process 🦄

You can also give these options:

```
> parrotify [options]


  Options:

    -V, --version             output the version number
    -w --wizard               Use the wizard (inquirer) to create your custom parrot ⚡️
    -b --base [base]          Base parrot to use
    -o --overlay [overlay]    Image to place on top of the parrot
    -p --position [position]  Position of the overlay (face, hand or hat)
    -d --delay [delay]        How hard does the parrot party?
    -h, --help                output usage information

```

### Positioning

The overlay will autoposition itself based on it's ratio and chosen base (experimental).

```
> parrotify -o http://vignette3.wikia.nocookie.net/runescape2/images/0/0a/Wizard_hat_\(t\)_detail.png -p hat -b mega
```

Will generate: 

![parrotify hat demo](http://i.imgur.com/AolpCOP.gif "parrotify hat demo")


A gif file will be generated in the current path showing the result parrot. By default it will be called parrot.gif

## TODO

- Error handling whenever user data is not entered properly (missing overlay and positions defined)

- Give an error when node version < 8
- Prevent replacing existing parrot.gif in the folder.
- Customise overlay size option.

## Contributing

Please see our [contributing.md](https://github.com/moigonzalez/parrotify-cli/blob/master/contributing.md)

-----

[PARTY OR DIE](http://cultofthepartyparrot.com/)

Built using [Parrot As A Service](https://github.com/francoislg/PPaaS)

