const allTaskRoutes = require('express').Router();
const bodyParser = require('body-parser');
const allTasksInfo = require('../tasksList.json');
const path = require('path');
const validator = require('../helpers/validator');
const fs = require('fs');

allTaskRoutes.use(bodyParser.json());

// Get All Courses List - GET
allTaskRoutes.get('/', (req, res) => {
  return res.status(200).json(allTasksInfo.tasks);
});

// Get Course List By ID - GET
allTaskRoutes.get('/:id', (req, res) => {
  let allTasksData = allTasksInfo.tasks;
  let taskIdPassed = req.params.id;
  let result = allTasksData.filter(val => val.taskId == taskIdPassed);

  if(result.length == 0 || result == undefined || result == null) {
    return res.status(400).json("Requested Data not found.");
  }
  return res.status(200).json(result);
});

// Create a new task - POST
allTaskRoutes.post('/', (req, res) => {
  const taskDetails = req.body;
  if (validator.validateTaskDetails(taskDetails, allTasksInfo).status) {
      let writePath = path.join(__dirname, '..', 'tasksList.json');
      let taskDataModified = JSON.parse(JSON.stringify(allTasksInfo));
      taskDataModified.tasks.push(taskDetails);
      try {
          fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
          res.status(200);
          res.json(validator.validateTaskDetails(taskDetails, allTasksInfo));
          return res;
      }
      catch (err) {
          return res.status(500).json("Write has failed due to some reasons, Please try again later.");
      }
  }
  else {
      return res.status(400).json(validator.validateTaskDetails(taskDetails, allTasksInfo));
  }
});

// Update an existing task by its ID - PUT
allTaskRoutes.put('/:id', (req, res) => {
  const taskDetails = req.body;
  let taskPassedEditId = req.params.id;
  let writePath = path.join(__dirname, '..', 'tasksList.json');
  let taskDataModified = JSON.parse(JSON.stringify(allTasksInfo));

  let validationResponse = validator.validateTaskEditDetails(taskDetails, allTasksInfo);
  if (validationResponse.status) {
      for (let i = 0; i < taskDataModified.tasks.length; i++) {
          if (taskDataModified.tasks[i].taskId == taskPassedEditId) {
              if (taskDetails.hasOwnProperty('title')) {
                  taskDataModified.tasks[i].title = taskDetails.title;
              }
              if (taskDetails.hasOwnProperty('description')) {
                  taskDataModified.tasks[i].description = taskDetails.description;
              }
              if (taskDetails.hasOwnProperty('flag')) {
                  taskDataModified.tasks[i].flag = taskDetails.flag;
              }
          }
      }
      try {
          fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
          res.status(200);
          res.json(validationResponse);
          return res;
      }
      catch (err) {
          return res.status(500).json({ "message": "Write has failed due to some reasons, Please try again later." });
      }
  }
  else {
      return res.status(400).json(validationResponse);
  }
});

// Delete a task by its ID - DELETE
allTaskRoutes.delete('/:id', (req, res) => {
  let taskDeletedId = req.params.id;
  let writePath = path.join(__dirname, '..', 'tasksList.json');
  let taskDataModified = JSON.parse(JSON.stringify(allTasksInfo));
  let deleteFlag = false;

  for (let i = 0; i < taskDataModified.tasks.length; i++) {
      if (taskDataModified.tasks[i].taskId == taskDeletedId) {
          taskDataModified.tasks.splice(i,1);
          deleteFlag = true;
      }
  }

  if (deleteFlag) {
      try {
          fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
          res.status(200)
          res.json({"message": "Task with ID "+ taskDeletedId + " has been successfully deleted form Tasks List." });
          deleteFlag = false;
          return res;
      }
      catch (err) {
          return res.status(500).json({ "message": "Write has failed due to some reasons, Please try again later." });
      }
  } else {
      res.status(404);
      res.json({"message": "Task with ID "+ taskDeletedId +" has not been found in Tasks List." });
      return res;
  }
});

module.exports = allTaskRoutes;