var app = angular.module('CloudMatrix', ['ngRoute', 'MasterTenantControllers']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider

    .when('/:masterTenantID', {
        templateUrl: 'main.html',
        controller: 'MasterTenantController'
    })

    .when('/:masterTenantID/tenants', {
        templateUrl: 'main.html',
        controller: 'MasterTenantController'
    })

    .when('/:masterTenantID/create-tenant', {
        templateUrl: 'create-tenant.html',
        controller: 'TenantController'
    })

    .when('/:masterTenantID/create-tenant-catalog', {
        templateUrl: 'create-tenant-catalog.html',
        controller: 'TenantController'
    })

    .when('/:masterTenantID/create-tenant-summary', {
        templateUrl: 'create-tenant-summary.html',
        controller: 'TenantController'
    })

    .when('/:masterTenantID/linked-tenant-details/:linkedTenantID', {
        templateUrl: 'linked-tenant-details.html',
        controller: 'LinkedTenantDetailsController'
    })

    .when('/:masterTenantID/catalog', {
        templateUrl: 'catalog.html',
        controller: 'CatalogController'
    })

    .when('/:masterTenantID/linked-tenants-list', {
        templateUrl: 'linked-tenants-list.html',
        controller: 'LinkedTenantsList'
    })
}]);