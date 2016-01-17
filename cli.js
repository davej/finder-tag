#!/usr/bin/env node
'use strict';
var meow = require('meow');
var finderTag = require('./');

var cli = meow([
  'Usage',
  '  $ finder-tag [path] [color]',
  '',
  'Available Colors:',
  '  `gray`, `green`, `purple`, `blue`, `yellow`, `red`, `orange`',
  '  To clear all tags pass \`clear\` as the color',
  '',
  'Examples',
  '  $ finder-tag ~/Desktop blue',
  '  /Users/dave/Downloads is tagged `blue`',
  '  $ finder-tag app.js yellow',
  '  /root/site/scripts/app.js is tagged `yellow`',
  '  $ finder-tag app.js clear',
  '  /root/site/scripts/app.js all tags have been cleared'
]);

finderTag(cli.input[0], cli.input[1]).then(
  (obj) =>
    obj.tag === 'clear' ?
      console.log(`${obj.path} all tags have been cleared`) :
      console.log(`${obj.path} is tagged \`${obj.tag}\``)
);
