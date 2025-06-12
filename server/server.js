import express from "express";
import pg from "pg";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, () => console.log("port 8080 running"));

app.get("/", (req, res) =>
  res.json({
    status: "yippee",
  })
);
