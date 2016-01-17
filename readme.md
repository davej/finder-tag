# finder-tag [![Build Status](https://travis-ci.org/davej/finder-tag.svg?branch=master)](https://travis-ci.org/davej/finder-tag)

> Add color tags to files and folders on Mac OS X

## CLI

```
$ npm install --global finder-tag
```

```
$ finder-tag --help

  Add color tags to files and folders on Mac OS X

  Usage
    $ finder-tag [path] [color]

  Available Colors:
    gray, green, purple, blue, yellow, red, orange

    To clear all tags pass `clear` as the color

  Examples
    $ finder-tag ~/Desktop blue
    /Users/dave/Downloads is tagged `blue`
    $ finder-tag app.js yellow
    /root/site/scripts/app.js is tagged `yellow`
    $ finder-tag app.js clear
    /root/site/scripts/app.js all tags have been cleared
```

## Using Programmatically

### Install

```
$ npm install --save finder-tag
```


### Usage

```js
const finderTag = require('finder-tag');

finderTag('/some/path', 'blue').then(
  (result) => console.log(result)
  // { code: 0,
  //   command: 'xattr ...',
  //   path: '/some/path',
  //   tag: 'blue' }
);
```


## API

### finderTag(path, color)

#### path

Type: `string`

The filesystem path to apply the tag to.

#### color

Type: `string`

Available Colors:
  * 'gray'
  * 'green'
  * 'purple'
  * 'blue'
  * 'yellow'
  * 'red'
  * 'orange'
  * 'clear' - This will remove all tags


## License

MIT © [DaveJ](https://twitter.com/DaveJ)
