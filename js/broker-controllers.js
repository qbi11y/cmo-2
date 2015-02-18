var ctrl = angular.module('BrokerControllers', ['Data']);
/*
any controllers for the main.html broker portal go here
*/
ctrl.controller('BrokerController', ['$scope', '$http','$routeParams', 'ListViews', 'Catalog', function($scope, $http, $routeParams, ListViews, Catalog) {
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.masterTenants = [];
    $scope.linkedTenants = [];
    $scope.catalog = [];
    $scope.totalServices = 0;

    $scope.getServiceCount = function(data) {
        var providers = data.providers;
        var services = data.services;
        var catalog = [];
        $scope.totalServices = services.length;

        for (var i=0; i<providers.length; i++) {
            var catalogItem = {};
            var providerName = providers[i].name;
            var providerServices = [];
            for (var n=0; n<services.length; n++) {
                if (providers[i].id == services[n].providerID) {
                    providerServices.push(services[n]);
                }                
            }
            catalogItem.providerName = providerName;
            catalogItem.providerServices = providerServices;
            catalog.push(catalogItem);
        }
        
        Catalog.setCatalog(catalog);
        $scope.catalog = Catalog.getCatalog();
        console.log('catalog ', $scope.catalog);
    }

    $http.get('../api/getDefaultCatalog.php').success(function(response) {
        $scope.getServiceCount(response);
    });

    $scope.setListView = function(view) {
        ListViews.setView(view);
    }

    console.log('current broker', $scope.currentBrokerID);
    $http.get('../api/getMasterTenants.php?brokerID='+$scope.currentBrokerID).success(function(response) {
        console.log($scope.currentBrokerID);
        console.log(response);
        $scope.masterTenants = response;
    });

    $http.get('../api/getLinkedTenants.php?brokerID='+$scope.currentBrokerID).success(function(response) {
        $scope.linkedTenants = response;
    })

}]);

ctrl.controller('AdministrationController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.userForm = {};
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.userRoles = [];
    $scope.allUsers = [];
    $scope.addedUser = {};
    
    if ($scope.allUsers.length == 0) {
        $http.get('../api/getUsers.php').success(function(response) {
                console.log('response data', response);
                $scope.allUsers = response.users;
                $scope.roles = response.roles;
            });
    }

    $scope.addUser = function(data) {
        data.tenantID = 0;
        data.masterTenantID = 0
        $http.post('../api/addUser.php', data).success(function(response) {
            console.log('added users', response);
            $scope.addedUser = response;
            $scope.userForm = {};
            $scope.userForm.roleID = 0;
        });
    };

    $http.get('../api/getUserRoles.php').success(function(data) {
        $scope.userRoles = data;
    });
}]); 

/*
Controller for the master tenant list page
Fetches the list of master tenants to display
*/
ctrl.controller('TenantListController', ['$scope', '$http','$routeParams', 'MasterTenantList','MasterTenantDetails','ListViews', function($scope, $http, $routeParams, MasterTenantList, MasterTenantDetails, ListViews) {
    $scope.masterTenantList = [];
    $scope.linkedTenantList = [];
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.tenantView = ListViews.getView();
    $scope.hover = false;
    $scope.deleteItem = {};
    
    //sends request for the master tenant list
    console.log('get the master tenant list');
    $http.get('../api/getMasterTenants.php?brokerID='+$scope.currentBrokerID).success(function(data) {
        MasterTenantList.setMasterTenantList(data);  //set the master tenant list data object
        $scope.masterTenantList = MasterTenantList.getMasterTenantList(); //set the master tenant list equal to the data object
    }); 

    $http.get('../api/getLinkedTenants.php?brokerID='+$scope.currentBrokerID).success(function(response) {
        $scope.linkedTenantList = response;
    })

    $scope.delete = function(item) {
        $http.post('../api/deleteMasterTenant.php?masterTenantID='+item.id).success(function(response) {
            console.log('delete', $scope.masterTenantList);
            for (var i=0; i<$scope.masterTenantList.length; i++) {
                if ($scope.masterTenantList[i].id == item.id ) {
                    $scope.masterTenantList.splice(i, 1);
                }
            }

        })
    }  

    $scope.setDeleteItem = function(item) {
        $scope.deleteItem = item;
    }

    $scope.changeTenantView = function(view) {
        $scope.tenantView = view;
    } 

    $scope.isHovered = function(data) {
        return $scope.hover === data;
    }

    $scope.setHover = function(data, action) {
        if (action == 'enter') {
            $scope.hover = data;
        } else {
            $scope.hover = {};
        }
        
    }
}]);

/*
Controller for the master tenant details page
Fetches all of the data for the specified master tenant
*/
ctrl.controller('MasterTenantDetailsController',['$scope', '$http', '$routeParams','MasterTenantDetails', function($scope, $http, $routeParams, MasterTenantDetails) {
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.masterTenantDetails = MasterTenantDetails.getMasterTenantDetails();  //initate the masterTenantDetails variable
    $scope.getMasterTenantDetails = function(id) {
        $http.get('../api/getMasterTenantInfo.php?masterTenantID='+id).success(function(data) {
            MasterTenantDetails.setMasterTenantDetails(data); //set masterTenantDetails with the data returned from the database query
            $scope.masterTenantDetails = MasterTenantDetails.getMasterTenantDetails(); //update masterTenant Details with the new MasterTenant Details
        }).error(function(data) {
            console.log('error');
        });
    };

    $scope.getMasterTenantDetails($routeParams.masterTenantID);
}]);


