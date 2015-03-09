# toc-md [![Build Status](https://travis-ci.org/eGavr/toc-md.svg)](https://travis-ci.org/eGavr/toc-md) [![Coverage Status](https://img.shields.io/coveralls/eGavr/toc-md.svg)](https://coveralls.io/r/eGavr/toc-md?branch=master) [![Dependency Status](https://david-dm.org/eGavr/toc-md.svg)](https://david-dm.org/eGavr/toc-md) [![devDependency Status](https://david-dm.org/eGavr/toc-md/dev-status.svg)](https://david-dm.org/eGavr/toc-md#info=devDependencies)

Generates a markdown TOC (table of contents).

The tool can be used for English and Russian languages.

<!-- TOC -->
- [Install](#install)
- [Usage](#usage)
  - [API](#api)
    - [toc.insert](#tocinsert)
    - [toc.clean](#tocclean)
    - [Example](#example)
  - [CLI](#cli)
    - [Insert](#insert)
    - [Clean](#clean)
- [Advanced TOC](#advanced-toc)
  - [Ignoring of headers](#ignoring-of-headers)
  - [Displaying of headers](#displaying-of-headers)

<!-- TOC END -->

## Install

```bash
$ npm install toc-md
```

## Usage

Add an HTML comment `<!-- TOC -->` to a markdown file.

A TOC will be generated exactly on this place for the following headers.

### API

```js
var toc = require('toc-md');
```

#### toc.insert

**@param** *{String}* - a source where to insert a TOC (must contain the HTML comment `<!-- TOC -->`)<br>
**@param** *{Object}* - options:<br>

 * **maxDepth: Number** - makes `toc-md` use headings whose depth is at most the specified value (default: `6`).

 * **bullet: Char** - the bullet (`*`, `-`, `+`) to use for each element in the generated TOC (defaults: `-`).

**@param** *{Function}* - callback

#### toc.clean

**@param** *{String}* - a source whereof to clean a TOC<br>
**@param** *{Function}* - callback

#### Example

```js
var fs = require('fs'),
    toc = require('toc-md');

var source = fs.readFileSync('markdown-without-toc.md', 'utf-8');

var options = {
    maxDepth: 6
};

toc.insert(source, options, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        fs.writeFileSync('markdown-with-toc.md', res);
    }
});

source = fs.readFileSync('markdown-with-toc.md', 'utf-8');

toc.clean(source, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        fs.writeFileSync('markdown-without-toc.md', res);
    }
});
```

### CLI

```bash
$ toc-md --help
Generates a markdown TOC (table of contents)

Usage:
  toc-md [OPTIONS] [ARGS]

Options:
  -h, --help : Help
  -v, --version : Shows the version number
  -m MAXDEPTH, --max-depth=MAXDEPTH : Uses headings whose depth is at most the specified value (default: 6)
  -b BULLET, --bullet=BULLET : The bullet ('*', '-', '+') to use for each element in the generated TOC (default: '-')
  -c, --clean : Cleans a TOC

Arguments:
  SOURCE : Path to an input markdown file (it must contain the HTML comment <!-- TOC -->) (required)
  TARGET : Path to an output markdown file
```

If argument `TARGET` is not specified, a result will be written to `SOURCE`.

<!-- TOC:ignore -->
#### Example

##### Insert

```bash
$ toc-md path/to/input/markdown path/to/output/markdown --max-depth=4 --bullet='*'

$ toc-md path/to/markdown -m 4 -b '*'
```

##### Clean

```bash
$ toc-md path/to/input/markdown path/to/output/markdown --clean

$ toc-md path/to/markdown -c
```

## Advanced TOC

### Ignoring of headers

There is an ability to ignore headers in a TOC by adding of the HTML comment<br>`<!-- TOC:ignore -->` before a declaration of a header:

```md
<!-- TOC:ignore -->
# ololo
```

The header `ololo` will not be displayed in a TOC.

### Displaying of headers

There is an ability to change a displaying of a header in a TOC by adding of the HTML comment<br>`<!-- TOC:display:header_text -->` before a declaration of a header:

```md
<!-- TOC:display:blah -->
# ololo
```

The header `ololo` will be displayed in a TOC as `blah`.
