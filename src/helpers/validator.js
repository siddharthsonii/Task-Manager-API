class validator {
  static validateTaskDetails(taskInfo, allTasksInfo) {
    let allTasksData = allTasksInfo.tasks;
    if (taskInfo.hasOwnProperty('taskId') && taskInfo.hasOwnProperty('title') && taskInfo.hasOwnProperty('description') && taskInfo.hasOwnProperty('flag') && typeof taskInfo.flag === "boolean")  {
      let result = allTasksData.filter(val => val.taskId == taskInfo.taskId);
      if(result.length != 0 || result == undefined || result == null) {
        return {
          "status": false,
          "message": "Duplicate Task ID's found, please enter different Task ID."
        };
      } else {
        return {
          "status": true,
          "message": "New Task has been added successfully."
        };
      }
    }

    if (typeof taskInfo.flag !== "boolean") {
        return {
            "status": false,
            "message": "Flag Status should be a boolean value i.e., either true or false."
        };
    }

    return {
        "status": false,
        "message": "Task Information is not correct, please provide all (taskId, title, description and flag) the properties."
    };
  }

  static validateTaskEditDetails(taskInfo) {
    if (taskInfo.hasOwnProperty('title') ||
    taskInfo.hasOwnProperty('description') ||
    (taskInfo.hasOwnProperty('flag') && (typeof taskInfo.flag === "boolean")))  {
        return {
            "status": true,
            "message": "Task details has been edited successfully."
        };
    }
    else if (taskInfo.hasOwnProperty('flag') && (typeof taskInfo.flag !== "boolean")) {
        return {
            "status": false,
            "message": "Flag Status should be a boolean value i.e., either true or false."
        };
    }

    return {
        "status": false,
        "message": "Task Info is not correct, please provide one of the properies to update the task title, description and flag status."
    };
  }
}

module.exports = validator;