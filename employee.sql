DROP DATABASE IF EXISTS emp_trackDB;

CREATE DATABASE emp_trackDB;

USE emp_trackDB;

CREATE TABLE employee (
    id INT PRIMARY KEY
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department(
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
    PRIMARY KEY (id)
)

CREATE TABLE role (
    id INT PRIMARY KEY
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
)



