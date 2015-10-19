app.controller("mainController", function ($scope, service) {

    $scope.Developers = false;
    $scope.Projects = false;
    $scope.ShowProjBtn = true;
    $scope.ShowDevBtn = true;
    $scope.HideProjBtn = false;
    $scope.HideDevBtn = false;
    $scope.divProject = false;
    $scope.ShowTasksBtn = true;

    //#region DeveloperController Region
    //To Get All Records  
    function getAllDevelopers() {
        var getData = service.getDevelopers();
        getData.then(function (dev) {
            $scope.developers = dev.data;
        }, function () {
            alert('Error in getting records');
        });
    }

    getAllDevelopers();

    //edit developer
    $scope.editDeveloper = function (developer) {
        var getData = service.getDeveloper(developer.Id);
        getData.then(function (dev) {
            $scope.developer = dev.data;
            $scope.developerId = developer.Id;
            $scope.developerName = developer.Name;
            $scope.developerSalary = developer.Salary;
            $scope.Action = "Update";
            $scope.divDeveloper = true;
        }, function () {
            alert('Error in getting record');
        });
    }
    //ADD/UPDATE Developer
    $scope.AddUpdateDeveloper = function () {
        var devName = $('#DevName').val();
        var devSalary = $('#DevSalary').val();
        if (devName == null || devName === "") {
            alert("Name is required");
        } else {
            if (devSalary == null || devSalary === "") {
                alert("Salary is required");
            } else {
                var developer = {
                    Name: $scope.developerName,
                    Salary: $scope.developerSalary
                };
                var getAction = $scope.Action;
                var getData;
                if (getAction === "Update") {
                    developer.Id = $scope.developerId;
                    getData = service.updateDev($scope.employeeId, developer);
                    getData.then(function () {
                        getAllDevelopers();
                        alert("Developer Id : " + data.id + " is Updated");
                        $scope.divDeveloper = false;
                    }, function () {
                        alert('Error in updating record');
                    });
                } else {
                    getData = service.AddDev(developer);
                    getData.then(function (msg) {
                        getAllDevelopers();
                        alert("Developer Name : " + msg.data.Name + " is Added");
                        $scope.divDeveloper = false;
                    }, function () {
                        alert('Error in adding record');
                    });
                }
            }
        }
    }

    //clean form
    function clearFields() {
        $scope.projectId = "";
        $scope.projectName = "";
    }

    //show developer form(to add or update)
    $scope.AddDeveloperDiv = function () {
        clearFields();
        $scope.Action = "Add";
        $scope.divDeveloper = true;
    }

    //delete developer
    $scope.deleteDeveloper = function (developer) {
        var confirmation = confirm(developer.Name + " will be deleted");
        if (confirmation === true) {
            var getData = service.DeleteDev(developer.Id);
            getData.then(function () {
                getAllDevelopers();
                alert('Developer Deleted');
            }, function () {
                alert('Error in Deleting Record');
            });
        } else {
            console.log("Confirmation val = " + confirmation);
        }
    }

    //hide all developer div
    $scope.HideForm = function () {
        $scope.divDeveloper = false;
    }

    //#endregion

    //#region ProjectsController Region
    //get all projects
    function getAllProjects() {
        var getData = service.getProjects();
        getData.then(function (proj) {
            $scope.projects = proj.data;
        }, function () {
            alert('Error in getting records');
        });
    }

    getAllProjects();

    //edit project
    $scope.EditProject = function (project) {
        var getData = service.getProject(project.Id);
        getData.then(function (proj) {
            $scope.project = proj.data;
            $scope.projectId = project.Id;
            $scope.projectName = project.Name;
            $scope.Action = "Update";
            $scope.divProject = true;
        }, function () {
            alert('Error in getting record');
        });
    }

    //add or update project
    $scope.AddUpdateProject = function () {
        var projName = $('#ProjName').val();
        if (projName == null || projName === "") {
            alert("Name is required");
        } else {
            var project = {
                Name: $scope.projectName
            };
            var getAction = $scope.Action;
            var getData;
            if (getAction === "Update") {
                getData = service.updateProj($scope.projectId, project);
                getData.then(function (msg1) {
                    getAllProjects();
                    alert('Project Id: ' + msg1.data.Id + " is Updated");
                    $scope.divProject = false;
                }, function () {
                    alert('Error in updating record');
                });
            } else {
                getData = service.addProj(project);
                getData.then(function (msg1) {
                    getAllProjects();
                    alert('Project Name: ' + msg1.data.Name + ' is Added');
                    $scope.divProject = false;
                }, function () {
                    alert('Error in adding record');
                });
            }
        }
    }
    //add project form
    $scope.AddProjectDiv = function () {
        clearFields();
        $scope.Action = "Add";
        $scope.divProject = true;
    }

    //delete project
    $scope.deleteProject = function (project) {
        var getData = service.DeteleProj(project.Id);
        getData.then(function () {
            getAllProjects();
            alert("Project Deleted");
        }, function () {
            alert("Error in Deleting Record");
        });
    }
    //#endregion

    //#region FeaturesController Region

    //get feature by project Id
    $scope.getFeature = function (projectId) {
        var getData = service.getFeature(projectId);
        $scope.divFeature = false;
        $scope.Features = true;
        getData.then(function (ftr) {
            $scope.features = ftr.data;
        }, function () {
            alert('Error in getting record');
        });
    }

    //edit feature
    $scope.editFeature = function (feature) {
        var getData = service.getFeature2(feature.FeatureId);
        getData.then(function (ftr) {
            $scope.feature = ftr.data;
            $scope.featureId = feature.FeatureId;
            $scope.featureName = feature.FeatureName;
            $scope.featureDescription = feature.FeatureDescription;
            $scope.featureProjectId = feature.ProjectId;
            $scope.Action = "Update";
            $scope.divFeature = true;
        }, function () {
            alert('Error in getting record');
        });
    }

    //add or update feature
    $scope.AddUpdateFeature = function () {
        var feature = {
            FeatureName: $scope.featureName,
            FeatureDescription: $scope.featureDescription,
            ProjectId: $scope.featureProjectId
        };
        var getAction = $scope.Action;
        var getData;
        if (getAction === "Update") {
            feature.FeatureId = $scope.featureId;
            getData = service.updateFtr($scope.featureId, feature);
            getData.then(function () {
                $scope.getFeature(feature.ProjectId);
                alert("Feature Id : " + $scope.featureName + " is Updated");
                $scope.divFeature = false;
            }, function () {
                alert("blabla");
            });
        } else {
            getData = service.addFtr(feature);
            getData.then(function () {
                $scope.Action = "Add";
                $scope.getFeature(feature.ProjectId);
                alert("Developer Name : " + $scope.featureName + " is Added");
                $scope.divFeature = false;
            });
        }
    }

    //delete feature
    $scope.deleteFeature = function (feature) {
        var confirmation = confirm(feature.FeatureName + " will be deleted");
        if (confirmation === true) {
            var getData = service.deleteFtr(feature.FeatureId);
            getData.then(function () {
                $scope.getFeature(feature.ProjectId);
                alert('Feature Deleted');
            }, function () {
                alert('Error in Deleting Record');
            });
        } else {
            console.log("Confirmation val = " + confirmation);
        }
    }

    //clear form
    function clearFeatureFields() {
        $scope.featureId = "";
        $scope.featureName = "";
        $scope.featureDescription = "";
        $scope.featureProjectId = "";
    }

    //#endregion

    //#region Tasks Region
    //get task by feature id
    $scope.getTasks = function (feature) {
        var getData = service.getTask(feature.FeatureId);
        getData.then(function (task) {
            $scope.Tasks = true;
            $scope.tasks = task.data;
        }, function () {
            alert('Error in gettind record');
        });
    }

    //edit task
    $scope.editTask = function (task) {
        var getData = service.getTask2(task.TaskId);
        getData.then(function (tk) {
            $scope.task = tk.data;
            $scope.taskId = task.TaskId;
            $scope.featureId = task.FeatureId;
            $scope.developerId = task.DeveloperId;
            $scope.workLoad = task.WorkLoad;
            $scope.open = task.Open;
            $scope.description = task.Description;
            $scope.Action = "Update";
            $scope.divTask = true;
        }, function () {
            alert('Error in getting record');
        });
    }

    //add or update task
    $scope.AddUpdateTask = function () {
        var task = {
            FeatureId: $scope.taskId,
            DeveloperId: $scope.developerId,
            WorkLoad: $scope.workLoad,
            Open: $scope.open,
            Description: $scope.description,
            ClosingDate: $scope.closingDate
        };

        var getAction = $scope.Action;
        var getData;
        if (getAction === "Update") {
            task.TaskId = $scope.taskId;
            getData = service.updateTask($scope.taskId, task);
            getData.then(function () {
                var reloadTasks = service.getTask(task.FeatureId);
                reloadTasks.then(function (task1) {
                    $scope.tasks = task1.data;
                });
                alert("Task Id: " + $scope.taskId + " is Updated");
                $scope.divTask = false;
            }, function () {
                alert("error");
            });
        } else {
            getData = service.addTask(task);
            getData.then(function () {
                $scope.Action = "Add";
                var reloadTasks = service.getTask(task.FeatureId);
                reloadTasks.then(function (task1) {
                    $scope.tasks = task1.data;
                });
                alert("Task Id: " + $scope.taskId + " is Added");
                $scope.divTask = false;
            });
        }
    }

    //close task
    $scope.Close = function (task) {
        var taskToUpdate = {
            FeatureId: task.TaskId,
            DeveloperId: task.DeveloperId,
            WorkLoad: task.WorkLoad,
            Open: false,
            Description: task.Description,
            ClosingDate: Date.now()
        }
        //update task
        var getData = service.updateTask(task.TaskId, taskToUpdate);
        getData.then(function () {
            var reloadTasks = service.getTask(task.FeatureId);
            reloadTasks.then(function (task1) {
                $scope.tasks = task1.data;
                $scope.closeTaskBtn = false;
            });
            alert("Task Id: " + $scope.taskId + " is Updated");
            $scope.divTask = false;
        }, function () {
            alert("error");
        });
    }

    //clear task form
    function clearTaskFields() {
        $scope.taskId = "";
        $scope.featureId = "";
        $scope.developerId = "";
        $scope.workLoad = "";
        $scope.open = "";
        $scope.description = "";
    }

    //#endregion



    //#region Buttons Region
    //hide project form
    $scope.HideProjectForm = function () {
        $scope.divProject = false;
    }
    //show projectdiv
    $scope.ShowProjectDiv = function () {
        $scope.Projects = true;
        $scope.ShowProjBtn = false;
        $scope.HideProjBtn = true;
    }
    //hide project div
    $scope.HideProjectDiv = function () {
        $scope.Projects = false;
        $scope.HideProjBtn = false;
        $scope.ShowProjBtn = true;
        $scope.Features = false;
        $scope.divFeature = false;
        $scope.divTask = false;

    }
    //show developer div
    $scope.ShowDevDiv = function () {
        $scope.Developers = true;
        $scope.ShowDevBtn = false;
        $scope.HideDevBtn = true;
    }
    //hide developer div
    $scope.HideDevDiv = function () {
        $scope.Developers = false;
        $scope.HideDevBtn = false;
        $scope.ShowDevBtn = true;
    }
    //add feature div
    $scope.AddFeatureDiv = function () {
        $scope.divFeature = true;
        clearFeatureFields();
    }
    //hide feature div
    $scope.HideFeatureDiv = function () {
        $scope.divFeature = false;
    }
    //hide task div
    $scope.HideTaskDiv = function () {
        $scope.divTask = false;
        clearTaskFields();
    }
    //add task div
    $scope.AddTaskDiv = function () {
        clearTaskFields();
        $scope.divTask = true;
    }
    //show tasks div
    $scope.ShowTasksDiv = function () {
        $scope.Tasks = true;
        $scope.HideTaskBtn = true;
        $scope.ShowTasksBtn = false;
    }
    //hide tasks div
    $scope.HideTasksDiv = function () {
        $scope.Tasks = false;
        $scope.ShowTasksBtn = true;
    }
    //#endregion
});