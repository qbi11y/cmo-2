var ctrl = angular.module('BrokerControllers', ['Data']);
/*
any controllers for the main.html broker portal go here
*/
ctrl.controller('BrokerController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;

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
ctrl.controller('MasterTenantListController', ['$scope', '$http','$routeParams', 'MasterTenantList','MasterTenantDetails', function($scope, $http, $routeParams, MasterTenantList, MasterTenantDetails) {
    $scope.masterTenantList = [];
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    
    //sends request for the master tenant list
    $http.get('getMasterTenantList.php').success(function(data) {
        MasterTenantList.setMasterTenantList(data);  //set the master tenant list data object
        $scope.masterTenantList = MasterTenantList.getMasterTenantList(); //set the master tenant list equal to the data object
    });    
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
    $http.get('../api/getDefaultCatalog.php').success(function(data) {
        console.log('php ', data);
        Catalog.setCatalog(data);
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
            //console.log('new master tenant ', data);
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
ctrl.controller('AddServiceController', ['$scope', '$http', '$routeParams', 'NewServiceData','Catalog', function($scope, $http, $routeParams, NewServiceData, Catalog) {
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.providers = [];
    $scope.addServiceForm = {};
    $scope.newServiceData = NewServiceData.getNewServiceData();
    $scope.createNewDefaultCatalogService = function() {
        console.log('new service data', NewServiceData.getNewServiceData());

        if (NewServiceData.getNewServiceData().addProvider) {
            $http.post('../api/createNewDefaultCatalogProvider.php', NewServiceData.getNewServiceData().addProvider).success(function (data) {
                $scope.updateCatalog('provider',data);
                $scope.newServiceToUpdate = NewServiceData.getNewServiceData();
                $scope.newServiceToUpdate.provider = data.id;
                NewServiceData.setNewServiceData($scope.newServiceToUpdate);
                $http.post('../api/createNewDefaultCatalogService.php', NewServiceData.getNewServiceData()).success(function (data) {
                    console.log('added service and provider', data);
                    $scope.updateCatalog('service', data);
                });
            });
        } else {
            $http.post('../api/createNewDefaultCatalogService.php', NewServiceData.getNewServiceData()).success(function (data) {
                console.log('added service', data);
                $scope.updateCatalog('service', data);
            })
        }
    
    };

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



















