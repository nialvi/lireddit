import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import path from "path";

import { __PROD__, COOKIE_QID } from "./constants";
import { MyContext } from "./types";

import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Updoot } from "./entities/Updoot";

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Updoot],
  });

  connection.runMigrations();

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

  app.use(
    session({
      name: COOKIE_QID,
      store: new RedisStore({ client: redis, disableTouch: true }),
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __PROD__, // cookie works only on https
        domain: __PROD__ ? ".codeponder.com" : undefined,
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`server started on localhost:${process.env.PORT}`);
  });
};

main().catch((e) => console.error(e));
