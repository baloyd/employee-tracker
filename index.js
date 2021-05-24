//Requiring necessary packages
const mysql = require ("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

//Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
  
    
    port:8889,
  
  
    user: 'root',
  
    
    password: 'root',
    database: 'emp_trackDB',
  });

  //Initiate employee tracker
  askUserChoice=()=>{
inquirer.prompt ([
    {
        type:"list",
        name:"choice",
        message:"What would you like to do?",
        choices:["View All Employees",
        "View All Employees By Department",
        "View All Employees By Role",
        "Add Employee",
        "Add Department",
        "Add Role",
        // "Remove Employee",
        "Update Employee Role",
        // "Update Employee Manager",
        "Exit"]
    }
]).then(data =>{
if(data.choice === "View All Employees"){
    viewEE();
}else if(data.choice === "View All Employees By Department"){
    viewDpt();
}else if (data.choice === "View All Employees By Role"){
    viewRole();
}else if (data.choice === "Add Employee"){
    addEE();
}else if (data.choice === "Add Department"){
    addDpt();
}else if (data.choice === "Add Role"){
    addRole();
}
// else if (data.choice === "Remove Employee"){
//     removeEE();
// }
else if (data.choice === "Update Employee Role"){
    updateRole();
}
// else if (data.choice === "Update Employee Manager"){
//     updateMgr();
// }
else{connection.end();}
})
};

//View All data for all Employees
const viewEE = () => {
    console.log('Gathering employees...\n');
    connection.query('SELECT employee.id,employee.first_name,employee.last_name,role.title,role.salary,department.name, employee.manager_id FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department on department.id = role.department_id', (err, res) => {
       
      if (err) throw err;
      console.table(res)
      askUserChoice();
      
    });
    
  };
//View Employees by Department
  const viewDpt=()=>{
      console.log("Gathering employees by department...\n");
      connection.query('SELECT employee.first_name, employee.last_name, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', (err, res) => {
       
        if (err) throw err;
        console.table(res)
        askUserChoice();
        
      });
      
  }

  //View Employees by Role
  const viewRole=()=>{
      console.log("Gathering employees by direct manager...\n");
      connection.query('SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON employee.role_id=role.id', (err,res) =>{

        if (err) throw err;
        console.table(res)
        askUserChoice();
      }) 
  }

  //Add Employee to database
  const addEE=()=>{
    
    inquirer.prompt([{
        name:"first_name",
        type:"input",
        message:"Enter employees first name."
    },{
        name:"last_name",
        type:"input",
        message:"Enter employees last name."
    },{
        name:"role_id",
        type:"list",
        message:"What is the employees role?",
        choices:[]
    },{
        name:"manager_id",
        type:"list",
        message:"Who does this employee report to?",
        choices:[]

    }]).then(data=>{
        
        connection.query("SELECT employee.role_id, employee.manager_id, role.id FROM role INNER JOIN employee ON role.id=employee.role_id INSERT INTO employee SET ?",{
            first_name:data.first_name,
            last_name:data.last_name,
            role_id:data.role_id,
            manager_id:data.manager_id
        },(err,res)=>{
            if(err) {
                console.log(err);
            } else {
                console.log("New employee added successfully!");
                askUserChoice();
            }
        })
    })
    }

    //Add Department to database
    addDpt=()=>{
        inquirer.prompt([
            {
                name:"addDpt",
                type:"input",
                message:"Enter the name of the department you would like to add."

            }
        ]).then(data =>{
            connection.query("INSERT INTO department SET ?",{
                name:data.name
            },(err,res)=>{
                if(err) {
                    console.log(err);
                }else {
                    console.log("New department added successfully!")
                    askUserChoice();
                }
            })
        })
    }

    //Add Role to database
    addRole=()=>{
        inquirer.prompt([
            {
                name:"addRole",
                type:"input",
                message:"Enter the name of the role you would like to add."

            },{
                name:"role_salary",
                type:"input",
                message:"Enter a salary for this role.",
                validate: function (input) {
                    if (typeof input !== 'number') {
                        
                        done('You need to provide a number');
                        return;
                      }
                }
            },{
                name:"department",
                type:"list",
                message:"Choose which department this role will be part of.",
                choices:[]

        }]).then(data =>{
            connection.query("INSERT INTO role SET ?",{
                title:data.addRole,
                salary:data.role_salary,
                department_id:data.department
            },(err,res)=>{
                if(err) {
                    console.log(err);
                }else {
                    console.log("New department added successfully!")
                    askUserChoice();
                }
            })
        })
    }


const removeEE=()=>{
    connection.query("SELECT * FROM employee",(err,employees)=>{
        const employeeNames=employees.map(employee=>`${employee.first_name} ${employee.last_name}`);

        inquirer.prompt([
            {
                name:"delete",
                type:"list",
                message:"Which employee would you like to remove?",
                choices:[employeeNames]
            }
        ]).then(data =>{
            connection.query(
                'DELETE FROM employee WHERE ?',
                {
                  id: data.id,
                },
                (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  console.log(`employee deleted from database successfully`);
                  
                  askUserChoice();
                }
              );
        })

       })
    
    
    }
    
  // Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected to database successfully!`);
   askUserChoice();
  });