/*
Controller for the default catalog
Fetches all of the data for the default catalog to be displayed
*/
ctrl.controller('CatalogController', ['$scope', '$http', '$routeParams', 'Catalog', function($scope, $http, $routeParams, Catalog) {
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $http.get('../api/getDefaultCatalog.php').success(function(response) {
        console.log('php ', response);
        Catalog.setCatalog(response);
        $scope.catalog = Catalog.getCatalog();
    });
    $scope.catalog = {};
}]);

ctrl.controller('CreateMasterTenantController', ['$scope', '$http','$routeParams', 'NewMasterTenant', function($scope, $http, $routeParams, NewMasterTenant) {
    //$scope.newMasterTenantID = 0;
    $scope.masterTenantForm = {};
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.createMasterTenant = function() {
        $http.post('../api/createNewMasterTenant.php', NewMasterTenant.getNewMasterTenant())

        .success(function (data) {
            console.log('new master tenant ', data);
        });
    };

    $scope.newMasterTenantInfo = NewMasterTenant.getNewMasterTenant();
    $scope.setNewMasterTenant = function() {
        NewMasterTenant.setNewMasterTenant($scope.masterTenantForm);
        //console.log(NewMasterTenant.getNewMasterTenant());
    }    
}]);


/*
Controller to handle the adding of new services to the catalog
*/
ctrl.controller('AddServiceController', ['$scope', '$http', '$routeParams', '$location', 'NewServiceData','Catalog', function($scope, $http, $routeParams, $location, NewServiceData, Catalog) {
    $scope.currentInputStep = '';
    $scope.showQuestions = true;
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.providers = [];
    $scope.addServiceForm = {};
    $scope.newServiceData = NewServiceData.getNewServiceData();
    $scope.defineService = {};
    $scope.attribute = {};
    $scope.customAttributes = [];
    $scope.catalog = Catalog.getCatalog();
    console.log('current catalog', $scope.catalog);

    $scope.enableContinue = function() {
        if ($scope.addServiceForm.providerID && /*$scope.addServiceForm.locations &&*/ $scope.addServiceForm.solutionCenter && $scope.addServiceForm.marketplace && /*$scope.addServiceForm.dependency &&*/ $scope.addServiceForm.type != 'select') {
            return true
        }
    }
    $scope.createAttribute = function(data) {
        var customAttribute = {};
        for (var n in data) {
            console.log('key ',n);
            customAttribute[n] = data[n];
        }
        
        if (data.inputType == 'select') {
            customAttribute.selectOptions = data.selectOptions.split(",");
            console.log('parse out select', data.attributeSelectOptions);
        }
        $scope.customAttributes.push(customAttribute);
        $scope.attribute = {};
    }

    $scope.hideQuestions = function() {
        $scope.showQuestions = false;
        if ($scope.addServiceForm.marketplace == 'yes') {
            console.log('marketplace checked');
            $scope.addServiceForm.enableMarketplace = true;
        }

        if ($scope.addServiceForm.solutionCenter == 'yes') {
            $scope.addServiceForm.enableSolutionCenter = true;
        }
        $scope.currentInputStep = 'information';
    }

    $scope.updateStep = function(step) {
        console.log('market ', $scope.defineService.marketplace )
        

        if (step == 'dependency' && $scope.defineService.dependency == 'no') {
            $scope.currentInputStep = 'summary';
        } else {
            $scope.currentInputStep = step;
        }
        console.log('current step - ', $scope.currentInputStep, 'dependency - ', $scope.defineService.dependency, 'type - ', $scope.defineService.type);
        
    }
    $scope.createNewDefaultCatalogService = function(data) {
        console.log('new service data', data);

        if (data.addProvider) {
            $http.post('../api/createNewDefaultCatalogProvider.php', data.addProvider).success(function (response) {
                /*
                $scope.updateCatalog('provider', response);
                $scope.newServiceToUpdate = NewServiceData.getNewServiceData();
                $scope.newServiceToUpdate.provider = data.id;
                NewServiceData.setNewServiceData($scope.newServiceToUpdate);
                $http.post('../api/createNewDefaultCatalogService.php', NewServiceData.getNewServiceData()).success(function (data) {
                    console.log('added service and provider', data);
                    $scope.updateCatalog('service', data);
                });
                */
            });

        } else {
            $http.post('../api/createNewDefaultCatalogService.php', data).success(function (response) {
                console.log('added service', response);
                //$scope.updateCatalog('service', response);
                $location.path('/'+$scope.currentBrokerID+'/'+$scope.currentUserID+'/catalog');
            })
        }
    };


    /*
    $scope.updateCatalog = function(type, data) {
        switch(type) {
            case 'provider':
                console.log('psuh provider', data);
                $scope.catalog = Catalog.getCatalog();
                $scope.catalog.providers.push(data);
                Catalog.setCatalog($scope.catalog);
                break;

            case 'service':
                $scope.catalog = Catalog.getCatalog();
                $scope.catalog.services.push(data);
                Catalog.setCatalog($scope.catalog);
                break;
        }        
        console.log('after update', Catalog.getCatalog());
    };
    */

    $scope.setNewServiceData = function(data) {
        NewServiceData.setNewServiceData(data);
        $scope.newServiceData = NewServiceData.getNewServiceData();
    };

    $scope.getProviders = function() {
       $http.get('../api/getDefaultCatalog.php').success(function(data) {
            //console.log('adding', data);
            $scope.providers = data.providers;
       });        
    }
    $scope.getProviders();
}]);



















