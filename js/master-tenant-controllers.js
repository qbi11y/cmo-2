var ctrl = angular.module('MasterTenantControllers', ['firebase', 'Data']);

ctrl.controller('MasterTenantController', ['$scope', '$http','$routeParams', '$firebase', function($scope, $http, $routeParams, $firebase) {
    var fb = new Firebase('https://cmo-master-tenants.firebaseio.com/'+$routeParams.id);
    var sync = $firebase(fb);
    var syncObject = sync.$asArray();
    console.log('firebase  object', syncObject);
    syncObject.$add({tenants: 'hello'});
    syncObject.$add({tenants: 'whats up'});

    $scope.test = $routeParams.id; 

    $http.get('database.php?id='+$routeParams.id).success(function(data) {
        console.table(data);
    });
}]);

ctrl.controller('TenantController', ['$scope','Tenant', function($scope, Tenant) {
    $scope.tenantForm = {};
    $scope.tenant = Tenant.getTenant();
    $scope.setTenant = function() {
        Tenant.setTenant($scope.tenantForm);
    }
}]);