import test from 'ava';
import fn from './index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nm = path.join(__dirname, 'node_modules');

let absolutePath;
let relativePath;
let tildePath;

test('absolute path', t => {
  const pkg = 'ava';
  absolutePath = path.join(nm, pkg);
  return fn(absolutePath, 'blue').then(res => {
    t.is(res.code, 0);
    t.is(res.tag, 'blue');
    t.is(res.path, absolutePath);
    t.true(res.command.length > 10);
  }, t.fail);
});

test('relative path', t => {
  const pkg = 'pify';
  relativePath = './node_modules/' + pkg;
  return fn(relativePath, 'green').then(res => {
    t.is(res.code, 0);
    t.is(res.tag, 'green');
    t.is(res.path, path.join(nm, pkg));
    t.true(res.command.length > 10);
  }, t.fail);
});

test('tilde path', t => {
  tildePath = '~/Desktop';
  return fn(tildePath, 'yellow').then(res => {
    t.is(res.code, 0);
    t.is(res.tag, 'yellow');
    t.true(res.path.includes('/Users/'));
    t.true(res.command.length > 10);
  }, t.fail);
});

test('path does not exist', t =>
  fn(path.join(__dirname, 'node_modules/doesnotexist'), 'blue').then(
    t.fail,
    err => t.is(err.code, 'ENOENT')
  ));

test('color does not exist', t =>
  fn(absolutePath, 'hotpink').then(t.fail, err =>
    t.true(err.message.includes('color must be one of'))
  ));

test('path is not string', t =>
  fn(92403, 'hotpink').then(t.fail, err =>
    t.true(err.message.includes('path should be a string'))
  ));

test.after('clear test tags', () =>
  Promise.all([
    fn(absolutePath, 'clear'),
    fn(relativePath, 'clear'),
    fn(tildePath, 'clear')
  ])
);
