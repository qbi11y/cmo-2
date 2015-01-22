var app = angular.module('CloudMatrix', ['ngRoute', 'BrokerControllers']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'main.html',
        controller: 'BrokerController'
    })

    .when('/create-master-tenant', {
        templateUrl: 'create-master-tenant.html',
        controller: 'CreateMasterTenantController'
    })

    .when('/create-master-tenant-summary', {
        templateUrl: 'create-master-tenant-summary.html',
        controller: 'CreateMasterTenantController'
    })

    .when('/catalog', {
        templateUrl: 'catalog.html',
        controller: 'CatalogController'
    })

    .when('/catalog/add-service', {
        templateUrl: 'catalog-add-service.html',
        controller: 'AddServiceController'
    })

    .when('/catalog/add-service-summary', {
        templateUrl: 'catalog-add-service-summary.html',
        controller: 'AddServiceController'
    })

    .when('/master-tenant-list',  {
        templateUrl: 'master-tenant-list.html',
        controller: 'MasterTenantListController'
    })

    .when('/master-tenant-details/:masterTenantID', {
        templateUrl: 'master-tenant-details.html',
        controller: 'MasterTenantDetailsController'
    })

    //default route takes you to the store
    .otherwise({
        redirectTo: '/'
    });
}]);