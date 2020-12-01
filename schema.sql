-- Create the database task_saver_db and specified it for use.
DROP DATABASE IF EXIST employees;
CREATE DATABASE employees;
USE employees;

-- Create the table tasks.
CREATE TABLE department,
(id int NOT NULL AUTO_INCREMENT,
name varchar(30) UNIQUE NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role
(id int NOT NULL AUTO_INCREMENT,
title varchar(30) UNIQUE NOT NULL,
salary DECIMAL NOT NULL,
department_id int NOT NULL,
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
PRIMARY KEY (id)

CREATE TABLE employee
(id int NOT NULL AUTO_INCREMENT),
first_name varchar(30) NOT NULL,
last_name varchar(30) NOT NULL,
role_id int NOT NULL,
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
manager_id int,
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,

-- Insert a set of records.
INSERT INTO department (name) VALUES ('Sales'), ('Accounting'), ('IT');
INSERT INTO role (title, salary, department_id) VALUES ('The Lead', 100000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Lilian', 'Doe', 1, NULL);