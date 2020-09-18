// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee.js');

class Manager extends Employee {
    constructor(name, id, email, number) {
        super(name, id, email);
        this.number = number;
        }

        getOfficeNumber() {
            return this.number;
        }
    
        getRole() {
            return 'Manager';
        }  
}

module.exports = Manager;
