var ctrl = angular.module('BrokerControllers', ['Data']);

ctrl.controller('CatalogController', ['$scope', '$http', function($scope, $http) {
    $scope.providers = [];
    $scope.services = [];
    $http.get('catalog.php').success(function(data) {
        console.log('php ', data);
        for (var i=0; i < data.providers.length; i++) {
            for (var n=0; n < data.services.length; n++) {
                if (data.providers[i].id == data.services[n].providerID) {
                    data.services[n].icon = data.providers[i].icon;
                }
            }
        }
        $scope.showDetails = function(id) {

        }
        $scope.services = data.services;
    });
}]);

ctrl.controller('BrokerController', ['$scope', '$http', 'MasterTenant', function($scope, $http, MasterTenant) {
    $scope.masterTenantID = 23; 
    
    /*
    $http.get('database.php').success(function(data) {
        console.log('php ', data);
    });
    */

    $scope.createMasterTenant = function() {
        console.log('sending to mysql', MasterTenant.getMasterTenant());
        $http.post('uploadMasterTenant.php', MasterTenant.getMasterTenant())

        .success(function (data) {
            console.log('new id ', data);
            MasterTenant.createMasterTenant(data);
            $scope.masterTenantID =  data[0].id;
        });
    };

    
    $scope.masterTenantForm = {};
    $scope.mt = MasterTenant.getMasterTenant();
    $scope.setMasterTenant = function() {
        MasterTenant.setMasterTenant($scope.masterTenantForm);
        console.log(MasterTenant.getMasterTenant());
    }    
}]);