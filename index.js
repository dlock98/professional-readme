const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const questions = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is your project title?"
        },
        {
            type: "input",
            name: "author",
            message: "What is the author's name?"
        },
        {
            type: "input",
            name: "username",
            message: "What is your Github username?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the email address?"
        },
        {
            type: "input",
            name: "project description",
            message: "Please write a brief description of your project"
        },
        {
            type: 'checkbox',
        name: 'licensing',
        message: 'Choose a license for your project (Required)',
        choices: ['Apache', 'MIT', 'Mozilla-Public', 'GNU-General-Public', 'Common-Development-and Distribution', 'None'],
        validate: licensingInput => {
            if (licensingInput) {
                return true;
            } else {
                console.log('You must pick a license for the project!');
                return false;
            }
        }
        },
        {
            type: "input",
            name: "installations",
            message: "What command should be run to install dependencies?"
        },
        {
            type: "input",
            name: "tests",
            message: "What command should be run to run tests?"
        },
        {
            type: "input",
            name: "usage",
            message: "What does the user need to know about using the repo?"
        },
        {
            type: "input",
            name: "contribute",
            message: "What does the user need to know about contributing to the repo?"
        },
    ]);
function generateMD(data){
    return`# ${data.title}
    ${data.description}
    ## Table of Contents:
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [Contributing](#contributing)
    * [Tests](#tests)
    * [Questions](#questions)
    ### Installation:
    In order to install the necessary dependencies, open the
    console and run the following:
    \'\'\'${data.installations}\'\'\'
    ### Usage:
    ${data.usage}
    ### License:
    This project is licensed under:
    [![license](https://img.shields.io/badge/license-${data.licensing}-blue)](https://shields.io)
    ${data.license}
    ### Contributing:
    ${data.contribute}
    ### Tests:
    In order to test open the console and run the following:
    \'\'\'${data.tests}\'\'\'
    ### Questions:
    IF you have any questions contact me on [Github](https://
    github.com/${data.username}) or contact
    ${data.author} at ${data.email}
`
}

questions()
.then((data) => writeFileAsync('generatedREADME.md', generateMD(data)))
    .then(() => console.log('Successfully wrote to index.html'))
    .catch((err) => console.error(err));