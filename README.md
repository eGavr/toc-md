# toc-md [![Build Status](https://travis-ci.org/eGavr/toc-md.svg)](https://travis-ci.org/eGavr/toc-md) [![Coverage Status](https://img.shields.io/coveralls/eGavr/toc-md.svg)](https://coveralls.io/r/eGavr/toc-md?branch=master) [![Dependency Status](https://david-dm.org/eGavr/toc-md.svg)](https://david-dm.org/eGavr/toc-md) [![devDependency Status](https://david-dm.org/eGavr/toc-md/dev-status.svg)](https://david-dm.org/eGavr/toc-md#info=devDependencies)

Generates a markdown TOC (table of contents).

The tool can be used for English and Russian languages.

## Table of contents
<!-- TOC -->
* <a href="#install">Install</a>
* <a href="#usage">Usage</a>
  * <a href="#api">API</a>
    * <a href="#options">Options</a>
  * <a href="#cli">CLI</a>
    * <a href="#example">Example</a>


<a name="install"></a>
## Install

```bash
$ npm install toc-md
```

<a name="usage"></a>
## Usage

Add an HTML comment `<!-- TOC -->` to a markdown file.

A TOC will be generated exactly on this place for the following headers.

<a name="api"></a>
### API

```js
var fs = require('fs'),
    toc = require('toc-md');

var source = fs.readFileSync('markdown-without-toc.md', 'utf-8');

var options = {
    maxDepth: 6
};

toc(source, options, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        fs.writeFileSync('markdown-with-toc.md', res);
    }
});
```

<a name="options"></a>
#### Options

* **maxDepth: Number**

Makes `toc-md` use headings whose depth is at most the specified value (default: `6`).

<a name="cli"></a>
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

Arguments:
  SOURCE : Path to an input markdown file (it must contain the HTML comment <!-- TOC -->) (required)
  TARGET : Path to an output markdown file
```

If argument `TARGET` is not specified, a TOC will be added to `SOURCE`.

<a name="example"></a>
#### Example

```bash
$ toc-md path/to/input/markdown path/to/output/markdown --max-depth=4

$ toc-md path/to/markdown -m 4
```
