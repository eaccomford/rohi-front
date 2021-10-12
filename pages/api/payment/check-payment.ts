import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import axios from "axios";

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
        const transId = req.body.transId;
        axios({
          method: "get",
          url: `https://api.reddeonline.com/v1/status/${transId}`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ApiKey: "2daUXWr6ExEk9y6YL4q2t757GU6nPgXUVKfsUZdb6pHBa5XkYh",
            appid: "1321",
          },
        })
          .then(function (response) {
            return res.json(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
      break;

    default:
      res.json([]);
  }
};
