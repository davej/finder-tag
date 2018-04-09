'use strict';

const pify = require('pify');
const child = require('child_process');
const stat = pify(require('fs').stat);
const Path = require('path');
const expandTilde = require('expand-tilde');

const exec = (cmd) =>
  new Promise((resolve, reject) => {
    const _exec = child.exec(cmd);
    _exec.addListener('error', reject);
    _exec.addListener('exit', (code) =>
      (code === 0) ? resolve(code) : reject(`cmd failed with code: ${code}`)
    );
  });

const colorMap = {
  clear: '01',
  gray: '03',
  green: '04',
  purple: '06',
  blue: '09',
  yellow: '0A',
  red: '0C',
  orange: '0E'
};

module.exports = function (path, color) {
  if (process.platform !== 'darwin') {
    return Promise.reject(new Error('Only OS X systems are currently supported'));
  }

  if (typeof path !== 'string') {
    return Promise.reject(new TypeError('path should be a string'));
  }

  if (!(color in colorMap)) {
    return Promise.reject(new TypeError('color must be one of: clear, gray, green, purple, blue, yellow, red or orange'));
  }

  path = expandTilde(path);

  if (!Path.isAbsolute(path)) {
    path = Path.resolve(path);
  }

  const hexString = '0'.repeat(18) + colorMap[color] + '0'.repeat(44);
  const command = `xattr -wx com.apple.FinderInfo ${hexString} ${path.replace(/ /g, '\\ ')}`;

  return stat(path).then(
    () => exec(command)
  ).then(code => ({
    code: code,
    command: command,
    path: path,
    tag: color
  }));
};
