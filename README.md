# chachat

## OverView

```
Vue3 x TS x WebSocket を使った簡易 Chat WEB アプリケーションです。

vue-class-component デコレータを使って class 構文で書いてましたが、以下の RFC リジェクトの理由のため書き直す
https://github.com/vuejs/rfcs/pull/17#issuecomment-494242121

=> 9/12 Com@ositionAPI に書き換えて、vue-class-component は削除した
```

## Project setup

```
npm install
```

## Copy env

```
cp .env.example .env
```

and rewrite env contents

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### prod build check

```
npm run build
-> dist下にindex.htmlができる
```

local で確認したい場合は

```
%npm install -g http-server
%cd chachat/dist
%http-server
や
%cd chachat/dist
%php -S localhost:8080
などでweb-serverを立ててアクセスして確認する
```

### release

```
prod branch に push すれば自動で Netlify の方で build->deploy する
```
