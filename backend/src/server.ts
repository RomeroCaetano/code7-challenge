import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import routes from "./routes";
// import dotenv from "dotenv";
import bodyParser from "body-parser";
import { pagination } from "typeorm-pagination";

// const result = dotenv.config();
// console.log(result);
const port = process.env.APP_PORT || 8000;

const typeOrmOptions: any = isHeroku();
console.log(process.env);
function isHeroku() {
  if (process.env.POSTGRES_DB_HOST) {
    return {
      type: "postgres",
      host: process.env.POSTGRES_DB_HOST,
      port: process.env.POSTGRES_DB_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: ["src/model/*.ts"],
    };
  }
  return null;
}

const connection = createConnection(typeOrmOptions);

connection
  .then(async () => {
    console.log("success");
    const app = express();
    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(pagination);

    app.use("/", routes);

    app.listen(port, () => console.log(`I am listening on port ${port} 😸`));
  })
  .catch((error) => console.log("Uh-oh 😿", error));
