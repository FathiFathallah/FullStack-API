const { json } = require('express');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();



const query = mysql.createConnection({
        host: 'localhost',
        database: 'nodejs',
        user: 'root',
        password: ''
});

app.use(express.json());
app.use(cors());

/* ADD COURSE */
app.post('/addCourse', (req, res) => {
        let { name, price, cat, description } = req.body;
        query.execute(`INSERT INTO courses(name,price,cat,description)
        VALUES('${name}','${price}','${cat}','${description}')`);
        res.json({ message: 'Success' });
});

/* GET COURSES */
app.get('/courses', (req, res) => {

        query.execute(`SELECT * FROM courses`, (err, result) => {
                res.json({ message: 'Success', courses: result });
        });

});

/* SPECIFIC COURSES BY SEARCH */
app.post('/searchedCourses', (req, res) => {
        let { text } = req.body;
        query.execute(`SELECT * FROM courses
        WHERE name LIKE '%${text}%';`, (err, result) => {
                res.json({ message: 'Success', courses: result });
        });
});

/* UPDATE COURSES */
app.put('/update', (req, res) => {
        let { id, name, price, cat, description } = req.body;
        query.execute(`UPDATE courses SET name='${name}',price='${price}',
        cat='${cat}',description='${description}' where id=${id}`, (err, result) => {
                if (!err) res.json({ message: 'Success' });
        });

});


/* DELETE COURSES */
app.delete('/delete', (req, res) => {
        let { id } = req.body;
        query.execute(`DELETE FROM courses where id=${id}`, (err, result) => {
                if (!err) res.json({ message: 'Success' });
        });
});

/* DELETE ALL */
app.delete('/deleteALL', (req, res) => {
        query.execute(`DELETE FROM courses`, (err, result) => {
                if (!err) res.json({ message: 'Success' });
        });
});


app.listen(3000, () => {
        console.log("Server Is running");
});
