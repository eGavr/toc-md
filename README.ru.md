# toc-md [![Build Status](https://travis-ci.org/eGavr/toc-md.svg)](https://travis-ci.org/eGavr/toc-md) [![Coverage Status](https://img.shields.io/coveralls/eGavr/toc-md.svg)](https://coveralls.io/r/eGavr/toc-md?branch=master) [![Dependency Status](https://david-dm.org/eGavr/toc-md.svg)](https://david-dm.org/eGavr/toc-md) [![devDependency Status](https://david-dm.org/eGavr/toc-md/dev-status.svg)](https://david-dm.org/eGavr/toc-md#info=devDependencies)

Создает оглавление для markdown-файлов.

Приложение может быть использовано для английского и русского языков.

<!-- TOC -->
- [Установка](#Установка)
- [Использование](#Использование)
  - [API](#api)
    - [toc.insert](#tocinsert)
    - [toc.clean](#tocclean)
    - [Пример](#Пример)
  - [CLI](#cli)
    - [Добавление оглавления](#Добавление-оглавления)
    - [Очистка оглавления](#Очистка-оглавления)
- [Настройка оглавления](#Настройка-оглавления)
  - [Игнорирование заголовков](#Игнорирование-заголовков)
  - [Отображение заголовков](#Отображение-заголовков)

<!-- TOC END -->

## Установка

```bash
$ npm install toc-md
```

## Использование

Добавьте HTML-комментарий `<!-- TOC -->` в markdown-файл.

Оглавление будет создано в этом месте для последующих заголовков.

### API

```js
var toc = require('toc-md');
```

#### toc.insert

**@param** *{String}* - исходный текст, в который необходимо добавить оглавление (обязательно должен содержать HTML-комментарий `<!--TOC-->`)<br>
**@param** *{Object}* - опции:<br>

 * **maxDepth: Number** - `toc-md` будет использовать заголовки, вложенность которых не больше указанного значения (по умолчанию: `6`).

 * **bullet: Char** - символ обозначения (`*`, `-`, `+`) элемента сгенерированного оглавления (по умолчанию: `-`).

**@param** *{Function}* - callback

#### toc.clean

**@param** *{String}* - исходный текст, который необходимо очистить от оглавления<br>
**@param** *{Function}* - callback

#### Пример

```js
var fs = require('fs'),
    toc = require('toc-md');

var source = fs.readFileSync('markdown-без-оглавления.md', 'utf-8');

var options = {
    maxDepth: 6
};

toc.insert(source, options, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        fs.writeFileSync('markdown-с-оглавлением.md', res);
    }
});

source = fs.readFileSync('markdown-с-оглавлением.md', 'utf-8');

toc.clean(source, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        fs.writeFileSync('markdown-без-оглавления.md', res);
    }
});
```

### CLI

```bash
$ toc-md --help
Создает оглавление для markdown-файлов

Использование:
  toc-md [ОПЦИИ] [АРГУМЕНТЫ]

Опции:
  -h, --help : Помощь
  -v, --version : Показывает номер версии
  -m MAXDEPTH, --max-depth=MAXDEPTH : Использует заголовки, вложенность которых не больше указанного значения (по умолчанию: 6)
  -b BULLET, --bullet=BULLET : Cимвол обозначения ('*', '-', '+') элемента сгенерированного оглавления (по умолчанию: '-')
  -c, --clean : Очищает оглавление

Arguments:
  SOURCE : Путь к входному markdown-файлу (он должен содержать HTML-комментарий <!-- TOC -->) (обязательный аргумент)
  TARGET : Путь к выходному markdown-файлу
```

Если аргумент `TARGET` не указан, то результат будет записан в `SOURCE`.

<!-- TOC:ignore -->
#### Пример

##### Добавление оглавления

```bash
$ toc-md путь/к/входному/markdown-файлу путь/к/выходному/markdown-файлу --max-depth=4 --bullet='*'

$ toc-md путь/к/markdown-файлу -m 4 -b '*'
```

##### Очистка оглавления

```bash
$ toc-md путь/к/входному/markdown-файлу путь/к/выходному/markdown-файлу --clean

$ toc-md путь/к/markdown-файлу -c
```

## Настройка оглавления

### Игнорирование заголовков

Можно игнорировать заголовок при генерации оглавления с помощью HTML-комментария<br>`<!-- TOC:ignore -->`, если добавить его перед объявлением заголовка.

```md
<!-- TOC:ignore -->
# ololo
```

Заголовок `ololo` не будет добавлен в оглавление.

### Отображение заголовков

Можно заменить текст отображаемого заголовка в оглавлении с помощью HTML-комментария<br>`<!-- TOC:display:header_text -->`, если добавить его перед объявлением заголовка:

```md
<!-- TOC:display:blah -->
# ololo
```

Заголовок `ololo` отобразится в оглавлении как `blah`.
