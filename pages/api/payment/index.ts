
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

        const contact = req.body.name;
        const amount = req.body.email;
        const desc = req.body.message;
        const vendor  =  req.body.vendor;

        var data = JSON.stringify({
          "amount": amount,
          "appid": 1321,
          "clientreference": "780566",
          "clienttransid": "wwzz0402",
          "description": desc,
          "nickname": "Rohi Church",
          "paymentoption": vendor,
          "walletnumber": contact
      });
            axios({
              method: "post",
              url: 'https://api.reddeonline.com/v1/receive/',
              data: data,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'ApiKey': '2daUXWr6ExEk9y6YL4q2t757GU6nPgXUVKfsUZdb6pHBa5XkYh'
              },
              //headers: {'Content-Type': 'multipart/form-data' }
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