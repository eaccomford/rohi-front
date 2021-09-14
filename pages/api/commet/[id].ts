import {NextApiRequest, NextApiResponse} from 'next'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try{
        const db = await open({
          filename: './database.db',
          driver: sqlite3.Database
        })
    
        const comments  = await db.all("select * from comments where id = ?",[req.query.id])
         res.json(comments);
      } catch (err) {
        console.log(err)
      }
}