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
                            console.log('Department was deleted');
                            connection.end();
                        });


                });
        });

};