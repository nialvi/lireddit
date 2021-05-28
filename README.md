# lireddit

## Run project localy in development mode

- start posgresql server
  - `pg_ctl -D /usr/local/var/postgres start`
- start redis server
  - `redis-server /usr/local/etc/redis.conf`
- start watch mode in server lireddit
  - `npm run watch`
- start server nodejs
  - `npm run dev`
- start client nextjs app
  - `npm run dev`

## Routes

- server
  - `localhost:4000/graphql`
- client
  - `localhost:3000/register`
