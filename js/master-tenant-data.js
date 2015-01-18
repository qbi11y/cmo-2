var app = angular.module('Data', ['firebase']);

app.factory('Tenant', function() {
    var tenant = {};

    return {
        getTenant:  function() {
            return tenant
        },
        setTenant: function(form) {
            tenant = form;
        }
    }
});

app.factory('TenantList', ['$firebase', function($firebase) {
    var tenantList = [];

    return {
        getTenantList: function(id) {
            var fb = new Firebase('https://cmo-master-tenants.firebaseio.com/'+id+'/tenants');
            var sync = $firebase(fb);
            var syncObject = sync.$asArray();
            tenantList = syncObject;
            console.log(tenantList);
            return tenantList
        }

    }
}]);

app.factory('MasterTenant', function() {
    var currentMasterTenant = 0;

    return {
        getCurrentMasterTenant: function() {
            return currentMasterTenant
        },
        setCurrentMasterTenant: function(mt) {
            currentMasterTenant = mt;
        }
    }
})