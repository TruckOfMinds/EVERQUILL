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

app.get("/messages", async (req, res) => {
  const msgs = await db.query(
    "SELECT * FROM everquill_messages ORDER BY date DESC LIMIT 50"
  );

  return res.json(msgs.rows);
});

app.get("/tags", async (req, res) => {
  const tags = await db.query(
    "SELECT * FROM everquill_tags ORDER BY tag_name ASC"
  );

  return res.json(tags.rows);
});

app.post("/write", (req, res) => {
  const { name, tag, msg, date } = req.body; //? might not work
  const post = db.query(
    `INSERT INTO everquill_messages (name, tag, msg, date) VALUES ($1, $2, $3, $4)`,
    [name, tag, msg, date]
  );
});
