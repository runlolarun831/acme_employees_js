/// this one solves for moe, shep jr but not for harpo
const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text) => {
  if (!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee

function findEmployeeByName(name1, funnyGuys) { ///////DONE//////////
  const employeeFound = funnyGuys.filter(employee => employee.name === name1);
  return employeeFound[0];
}
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager

function findManagerFor(nameObj, funnyGuys) {
  //console.log('nameObj', nameObj.managerId);
  const managerFound = funnyGuys.filter(employee => employee.id === nameObj.managerId); ///////DONE//////////
  return managerFound[0];
}
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager ////DONE///////

function findCoworkersFor(nameObj, funnyGuys){
  const coworkersFound = funnyGuys.filter(employee => employee.managerId === nameObj.managerId && employee.name !== nameObj.name);
  return coworkersFound;
}
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*////DONE///////
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee.
//The management chain starts from the employee with no manager with the passed in employees
//manager //////////WORKING ON IT/////////

function findManagementChainForEmployee(nameObj, funnyGuys) {
  const managementChainFound = [];
  const ceoFound = funnyGuys.filter(employee => employee.managerId === undefined);
  let ceo = ceoFound[0];

  if (nameObj === ceo) {
    return managementChainFound;
  }
  else{
    let headHoncho = {};
    headHoncho = ceo;
    managementChainFound.push(ceo);
    for (let i = 0; i < funnyGuys.length; i++) {
      if (nameObj === headHoncho) {
        managementChainFound.pop();
        return managementChainFound;
      }
      let employee = funnyGuys[i];
      if (headHoncho.id === employee.managerId && nameObj !== headHoncho) {
        managementChainFound.push(employee);
        headHoncho = employee;
      }
    }
    return ('this is else return', managementChainFound);
  }
}

console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');

spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.

function generateManagementTree(funnyGuys) {

}

console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
