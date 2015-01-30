var app = angular.module('CloudMatrix', ['ngRoute', 'BrokerControllers']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider

    .when('/:brokerID/:userID', {
        templateUrl: 'main.html',
        controller: 'BrokerController'
    })

    .when('/:brokerID/:userID/create-master-tenant', {
        templateUrl: 'create-master-tenant.html',
        controller: 'CreateMasterTenantController'
    })

    .when('/:brokerID/:userID/create-master-tenant-summary', {
        templateUrl: 'create-master-tenant-summary.html',
        controller: 'CreateMasterTenantController'
    })

    .when('/:brokerID/:userID/catalog', {
        templateUrl: 'catalog.html',
        controller: 'CatalogController'
    })

    .when('/:brokerID/:userID/catalog/add-service', {
        templateUrl: 'catalog-add-service.html',
        controller: 'AddServiceController'
    })

    .when('/:brokerID/:userID/catalog/add-service-summary', {
        templateUrl: 'catalog-add-service-summary.html',
        controller: 'AddServiceController'
    })

    .when('/:brokerID/:userID/master-tenant-list',  {
        templateUrl: 'master-tenant-list.html',
        controller: 'MasterTenantListController'
    })

    .when('/:brokerID/:userID/master-tenant-details/:masterTenantID', {
        templateUrl: 'master-tenant-details.html',
        controller: 'MasterTenantDetailsController'
    })

    .when('/:brokerID/:userID/admin/users', {
        templateUrl: 'users.html',
        controller: 'AdministrationController'
    })

    .when('/:brokerID/:userID/admin/users/add-user', {
        templateUrl: 'add-user.html',
        controller: 'AdministrationController'
    })
}]);