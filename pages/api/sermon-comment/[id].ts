import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const db = await open({
          filename: "./database.db",
          driver: sqlite3.Database,
        });

        const comments = await db.all(
          "select * from comments where sermonId = ?",
          [req.query.id]
        );
        res.json(comments);
      } catch (err) {
        console.log(err);
      }
      break;
    case "POST":
      try {
        
        const name = req.body.name;
        const email = req.body.email;
        const comment = req.body.message;
        const surmonId = req.body.sermonId;
        const db = await open({
          filename: "./database.db",
          driver: sqlite3.Database,
        });
        const query = await db.all(
          `insert into comments(name,email,message,sermonId) values('${name}','${email}','${comment}','${surmonId}')`);

          const comments = await db.all(
            "select * from comments where sermonId = ?",
            [req.query.id]
          );
          res.json(comments);
        
      } catch (err) {
        console.log(err);
      }
      break;

    default:
      res.json([]);
  }
};
