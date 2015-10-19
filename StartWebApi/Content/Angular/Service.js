//declare a service
app.service("service", function ($http) {

    //get All Developers
    this.getDevelopers = function () {
        return $http.get("/api/DeveloperApi/");
    };


    // get developer By Id
    this.getDeveloper = function (developerId) {
        var response = $http.get("/api/DeveloperApi/" + developerId);
        return response;
    };


    // Update developer 
    this.updateDev = function (developerId, developer) {
        var response = $http({
            method: "put",
            url: "/api/DeveloperApi/" + developerId,
            data: JSON.stringify(developer),
            dataType: "json"
        });
        return response;
    }


    // Add develoepr
    this.AddDev = function (developer) {
        var response = $http({
            method: "post",
            url: "/api/DeveloperApi/",
            data: JSON.stringify(developer),
            dataType: "json"
        });
        return response;
    }


    //Delete developer
    this.DeleteDev = function (developerId) {
            var response = $http({
                method: "delete",
                url: "/api/DeveloperApi/" + developerId
            });
            
        return response;
    }

    //get all projects
    this.getProjects = function () {
        return $http.get("/api/ProjectApi");
    }

    //get project by id
    this.getProject = function (projectId) {
        var response = $http.get("/api/ProjectApi/" + projectId);
        return response;
    }

    //update project
    this.updateProj = function (projectId, project) {
        var response = $http({
            method: "put",
            url: "/api/ProjectApi/" + projectId,
            data: JSON.stringify(project),
            dataType: "json"
        });
        return response;
    }

    //add project
    this.addProj = function (project) {
        var response = $http({
            method: "post",
            url: "/api/ProjectApi",
            data: JSON.stringify(project),
            dataType: "json"
        });
        return response;
    }

    //delete project
    this.DeteleProj = function (projectId) {
        var response = $http({
            method: "delete",
            url: "/api/ProjectApi/" + projectId
        });
        return response;
    }

    //get all features
    this.getFeatures = function() {
        return $http.get("/api/FeatureApi");
    }

    //get feature by projectID
    this.getFeature = function(projectId) {
        var response = $http.get("/api/FeatureApi/" + projectId);
        return response;
    }

    //get feature by featureID
    this.getFeature2 = function(featureId) {
        var response = $http.get("/api/ExtendFeatureApi/" + featureId);
        return response;
    }

    //update feature
    this.updateFtr = function(featureId, feature) {
        var response = $http({
            method: "put",
            url: "/api/FeatureApi/" + featureId,
            data: JSON.stringify(feature),
            dataType: "json"
        });
        return response;
    }

    //add feature
    this.addFtr = function(feature) {
        var response = $http({
            method: "post",
            url: "/api/FeatureApi",
            data: JSON.stringify(feature),
            dataType: "json"
        });
        return response;
    }

    //delete feature
    this.deleteFtr = function(featureId) {
        var response = $http({
            method: "delete",
            url: "api/FeatureApi/" + featureId
        });
        console.log(response);
        return response;
    }

    //get all tasks
    this.getTasks = function() {
        return $http.get("/api/TaskApi");
    }

    //get task by FeatureId
    this.getTask = function(task) {
        var response = $http.get("/api/TaskApi/" + task.FeatureId);
        return response;
    }

    //get task by TaskID
    this.getTask2 = function(taskId) {
        var response = $http.get("/api/ExtendTaskApi/" + taskId);
        return response;
    }

    //update task
    this.updateTask = function(taskId, task) {
        var response = $http({
            method: "put",
            url: "/api/TaskApi/" + taskId,
            data: JSON.stringify(task),
            dataType: "json"
        });
        return response;
    }

    //add task
    this.addTask = function(task) {
        var response = $http({
            method: "post",
            url: "/api/TaskApi/",
            data: JSON.stringify(task),
            dataType: "json"
        });
        return response;
    }

    //delete task
    this.deleteTask = function(taskId) {
        var response = $http({
            method: "delete",
            url: "api/TaskApi/" + taskId
        });
        console.log(response);
        return response;
    }
});