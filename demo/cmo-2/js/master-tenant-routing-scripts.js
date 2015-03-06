var app = angular.module('CloudMatrix', ['ngRoute', 'MasterTenantControllers']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider

    .when('/:masterTenantID/:userID', {
        templateUrl: 'main.html',
        controller: 'MasterTenantController'
    })

    .when('/:masterTenantID/:userID/tenants', {
        templateUrl: 'main.html',
        controller: 'MasterTenantController'
    })

    .when('/:masterTenantID/:userID/create-tenant', {
        templateUrl: 'create-tenant.html',
        controller: 'TenantController'
    })

    .when('/:masterTenantID/:userID/create-tenant-catalog', {
        templateUrl: 'create-tenant-catalog.html',
        controller: 'TenantController'
    })

    .when('/:masterTenantID/:userID/create-tenant-summary', {
        templateUrl: 'create-tenant-summary.html',
        controller: 'TenantController'
    })

    .when('/:masterTenantID/:userID/linked-tenant-details/:linkedTenantID', {
        templateUrl: 'linked-tenant-details.html',
        controller: 'LinkedTenantDetailsController'
    })

    .when('/:masterTenantID/:userID/catalog', {
        templateUrl: 'catalog.html',
        controller: 'CatalogController'
    })

    .when('/:masterTenantID/:userID/linked-tenants-list', {
        templateUrl: 'linked-tenants-list.html',
        controller: 'LinkedTenantsList'
    })

    .when('/:masterTenantID/:userID/orders', {
        templateUrl: 'orders.html',
        controller: 'OrderController'
    })

    .when('/:masterTenantID/:userID/admin/users', {
        templateUrl: 'users.html',
        controller: 'AdministrationController'
    })

    .when('/:masterTenantID/:userID/admin/users/add-user', {
        templateUrl: 'add-user.html',
        controller: 'AdministrationController'
    })
}]);