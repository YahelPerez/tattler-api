# Tattler API - Restaurant Directory

## Project Description

This project involves the development of a RESTful API for Tattler, a restaurant directory platform. The goal is to transform the current platform into a dynamic and personalized user experience, using a non-relational database (MongoDB) to manage the data and Express.js to build the API.

## Installation and Usage Instructions

### Prerequisites
Ensure you have the following installed:
* Node.js (version 16 or higher)
* npm (usually comes with Node.js)
* MongoDB (you can use a local instance or a database on MongoDB Atlas)

### Installation
1.  Clone the repository:
    ```bash
    git clone [https://github.com/YahelPerez/tattler-api.git](https://github.com/YahelPerez/tattler-api.git)
    ```
2.  Navigate to the project folder:
    ```bash
    cd tattler-api
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Usage
To start the API server (in the future), run the following command:
```bash
npm start

### **The structure of the repository**
```markdown
## Repository Structure

The project is organized as follows:

/
├── index.js         # Main server file
├── models/          # Contains the Mongoose data schemas
│   └── Restaurant.js
├── routes/          # Contains the API route files
│   └── restaurants.js
├── scripts/         # Contains helper scripts (like data import)
├── backup/          # Contains database backup files
├── screenshots/     # Contains screenshots (tests, DB setup, etc.)
├── .env             # Environment variables file (local)
├── .gitignore       # Files and folders ignored by Git
└── package.json     # Project dependencies and scripts