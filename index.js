const mysql = require ("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
  
    
    port:8889,
  
  
    user: 'root',
  
    
    password: 'root',
    database: 'emp_trackDB',
  });

  askUserChoice=()=>{
inquirer.prompt ([
    {
        type:"list",
        name:"choice",
        message:"What would you like to do?",
        choices:["View All Employees",
        // "View All Employees By Department","View All Employees By Manager",
        "Add Employee","Remove Employee","Update Employee Role","Update Employee Manager"]
    }
]).then(data =>{
if(data.choice === "View All Employees"){
    viewEE();
// }else if(data.choice === "View All Employees By Department"){
//     viewDpt();
// }else if (data.choice === "View All Employees By Manager"){
//     viewMgr();
}else if (data.choice === "Add Employee"){
    addEE();
}else if (data.choice === "Remove Employee"){
    removeEE();
}else if (data.choice === "Update Employee Role"){
    updateRole();
}else if (data.choice === "Update Employee Manager"){
    updateMgr();
}
})
};

const viewEE = () => {
    console.log('Gathering employees...\n');
    connection.query('SELECT employee.id,employee.first_name,employee.last_name,role.title,employee.manager_id FROM employee INNER JOIN role ON employee.role_id=role.id', (err, res) => {
       
      if (err) throw err;
      console.table(res)
      
      
    });
  };

//   const viewDpt=()=>{
//       console.log("Gathering employees by department...\n");
//       connection.query('SELECT')
//   }

//   const viewMgr=()=>{
//       console.log("Gathering employees by direct manager...\n");
//       connection.query('SELECT')
//   }

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
        type:"input",
        message:"What is the employees role?"
    },{

    }]).then(data=>{
        connection.query("INSERT INTO employee SET ?",{
            first_name:data.first_name,
            last_name:data.last_name,
            role_id:data.role_id,
            manager_id:data.manager_id
        },(err,res)=>{
            if(err) {
                console.log(err);
            } else {
                console.log("New item posted successfully!!!");
                askUserChoice();
            }
        })
    })
}

  // Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected to database successfully!`);
   askUserChoice();
  });