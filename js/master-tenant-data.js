var app = angular.module('Data', []);

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