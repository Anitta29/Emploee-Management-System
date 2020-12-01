const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Password",
    database: "employees"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please insert a name of new department',
        },
    ])
        .then(response => {
            let sqlQuery = 'INSERT INTO department SET ?';
            let dep = {
                name: response.name,
            };
            connection.query(sqlQuery, dep,
                (error, results) => {
                    if (error) throw error;
                    console.log('New department has been successfully created');
                });
            connection.end();

        })


}