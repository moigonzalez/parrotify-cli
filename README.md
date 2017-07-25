# parrotify-cli

Custom parrots from your command line :tada:

![parrotify-cli demo](images/demo-mega.gif "parrotify-cli demo")

Usage
-----

```
> parrotify [options]


  Options:

    -V, --version                       output the version number
    -b --base [base]                    Base parrot to use
    -o --overlay [overlay]              Image to place on top of the parrot
    -x --posX [posX]                    X Position of the overlay
    -y --posY [posY]                    Y Position of the overlay
    -h --overlayHeight [overlayHeight]  Height of the overlay
    -w --overlayWidth [overlayWidth]    Width of the overlay
    -d --delay [delay]                  How hard does the parrot party?
    -h, --help                          output usage information

```

TODO
-----

- Fix negative values for posX and posY whenever [this is fixed](https://github.com/tj/commander.js/issues/61)
- Error handling whenever user data is not entered properly (missing overlay and positions defined)
- Give proper default values to positions
- Develop something more user friendly than positioning with coordinates (show overlay as hat, hand item, etc)

-----

Built using [Parrot As A Service](https://github.com/francoislg/PPaaS)

