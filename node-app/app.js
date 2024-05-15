const http = require('http');
const mysql = require('mysql');

const dbConfig = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'testdb'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) throw err;
    const createTableQuery = `CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )`;
    connection.query(createTableQuery, (err, result) => {
        console.log('Create database');
        if (err) throw err;
    });
});

function getPeople(callback) {
    connection.query('SELECT * FROM people', (err, results) => {
        console.log('Select people');
        if (err) throw err;
        callback(results);
    });
}

const server = http.createServer((req, res) => {
    const name = 'Foo Bar'; // Nome que será cadastrado no banco de dados
    const sql = `INSERT INTO people (name) VALUES ('${name}')`;
    connection.query(sql, (err) => {
        console.log('Insert People');
        if (err) throw err;
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Full Cycle Rocks!</h1>');
    res.write('<h2>Lista de nomes cadastrados:</h2>');

    getPeople((people) => {
        res.write('<ul>');
        people.forEach((person) => {
            res.write(`<li>${person.name}</li>`);
        });
        res.write('</ul>');
        res.end();
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

