# Task Manager API

## **Objective:**

Build a RESTful API for a simple task manager application.

## **Project Description:**

In this project, you will create a RESTful API using Node.js, Express.js, and NPM packages. The API will enable users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. Each task should have a title, description, and a flag for completion status. Testing of the API will be conducted using Postman or Curl.

### 1. **Set up Project:**

   - Initialize a new Node.js project.
   - Install necessary dependencies, including Express.js.

### 2. **Implement RESTful API:**

   - Create the following endpoints:

     - `GET /tasks`: Retrieve all tasks.
     - `GET /tasks/:id`: Retrieve a single task by its ID.
     - `POST /tasks`: Create a new task.
     - `PUT /tasks/:id`: Update an existing task by its ID.
     - `DELETE /tasks/:id`: Delete a task by its ID.

   - Utilize an in-memory data store (e.g., an array) to store tasks.

   - Implement proper error handling for invalid requests.

   - Add input validation for task creation and updates. Validate that the title and description are not empty, and that the completion status is a boolean value.

### 3. **Testing:**

   - Test the API using Postman or Curl to ensure it works as expected.

### 4. **Optional Extension:**

   - Implement filtering and sorting for the `GET /tasks` endpoint. For example, users should be able to filter tasks based on completion status and sort them by creation date.

   - Allow users to assign a priority level (e.g., low, medium, high) to each task. Update the API to support this new attribute in task creation, updates, and retrieval.

   - Implement an endpoint to retrieve tasks based on priority level: `GET /tasks/priority/:level`.

### 5. **Submission Guidelines:**

   - Initialize a new Node.js project.

   - Develop your Task Manager API according to the project requirements and optional extensions (if implemented) in the project brief.

   - Write a clear and concise `README.md` file.

   - Provide a link to your GitHub repository for submission. Ensure the repository is public.

---

# Step-by-Step Guide:

## Step 1: Initialize a new Node.js project

 Create a new directory for your project

mkdir task-manager-api
cd task-manager-api

Initialize a new Node.js project

npm init -y

## Step 2: Install Dependencies
Install necessary packages like Express and body-parser.
npm install express body-parser

## Step 3: Implementing the API

## Step 4: Testing

## Run the application
node src/app.js
