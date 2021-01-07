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
inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: 'What would you like to do ?',
    choices: [
        {
            name: 'Add department',
            value: 'Add-Department'
        },
        {
            name: 'View department',
            value: 'View-Department'
        },
        {
            name: 'Delete department',
            value: 'Delete-Department'
        },
        {
            name: 'Add roles',
            value: 'Add-Roles'
        },
        {
            name: 'View roles',
            value: 'View-Roles'
        },
        {
            name: 'Delete role',
            value: 'Delete-Role'
        },
        {
            name: 'Add Employee',
            value: 'Add-Employee'
        },
        {
            name: 'View employee',
            value: 'View-Employee'
        },
        {
            name: 'Delete employee',
            value: 'Delete-Employee'
        },
    ]
    // do the same with role and employee
}])
    .then(answers => {
        console.log(answers)

        if (answers.choice == 'Add-Department') {
            addDepartment();
        }
        if (answers.choice == 'View-Department') {
            viewDepartment();
        }
        if (answers.choice == 'Delete-Department') {
            deleteDepartment();
        }
        if (answers.choice == 'Add-Roles') {
            addRole();
        }
        if (answers.choice == 'View-Roles') {
            viewRole();
        }
        if (answers.choice == 'Delete-Role') {
            deleteRole();
        }
        if (answers.choice == 'Add-Employee') {
            addEmployee();
        }
        if (answers.choice == 'View-Employee') {
            viewEmployee();
        }
        if (answers.choice == 'Delete-Employee') {
            deleteEmployee();
        }
    })
// can be swicth statement
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

        });
};
// addDepartment();

const viewDepartment = () => {
    let sqlQuery = 'SELECT * FROM department';
    connection.query(sqlQuery,
        (error, results) => {
            if (error) throw error;
            console.table(results);
        });
    connection.end();
};
//viewDepartment();

function deleteDepartment() {
    let sqlQuery = 'SELECT * FROM department';
    connection.query(sqlQuery,
        (error, results) => {
            if (error) throw error;
            console.log(results);
            const departments = results.map(result => ({
                name: result.name,
                value: result.id,
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: 'Which department you would like to delete?',
                    choices: departments
                },
            ])
                .then(response => {
                    let sqlQuery = 'DELETE FROM department WHERE id = ?';

                    connection.query(sqlQuery, response.id,
                        (error, results) => {
                            if (error) throw error;
                            console.log('Department was deleted');
                            connection.end();
                        });


                });
        });

};
function addRole() {
    let sqlQuery = 'SELECT * FROM department';
    connection.query(sqlQuery,
        (error, results) => {
            if (error) throw error;
            const departments = results.map(result => ({
                name: result.name,
                value: result.id,
            }))
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Please insert a role title?',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for this role?',
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department this role belongs to?',
                    choices: departments
                },
            ])
                .then(response => {
                    let sqlQuery = 'INSERT INTO role SET ?';
                    console.log(response);
                    connection.query(sqlQuery, response,
                        (error, results) => {
                            if (error) throw error;
                            console.log('New role was successfuly added!');
                            connection.end();
                        });


                });
        });

};
const viewRole = () => {
    let sqlQuery = 'SELECT * FROM role LEFT JOIN department ON department.id = role.department_id';
    connection.query(sqlQuery,
        (error, results) => {
            if (error) throw error;
            console.table(results);
        });
    connection.end();
};

function deleteRole() {
    let sqlQuery = 'SELECT * FROM role';
    connection.query(sqlQuery,
        (error, results) => {
            if (error) throw error;

            const roles = [{
                name: "none",
                value: null,
            },
            ...results.map(result => ({
                name: result.title,
                value: result.id,

            }))];
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: "Which role you want to remove?",
                    choices: roles,
                }
            ]).then(response => {
                let sqlQuery = 'DELETE FROM role WHERE id = ?'
                connection.query(sqlQuery, response.id, (error, results) => {
                    if (error) throw error;
                    console.log("Role is removed")
                    connection.end()
                })
            })


        }
    )
}
function addEmployee() {
    const roles = 'SELECT * FROM role'
    const employees = 'SELECT * FROM employee'

    connection.query(roles,
        (error, results) => {
            if (error) throw error;
            const roles = results.map(result => ({
                name: result.title,
                value: result.id,

            }))
            connection.query(employees,
                (error, results) => {
                    if (error) throw error;

                    const manager = results.map(employee => ({
                        name: employee.first_name + " " + employee.last_name,
                        value: employee.id
                    }))
                    manager.push({
                        name: "none",
                        value: null,
                    })
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'What is the first name of employee?',
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'What is the last name of employee?',
                        },
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: 'Select employee manager',
                            choices: manager
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: 'Select employee\'s role',
                            choices: roles
                        }
                    ]).then(response => {
                        let sqlQuery = 'INSERT INTO employee SET ?';
                        connection.query(sqlQuery, response,
                            (error, results) => {
                                if (error) throw error;
                                console.log('New employee was added to the department');
                            });
                        connection.end();
                    })
                });
        });
}

function viewEmployee() {

    const sqlQuery = `SELECT 
employee.id, 
employee.first_name AS 'First Name',
employee.last_name AS 'Last Name',
role.title AS Title,
department.name AS Department,
IFNULL(CONCAT (manager.first_name, ' ' , manager.last_name), '--------' )
AS Manager FROM Employee
LEFT JOIN role on employee.role_id = role.id
LEFT JOIN department on role.department_id = department.id
LEFT JOIN employee manager on employee.manager_id = manager.id
`
    connection.query(sqlQuery,
        (error, results) => {
            if (error) throw error;
            console.table(results);
            connection.end();
        });

}
function deleteEmployee() {
    let sqlQuery = 'SELECT * FROM employee'
    connection.query(sqlQuery,
        (error, results) => {
            if (error) throw error;
            const employees = results.map(result => ({
                name: result.first_name + " " + result.last_name,
                value: result.id,
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: 'Who would like to remove from employees?',
                    choices: employees
                },
            ]).then(response => {
                let sqlQuery = 'DELETE FROM employee WHERE id = ?';

                connection.query(sqlQuery, response.id,
                    (error, results) => {
                        if (error) throw error;
                        console.log('Employee was successfully removed!');
                        connection.end();
                    });
            });


        });
}