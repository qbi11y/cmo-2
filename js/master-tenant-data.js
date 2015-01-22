var app = angular.module('Data', ['firebase']);

app.factory('TenantCatalog', function() {
    var catalog = [];

    return {
        getCatalog: function() {
            return catalog
        },
        addService: function(service) {
            catalog.push(service);
        },
        removeService: function(service) {
            for (var n=0; n< catalog.length; n++) {
                if( catalog[n].defaultCatalogID == service.id) {
                    catalog.splice(n, 1);
                }
            }
        }
    }
});

app.factory('Catalog', function() {
    var catalog = [];
    var defaultCatalog = [];
    var updatedTenantCatalog = [];

    return {
        getCatalog: function() {
            return catalog
        },
        setCatalog: function(data) {
            catalog = data
        },
        getDefaultCatalog: function() {
            return defaultCatalog
        },
        setDefaultCatalog: function(data) {
            defaultCatalog = data;
        },
        getUpdatedLinkedTenantCatalog: function() {
            return updatedTenantCatalog;
        },
        setUpdatedLinkedTenantCatalog: function(data) {
            updatedTenantCatalog = data;
        }
    }
});

app.factory('Tenant',['MasterTenant','TenantCatalog',  function(MasterTenant, TenantCatalog) {
    var tenant = {};

    return {
        getTenant:  function() {
            return tenant
        },
        setTenant: function(form) {
            tenant = form;
            tenant.masterTenantID = MasterTenant.getCurrentMasterTenant();
            tenant.catalog = TenantCatalog.getCatalog();
        }
    }
}]);

app.factory('TenantList', ['$firebase','$http', function($firebase, $http) {
    var tenantList = [];

    return {
        getTenantList: function() {
            return tenantList
            /*
            var fb = new Firebase('https://cmo-master-tenants.firebaseio.com/'+id+'/tenants');
            var sync = $firebase(fb);
            var syncObject = sync.$asArray();
            tenantList = syncObject;
            console.log(tenantList);
            */
            
        },
        setTenantList: function(tenants) {
            tenantList = tenants;
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