const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let employeeArray = [];

function addManager () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message:  "Enter the manager of this project's name"
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the manager's ID number"
        },
        {
            type: 'input',
            name: 'email',
            message:  "Enter the manager's email"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message:  "Enter office number"
        }
    ]).then(data => {

        const newManager = new Manager(data.name, data.id, data.email, data.officeNumber);
        employeeArray.push(newManager);
        console.log('-------------------------------------------');
        console.log("Now enter employees assigned to the project")
        addEmployee(employeeArray);

        });
}

function addEmployee () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message:  "Enter employee's name"
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID number'
        },
        {
            type: 'input',
            name: 'email',
            message:  'Enter employee email'
        },
        {
            type: 'list',
            message: "what is the employee's role.",
            name: 'role',
            choices:  ['Engineer', 'Intern']
        }
    ]).then(data => {

        let newEmployee = {
            name:  data.name,
            id: data.id,
            email: data.email,
            role:  data.role
        }

        console.log(newEmployee);

        switch(newEmployee.role) {
            case 'Engineer':
                console.log('You picked Engineer');
                newEngineer(newEmployee);
                break;
            case 'Intern':
                console.log('You picked Intern');
                newIntern(newEmployee);
                break;
        }
    })
}

function newEngineer(newEmployee){
    inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message:  "Enter github repo link"
        }
    ]).then(data => {
        const newEngineer = new Engineer(newEmployee.name, newEmployee.id, newEmployee.email, data.github);
        employeeArray.push(newEngineer);
        doneOrLoop(employeeArray)
        })
}

function newIntern(newEmployee){
    inquirer.prompt([
        {
            type: 'input',
            name: 'school',
            message:  "Enter current school"
        }
    ]).then(data => {
        const newIntern= new Intern(newEmployee.name, newEmployee.id, newEmployee.email, data.school);
        employeeArray.push(newIntern);
        doneOrLoop(employeeArray)
        })
}



function doneOrLoop(employeeArray){
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'yn',
            message:  "Would you like to enter another employee"
        }
    ]).then(data => {

        if(data.yn){
            addEmployee();
        }else{
            console.log(employeeArray);
            fs.writeFileSync(outputPath, render(employeeArray), 'UTF-8');
        }
    });

};


addManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
