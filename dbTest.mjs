import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

(async () => {
    // open the database
    try{
      const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
      })
      await db.migrate({force: 'last'})

      const comments  = await db.all("select * from comments")
      console.log(JSON.stringify(comments, null,2));
    } catch (err) {
      console.log(err)
    }
    
})()