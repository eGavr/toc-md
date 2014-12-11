# md-toc [![Build Status](https://travis-ci.org/eGavr/md-toc.svg)](https://travis-ci.org/eGavr/md-toc) [![Coverage Status](https://img.shields.io/coveralls/eGavr/md-toc.svg)](https://coveralls.io/r/eGavr/md-toc?branch=master) [![Dependency Status](https://david-dm.org/eGavr/md-toc.svg)](https://david-dm.org/eGavr/md-toc) [![devDependency Status](https://david-dm.org/eGavr/md-toc/dev-status.svg)](https://david-dm.org/eGavr/md-toc#info=devDependencies)

Generates a markdown TOC (table of contents).

The tools can be used both for English and Russian languages.

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
$ npm install md-toc
```

<a name="usage"></a>
## Usage

Wherever you want, add an HTML comment `<!-- TOC -->` to a markdown file.
A TOC will be generated exactly on this place for the following headers.

<a name="api"></a>
### API

```js
var fs = require('fs'),
    toc = require('md-toc');

var source = fs.readFileSync('markdown-without-toc.md', 'utf-8');

var options = {
    ignoreFirstHeader: false,
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

* **ignoreFirstHeader: Boolean**

Makes `md-toc` ignore the first header (default: `false`).

* **maxDepth: Number**

Sets the maximum depth of TOC's headers (default: `6`).

<a name="cli"></a>
### CLI

```bash
$ md-toc --help
Generates a markdown TOC (table of contents)

Usage:
  md-toc [OPTIONS] [ARGS]


Options:
  -h, --help : Help
  -v, --version : Shows the version number
  -i, --ignore-first-header : Ignores the first header during the generation of a TOC
  -m MAXDEPTH, --max-depth=MAXDEPTH : Sets the maximum depth of TOC's headers (default: 6)

Arguments:
  SOURCE : Path to an input markdown file (it must contain the HTML comment <!-- TOC -->) (required)
  TARGET : Path to an output markdown file
```

<a name="example"></a>
#### Example

```bash
$ md-toc path/to/input/markdown path/to/output/markdown --ignore-first-header --max-depth=4

$ md-toc path/to/markdown -i -m 4
```
