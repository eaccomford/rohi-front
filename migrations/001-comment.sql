-- up
CREATE TABLE comments(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    sermonId INTEGER
);

insert into comments(name,email,message,sermonId) values('kofi brow','kofi@test.com','testing this app',1);
insert into comments(name,email,message,sermonId) values('ama Lee','lee@test.com','love life this app',1);
-- you can create other tables here

-- down
DROP TABLE comments;
-- you can drop other tables here