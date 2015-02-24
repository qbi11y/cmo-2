var app = angular.module('Data', ['firebase']);

app.factory('ListViews', function () {
    var view = 'master';

    return {
        getView: function() {
            return view
        },
        setView: function(newView) {
            view = newView;
        }
    }
})

app.factory('Catalog', ['$http', function($http) {
    var catalog;
    var defaultCatalog = [];
    var linkedTenantCatalog = [];
    var serviceProviders = [];

    return {
        setServiceProviders: function(data) {
            if (!data) {
                $http.get('../api/getServiceProviders.php').success(function(response) {        
                    serviceProviders = response;
                    return defaultCatalog
                });
            } else {
                serviceProviders.push(data);
            }
        },
        getServiceProviders: function() {
            if (serviceProviders.length == 0) {
                $http.get('../api/getServiceProviders.php').success(function(response) {        
                    serviceProviders = response;
                    console.log('defualt', defaultCatalog);
                    return serviceProviders
                });
            } else {
                return serviceProviders;
            }
        },
        getCatalog: function() {
            return catalog
        },
        setCatalog: function(data) {
            catalog = data
        },
        getDefaultCatalog: function() {
            if (defaultCatalog.length == 0) {
                console.log('default catalog empty');
                $http.get('../api/getDefaultCatalog.php').success(function(response) {        
                    defaultCatalog = response;
                    console.log('defualt', defaultCatalog);
                    return defaultCatalog
                });
            } else {
                return defaultCatalog;
            }
        },
        setDefaultCatalog: function(data) {            
            if (!data) {
                console.log('no data attribute');
                $http.get('../api/getDefaultCatalog.php').success(function(response) {        
                    defaultCatalog = response;
                    return defaultCatalog
                });
            } else {
                defaultCatalog = data;
            }
        },
        getLinkedTenantCatalog: function() {
            return linkedTenantCatalog
        },
        setLinkedTenantCatalog: function(data) {
            linkedTenantCatalog = data;
        }
    }
}]);

app.factory('TenantDetails', function() {
    var masterTenantDetails = {};
    var linkedTenantDetails = {};

    return {
        getMasterTenantDetails: function() {
            console.log('show details');
            return masterTenantDetails
        },
        setMasterTenantDetails: function(data) {
            masterTenantDetails = data
        },
        getLinkedTenantDetails: function() {
            return linkedTenantDetails
        },
        setLinkedTenantDetails: function(data) {
            linkedTenantDetails = data
        }
    }
});

app.factory('MasterTenantList', function() {
    var masterTenantList = [];
    return {
        getMasterTenantList: function() {
            return masterTenantList
        },
        setMasterTenantList: function(data) {
            masterTenantList = data
        }
    }
});

app.factory('NewMasterTenant', ['$firebase', function($firebase) {
    var newMasterTenant = {};   

    return {
        getNewMasterTenant:  function() {
            return newMasterTenant
        },
        setNewMasterTenant: function(data) {
            newMasterTenant = data;
        },
        createNewMasterTenant: function(data) {            
            console.log('create', data);
            var fb = new Firebase('https://cmo-master-tenants.firebaseio.com/');
            var mt = fb.child(data[0].id);
            var mt_info = mt.child('info');
            var sync = $firebase(mt_info);
            var syncObject = sync.$asArray();
            syncObject.$add(data);

        }
    }
}]);

app.factory('NewServiceData', function() {
    var newServiceData = {};

    return {
        getNewServiceData: function() {
            return newServiceData
        },
        setNewServiceData: function(data) {
            newServiceData = data
        }
    }
})