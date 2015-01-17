var ctrl = angular.module('BrokerControllers', ['Data']);

ctrl.controller('BrokerController', ['$scope', '$http', 'MasterTenant', function($scope, $http, MasterTenant) {
    $scope.masterTenantID = 23; 
    
    /*
    $http.get('database.php').success(function(data) {
        console.log('php ', data);
    });
    */

    $scope.createMasterTenant = function() {
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