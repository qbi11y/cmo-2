var ctrl = angular.module('LinkedTenantControllers', ['firebase', 'Data']);

ctrl.controller('LinkedTenantController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
    $scope.currentLinkedTenant = $routeParams.linkedTenantID;
    
    //$scope.catalog = Catalog.getCatalog();
}]);

ctrl.controller('StoreController', ['$scope', '$http', '$routeParams', 'Catalog',  function($scope, $http, $routeParams, Catalog) {
    $http.get('getCatalog.php?linkedTenantID='+$routeParams.linkedTenantID).success(function(data) {
        console.log('linked catalog', data);
        Catalog.setCatalog(data);
        $scope.catalog = Catalog.getCatalog();
    })
}]);