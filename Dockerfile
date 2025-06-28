# ベースイメージ（Node 18系の公式イメージ）
FROM node:22-slim

# 作業ディレクトリを作る
WORKDIR /app

# package.json と package-lock.json（あれば）をコピー
COPY ./app/package*.json ./

# 依存関係をインストール
RUN npm install --production

# アプリのソースをコピー
COPY ./app/ .

# コンテナ起動時に実行するコマンド
CMD ["node", "main.js"]

# もしポート3000を使うなら
EXPOSE 11451
