var app = angular.module('Data', ['firebase']);

app.factory('Catalog', function() {
    var catalog;

    return {
        getCatalog: function() {
            return catalog
        },
        setCatalog: function(data) {
            catalog = data
        }
    }
});

app.factory('MasterTenantDetails', function() {
    var details = {};

    return {
        getMasterTenantDetails: function() {
            console.log('show details');
            return details
        },
        setMasterTenantDetails: function(data) {
            details = data
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