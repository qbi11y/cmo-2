var ctrl = angular.module('LinkedTenantControllers', ['firebase', 'Data']);

ctrl.controller('LinkedTenantController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
    $scope.currentLinkedTenant = $routeParams.linkedTenantID;
    
    //$scope.catalog = Catalog.getCatalog();
}]);

ctrl.controller('StoreController', ['$scope', '$http', '$routeParams', 'Catalog',  function($scope, $http, $routeParams, Catalog) {
    $scope.providerFilter = [];
    $scope.currentLinkedTenantID = $routeParams.linkedTenantID;
    $scope.compareItems = [];

    $scope.updateCompare = function(data, action) {
        console.log(data, action);
        if (action) {
            $scope.compareItems.push(data);
        } else {
            for (var n=0; n < $scope.compareItems.length; n++) {
                if ($scope.compareItems[n].id == data.id) {
                    $scope.compareItems.splice(n, 1);
                }
            }
        }
    };

    $http.get('../api/getLinkedTenantDetails.php?linkedTenantID='+$routeParams.linkedTenantID).success(function(data) {
        console.log('linked catalog', data);
        for (var n=0; n < data.services.length; n++) {
            data.services[n].visible = true;
        }
        Catalog.setCatalog(data);
        $scope.catalog = Catalog.getCatalog();
        $scope.filteredCatalog = Catalog.getCatalog();
    });

    $http.get('../api/getDefaultCatalogProviders.php').success(function(data) {
        console.log('provider', data);
        $scope.defaultCatalogProviders = data;
    });

    $scope.updateProviderFilter = function(data, action) {
        if (action) {
            $scope.providerFilter.push(data);
        } else {
            for (var p=0; p < $scope.providerFilter.length; p++) {
                if ($scope.providerFilter[p].id == data.id) {
                    $scope.providerFilter.splice(p, 1);
                }
            }
        }

        if ($scope.providerFilter.length == 0) {
            for (var x=0; x < $scope.catalog.services.length; x++)  {
                $scope.catalog.services[x].visible = true;
            }
        } else {
            for (var n=0; n < $scope.catalog.services.length; n++) {
                for (var i=0; i < $scope.providerFilter.length; i++) {
                    if ($scope.providerFilter[i].id != $scope.catalog.services[n].providerID) {
                        $scope.catalog.services[n].visible = false;
                    } else {
                        $scope.catalog.services[n].visible = true;
                        break;
                    }
                }
            }
        }    
    }

    $scope.selectedView = 'grid';
    $scope.defaultCatalogProviders = [];
}]);

ctrl.controller('ConfigureServiceController', ['$scope', '$http', function() {

}]);