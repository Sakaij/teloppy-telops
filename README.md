# Teloppy Telops

## npmコマンド

```bash
# node_modulesのインストール
$ npm install

# 指定したテロップフォルダをステージング用にビルドする
$ npm run build-staging -- --env id=[テロップのフォルダ名]

# 指定したテロップフォルダを本番環境用にビルドする
$ npm run build-production -- --env id=[テロップのフォルダ名]

# 指定したテロップフォルダをステージング用にビルドした後、ステージング環境にアップする
$ npm run deploy-staging -- --env id=[テロップのフォルダ名]

# 指定したテロップフォルダを本番環境用にビルドした後、本番環境にアップする
$ npm run deploy-staging -- --env id=[テロップのフォルダ名]

# telopsフォルダの全てを、ステージング用にビルドした後、ステージング環境にアップする
$ npm run deploy-staging-all

# telopsフォルダの全てを、本番環境用にビルドした後、本番環境環境にアップする
$ npm run deploy-production-all

```

## ディレクトリの説明

### `assets`
全てのテロップファイル共通で、使うフォルダ

### `telops`
テロップ用のフォルダ　telops/[テロップid]/～の構成になっている。テロップidフォルダ内の、index.ejs、main.ts、style.scssはエントリーポイントであり、必須ファイルである

### `dist`
本番環境用に出力されるフォルダ(gitでは管理対象外)

### `plugins`
エントリーポイントであるmain.tsで使うプラグイン

### `utils`
エントリーポイント内で使うscript

## サムネイルのスクリーンショットを取るとき

```javascript
(()=>{
    document.querySelector('#fix-logo').remove();
    document.querySelector('#guide').remove();
})();

```

をデベロッパーツールで実行して、530px × 300px でスクリーンショットする


