DROP DATABASE IF EXISTS emp_trackDB;

CREATE DATABASE emp_trackDB;

USE emp_trackDB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT, 
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

INSERT INTO department 
(name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role
(title, salary, department_id)
VALUES
('Sales Lead', 100000,1),
('Salesperson',80000,1),
('Lead Engineer',150000,2),
('Software Engineer',120000,2),
('Account Manager',180000,3),
('Accountant',125000,3),
('Legal Team Lead',250000,4),
('Lawyer',180000,4);

INSERT INTO employee
(first_name,last_name,role_id,manager_id)
VALUES
('Gerard','Magimel', 1, NULL),
('Joachim', 'Valentine', 2, 1),
('Roger','Bacon', 3, NULL),
('Alice','Elliot', 4, 3),
('Karin','Koenig', 5, NULL),
('Yuri','Hyuga', 6, 5),
('Anastasia','Romanov', 7, NULL),
('Hilda','Valentine', 8, 7)


