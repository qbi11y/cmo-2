var app = angular.module('CloudMatrix', ['ngRoute', 'MasterTenantControllers']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider

    .when('/tenants/:id', {
        templateUrl: 'main.html',
        controller: 'MasterTenantController'
    })

    .when('/create-tenant/:id', {
        templateUrl: 'create-tenant.html',
        controller: 'TenantController'
    })

    .when('/create-tenant-catalog/:id', {
        templateUrl: 'create-tenant-catalog.html',
        controller: 'TenantController'
    })

    .when('/create-tenant-summary', {
        templateUrl: 'create-tenant-summary.html',
        controller: 'TenantController'
    })

    .when('/catalog/:id', {
        templateUrl: 'catalog.html',
        controller: 'CatalogController'
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