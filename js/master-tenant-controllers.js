var ctrl = angular.module('MasterTenantControllers', ['firebase', 'Data']);

ctrl.controller('CatalogController', ['$scope','$http','$routeParams','MasterTenant', function($scope, $http, $routeParams, MasterTenant) {
    $scope.catalog = {};
    MasterTenant.setCurrentMasterTenant($routeParams.id);
    $scope.currentMasterTenant = MasterTenant.getCurrentMasterTenant();
    //console.log('url', $routeParams.id);
    $http.get('getMTInfo.php?id='+$routeParams.id).success(function(data) {
        //console.log('mt catalog', data);
        if (data.defaultCatalog == true) {
            //console.log('show the catalog');
            $http.get('getCatalog.php').success(function(catalog) {
                console.log('mt catalog', catalog);
                for (var i=0; i < catalog.providers.length; i++) {
                    for (var n=0; n < catalog.services.length; n++) {
                        if (catalog.providers[i].id == catalog.services[n].providerID) {
                            catalog.services[n].icon = catalog.providers[i].icon;
                        }
                    }
                }
                console.log('new catalog', catalog);
                $scope.catalog = catalog;
            });

        } else {
            console.log('catalog is empty');
        }
    });
}]);

ctrl.controller('MasterTenantController', ['$scope', '$http','$routeParams', '$firebase', 'MasterTenant', 'TenantList', function($scope, $http, $routeParams, $firebase, MasterTenant, TenantList) {
    
    //var sync = $firebase(fb);
    //var syncObject = sync.$asArray();
    //console.log('firebase  object', syncObject);

    MasterTenant.setCurrentMasterTenant($routeParams.id);
    $scope.currentMasterTenant = MasterTenant.getCurrentMasterTenant();

    console.log('current master tenant ', MasterTenant.getCurrentMasterTenant());
    //$scope.test = $routeParams.id; 
    $scope.tenantList = TenantList.getTenantList($routeParams.id);

    $http.get('database.php?id='+$routeParams.id).success(function(data) {
        console.table(data);
    });
}]);

ctrl.controller('TenantController', ['$scope', '$routeParams', '$firebase', 'Tenant', 'MasterTenant', function($scope, $routeParams, $firebase, Tenant, MasterTenant) {
    $scope.tenantForm = {};
    $scope.tenant = Tenant.getTenant();
    $scope.currentMasterTenant = MasterTenant.getCurrentMasterTenant();
    $scope.setTenant = function() {
        Tenant.setTenant($scope.tenantForm);
    }

    $scope.createTenant = function() {
        var fb = new Firebase('https://cmo-master-tenants.firebaseio.com/'+MasterTenant.getCurrentMasterTenant());
        var fb_tenants = fb.child('tenants');
        var sync = $firebase(fb_tenants);
        var syncObject = sync.$asArray();
        syncObject.$add(Tenant.getTenant());
    }
}]);