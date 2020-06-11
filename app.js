const express = require('express');
const mysql = require('mysql');

const app = express();

app.listen('3000', () => {
    console.log('server has started on port 3000');
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql'
});

db.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('Mysql connected.....');
});

app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created ..');
    });
});

app.get('/addposts1', (req, res) => {
    let data = { title: 'Post One', body: 'This is post number one' };
    let sql = 'INSERT INTO posts SET?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('data created ..');
    });
});

app.get('/getposts', (req, res) => {
    
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('data retreived ..');
    });
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created ..');
    });
});

app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('single post fetched ..');
    });
});

app.get('/updatepost/:id', (req, res) => {
    let sql = `UPDATE posts SET title = 'Updated Title' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post updated ..');
    });
});

app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post deleted ..');
    });
});