# CIS557 Project - Video and Messaging Web APP

Deployed here: https://chat-app-557-client.herokuapp.com/

# Instructions

To run the app locally:

1. Run backend

- Open command prompt in the folder: /Chat-App/server
- run in terminal `node index.js`

2. Run front end:

- Open command prompt in the folder: /Chat-App/client
- run in terminal `npm run dev`

3. Run front end test:

- Open command prompt in the folder: /Chat-App/client
- run in terminal `npm run test`

4. Run back end test:

- Open command prompt in the folder: /Chat-App/server
- run in terminal `npm run test`

Swagger API Documentation: _Will be Here_

## This document describes the project requirements for the Fall 2020 CIS557 Group Project.

## Timeline

- Due date: week of Dec 14, 2020

## Table of Contents

1. [Github-Specific Requiremenets](#Github-Specific)
2. [Validation](#validation)
3. [User Stories: Feature Specification](#feature)
4. [User Stories: Implementation Specification](#implementation)
5. [Grading](#grading)
6. [References](#References)

---

We will use [GitHub projects](https://github.com/features/project-management/) and [Extreme Programming (XP)](http://www.extremeprogramming.org/) methodology when
implementing this project. As a reminder, XP provides [29 simple rules](http://www.extremeprogramming.org/rules.html) to be followed in
terms of Planning , Managing , Designing , Coding , and Testing.

- Supplementary XP links: [Getting Started](http://www.extremeprogramming.org/start.html), [Project Flowchart](http://www.extremeprogramming.org/map/project.html), [Iteration Flowchart](http://www.extremeprogramming.org/map/iteration.html)

---

## Github-Specific Requirements

- You will create and configure a [project](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/about-project-boards) in your GitHub repository .
- You will create a [wiki page](https://guides.github.com/features/wikis/#creating-your-wiki) in your GitHub repository listing and describing your [user stories](https://www.atlassian.com/agile/project-management/user-stories) and [story points](https://www.atlassian.com/agile/project-management/estimation).
- Each user story should be listed in the GitHubâ€™s tracker as an [issue](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/managing-your-work-with-issues) . You must [label your issues](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/applying-labels-to-issues-and-pull-requests) and [assign them to specific member(s) of your team](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/assigning-issues-and-pull-requests-to-other-github-users)
  - Supplementary resource for issues: [Github Guides: Mastering Issues](https://guides.github.com/features/issues/), [Milestones](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/about-milestones)

---

## Validation

- Your JavaScript must be clean, readable, and ESLint error and warning-free.
- For this assignment, we will use the [Airbnb Javascript style](https://github.com/airbnb/javascript). Note: best fulfilled by [enabling the style guide in ESLint](https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6).
- Your HTML file(s) must pass validation at [http://validator.w3.org](http://validator.w3.org).
- Your CSS files(s) must pass validation at [http://www.css-validator.org/](http://www.css-validator.org/).

---

## User Stories

### Implementation Specification

- It is up to you to define how you will implement them and the details of the user interface
- You must provide your [story points](https://www.atlassian.com/agile/project-management/estimation) for each [user story](https://www.atlassian.com/agile/project-management/user-stories)
- Each feature must be fully tested: unit tests, functional tests, integration tests
- You must use [Jest](https://jestjs.io/docs/en/getting-started) for testing, [Selenium](https://www.selenium.dev/documentation/en/) for automation, and [Travis](https://docs.travis-ci.com/user/for-beginners/) for continuous integration
- Your unit test should achieve the highest code coverage possible
- You will use [MongoDB](https://docs.mongodb.com/guides/) or [MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/) as database engine
- You will use [Node.JS](https://nodejs.org/en/docs/guides/getting-started-guide/) as webserver
- Your implementation will use a [RESTful API](https://www.restapitutorial.com/) for frontend/backend communication
- You will use [ReactJS](https://reactjs.org/docs/getting-started.html) as framework to build your app
- Check with the course staff **before** using a 3rd party software, packages, or modules (like [JQuery](https://www.w3schools.com/jquery/jquery_get_started.asp)) when implementing your apps
- You should explain your design decisions for user stories in your [GitHub wiki page](#github-specific)
- You should make sure that your web application does not crash during usage/testing
- You must deploy your app on [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)

### Feature Specifications

- You will implement the following user stories (see table below)
- Refer to the [grading](#grading) section to understand how many of each feature 'level' you are required to implement
- More specification requirements for particular stories may be added in future, once the Professor / TAs create them

| Level | User Story                                                 |
| ----- | ---------------------------------------------------------- |
| 0     | User Registration                                          |
| 0     | Login/Auth                                                 |
| 0     | User profile page                                          |
| 0     | Send/receive text message - asynchronously                 |
| 0     | Send/receive audio message - asynchronously                |
| 0     | Send/receive image message - asynchronously                |
| 0     | Send/receive video message - asynchronously                |
| 1     | Make/receive voice calls                                   |
| 1     | Post user status                                           |
| 1     | Activity feed - status of contacts                         |
| 1     | Add/remove contacts                                        |
| 2     | Deleting messages                                          |
| 2     | Contact suggestions                                        |
| 2     | @mentions in messages                                      |
| 3     | Interactive API documentation using Swagger                |
| 4     | Live update / Browserâ€™s notification - messages / status |
| 4     | Delivery / Read receipts                                   |
| 4     | Pagination / â€˜infinite scrollâ€™ / virtual list          |

---

## Grading

- You should schedule a demo with your TA during the last week of class.
- Each team member's [GitHub contributions](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-profile/viewing-contributions-on-your-profile#what-counts-as-a-contribution) will be used when grading the project
- Assuming that each user story is implemented completely (description of US and issues in GitHub project, tests, implementation, and deployment) and that selected all user stories within each level are implemented, your work will be graded as follows:

  ### Grading: Implementation

  You must implement:

  - **All** level 0</span> and 1</span> user stories
  - **Two** level 2</span> user stories
  - **Two** user stories from either level 3</span> or 4</span>
  - For a user story to be considered completed:
    - The code must be thoroughly tested (unit, functional) and aim at the highest code coverage level. **We will not accept code coverage below 60%.**
    - Your Travis-CI interface must display the code coverage
    - The feature must be deployed on the cloud. We will not grade features not deployed
    - You should comment your code [using this as a guide](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support).

  ### Grading: Project management

  You will get continuous feedback from your TA for this category

  - You must define your [milestones](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/about-milestones)
  - All your features/tasks must be linked to an issue in GitHub
  - Your issues must be part of a milestones and have labels and assignees
  - You must use the [proper GitHub flow](https://guides.github.com/introduction/flow/)
  - #### Ongoing Meetings with TA
    - The TA will use your GitHub repo to measure progress.
    - These are the key things your TA will be checking:
      1. Attendance
      2. The goal for the week (“milestone” in GitHub)
      3. User stories for the goal (tied to the milestone, use GitHub projects)
      4. The user story is broken down into issues in GitHub project
      5. Definition of “done” for each issue and user story
      6. Issues assigned to team members
      7. For each user story, 2 members should develop and 1 Q&A (CI, end to end testing) / rotate every week.
      8. Branching and merging
      9. The team should be doing code reviews on feature branches before merging pull requests
      10. Documentation (wiki) should be updated also have an issue and be assigned
      11. User story deployment
      12. The TA will provide you the minimum requirements for each user story (we will post clarifications on Piazza)
      13. TA feedback (goal met or not)

  ### Grading: Documentation

  You will use the Wiki to document your project: Below is a sample table of contents

  - #### Database (_Model_)
    - Entity-relationship model
      - You will list all your entities and their attributes
      - You will list the relationships between your entities and their attributes (if applicable)
      - You will provide your Entity-relationship diagram with the cardinalities of the relationships
    - Translate your Entity-relationship model into a relational schema
      - You will list all your tables, identify primary and foreign keys
    - Provide a NoSQL version of your Entity-relationship model
      - You will list all your Collection(s) and documents
    - Create a SQL script file that will contain SQL queries to create and populate your database (**MySQL teams only**)
      - You can use the mysqldump client to perform this task
    - Create an export file of your MongoDB instance database (**MongoDB teams only**)
      - You can use the mongodump module to perform this task
  - #### Design (_View_)
    - Interface design
      - You should wireframe at least 9 user stories)
      - You must prototype at least 1 user story. Except user stories 1 and 2.
    - Describe your main React components
  - #### Interface (_Controller_) : all the (non-helper) CRUD functions you are implementing in your controller
    - A table with the following headings
      - Function name
      - Parameters and their types
      - Purpose of the function
  - #### REST API : a table listing your endpoints (URI), HTTP method, request body,
    - HTTP responses
      - A table with the following headings:
        - URI
        - HTTP Method
        - Request with the parameters listed?
        - Response as a JSON Object
  - #### Security
    - For each feature listed below:
      - Describe the approach you used or the decisions you made (for example password must be at least X characters long and contain at least one special character).
      - List any library, package or framework you used
      - Where it is implemented (filenames)
    - Features
      - Access control
      - Input validation
      - Account lockout policy
      - Specific HTTP status code
      - Exceptions Handling
      - Secured random token
      - Prepared SQL Statements with parameterized queries (**SQL DB only**)

## References

This document is based on file [here](https://d1b10bmlvqabco.cloudfront.net/paste/jlckgm7uaQEF/399a4bf21fc045a2f94347e8bf4c2fc3c4c279eab61e484f8472b5e93e7c5a27/readme.md)
