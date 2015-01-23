var app = angular.module('CloudMatrix', ['ngRoute', 'LinkedTenantControllers']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider

    .when('/:linkedTenantID', {
        templateUrl: 'main.html',
        controller: 'LinkedTenantController'
    })

    .when('/:linkedTenantID/service-store', {
        templateUrl: 'services.html',
        controller: 'StoreController'
    })

    .when('/:linkedTenantID/service-store/configure-service/:serviceID', {
        templateUrl: 'services-configure.html',
        controller: 'ServiceConfigureController'
    })
}]);




/*
app.config(['$routeProvider', 
    function($routeProvider) {
    $routeProvider.when('/cmo/store', {
        templateUrl: 'templates/store/main.html',
        controller: 'ProductController'
    }).when('/details', {
        templateUrl: 'templates/store/details.html',
        controller: 'ProductController'
    }).when('/configure', {
        templateUrl: 'templates/store/configure.html',
        controller: 'ProductController'
    }).when('/summary', {
        templateUrl: 'templates/store/summary.html',
        controller: 'ProductController'
    }).when('/compare', {
        templateUrl: 'templates/store/compare.html',
        controller: 'ProductController'
    }).when('/cmo/manage', {
        templateUrl: 'templates/manage/main.html',
        controller: 'ManageController'
    }).when('/cmo/manage/details', {
        templateUrl: 'templates/mange/details.html',
        controller: 'ManageController'
    }).when('/cmo/catalog', {
        templateUrl: 'templates/catalog/main.html',
        controller: 'CatalogController'
    }).when('/details', {
        templateUrl: 'templates/catalog/details.html',
        controller: 'CatalogController'
    }).when('/edit-product', {
        templateUrl: 'templates/catalog/edit-product.html',
        controller: 'CatalogController'
    }).when('/add-product', {
        templateUrl: 'templates/catalog/add-product.html',
        controller: 'CatalogController'
    }).otherwise({
        redirectTo: '/cmo'
    });
}]);
*/