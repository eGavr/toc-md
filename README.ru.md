# md-toc [![Build Status](https://travis-ci.org/eGavr/md-toc.svg)](https://travis-ci.org/eGavr/md-toc) [![Coverage Status](https://img.shields.io/coveralls/eGavr/md-toc.svg)](https://coveralls.io/r/eGavr/md-toc?branch=master) [![Dependency Status](https://david-dm.org/eGavr/md-toc.svg)](https://david-dm.org/eGavr/md-toc) [![devDependency Status](https://david-dm.org/eGavr/md-toc/dev-status.svg)](https://david-dm.org/eGavr/md-toc#info=devDependencies)

Создает оглавление для markdown-файлов.

Приложение может быть использовано для английского и русского языков.

## Оглавление
<!-- TOC -->
* <a href="#установка">Установка</a>
* <a href="#использование">Использование</a>
  * <a href="#api">API</a>
    * <a href="#опции">Опции</a>
  * <a href="#cli">CLI</a>
    * <a href="#пример">Пример</a>


<a name="установка"></a>
## Установка

```bash
$ npm install md-toc
```

<a name="использование"></a>
## Использование

Добавьте HTML-комментарий `<!-- TOC -->` в markdown-файл.

Оглавление будет создано в этом месте для последующих заголовков.

<a name="api"></a>
### API

```js
var fs = require('fs'),
    toc = require('md-toc');

var source = fs.readFileSync('markdown-без-оглавления.md', 'utf-8');

var options = {
    maxDepth: 6
};

toc(source, options, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        fs.writeFileSync('markdown-с-оглавлением.md', res);
    }
});
```

<a name="опции"></a>
#### Опции

* **maxDepth: Number**

`md-toc` будет использовать заголовки, вложенность которых не больше указанного значения (по умолчанию: `6`).

<a name="cli"></a>
### CLI

```bash
$ md-toc --help
Создает оглавление для markdown-файлов

Использование:
  md-toc [ОПЦИИ] [АРГУМЕНТЫ]

Опции:
  -h, --help : Помощь
  -v, --version : Показывает номер версии
  -m MAXDEPTH, --max-depth=MAXDEPTH : Использует заголовки, вложенность которых не больше указанного значения (по умолчанию: 6)

Arguments:
  SOURCE : Путь к входному markdown-файлу (он должен содержать HTML-комментарий <!-- TOC -->) (обязательный аргумент)
  TARGET : Путь к выходному markdown-файлу
```

Если аргумент `TARGET` не указан, то содержание будет добавлено в `SOURCE`.

<a name="пример"></a>
#### Пример

```bash
$ md-toc путь/к/входному/markdown-файлу путь/к/выходному/markdown-файлу --max-depth=4

$ md-toc путь/к/markdown-файлу -m 4
```
