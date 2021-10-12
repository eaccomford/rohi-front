import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const db = await open({
          filename: './database.db',
          driver: sqlite3.Database,
        });

        const comments = await db.all(
          'select * from comments where sermonId = ?',
          [req.query.id]
        );
        res.json(comments);
      } catch (err) {
        console.log(err);
      }
      break;
    case 'POST':
      try {
        const identifier = req.body.identifier;
        const password = req.body.password;

        var data = JSON.stringify({
          identifier: identifier,
          password: password,
        });
        axios({
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_URL}/auth/local`,
          data: data,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // 'ApiKey': '2daUXWr6ExEk9y6YL4q2t757GU6nPgXUVKfsUZdb6pHBa5XkYh'
          },
          //headers: {'Content-Type': 'multipart/form-data' }
        })
          .then(function (response) {
            return res.json({ data: response.data, status: 1 });
          })
          .catch((error) => {
            return res.json({ status: 0 });
            //console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
      break;

    default:
      res.json([]);
  }
};
