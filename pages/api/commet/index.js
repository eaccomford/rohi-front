import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async function newComment(req, res) {
  if(req.method  === 'POST'){
    const data = req.body
    const {name,email,message} = data
  }

  try{
    const db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    })

    const comments  = await db.all("select * from comments")
     res.json(comments);
  } catch (err) {
    console.log(err)
  }

}
