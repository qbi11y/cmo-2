var app = angular.module('Data', ['firebase']);

app.factory('MasterTenant', ['$firebase', function($firebase) {
    var masterTenant = {};
    
    
    

    return {
        getMasterTenant:  function() {
            return masterTenant
        },
        setMasterTenant: function(data) {
            masterTenant = data;
        },
        createMasterTenant: function(data) {            
            console.log('create', data);
            var fb = new Firebase('https://cmo-master-tenants.firebaseio.com/');
            var newFB = fb.child(data[0].id);
            var path = newFB.toString();
            var sync = $firebase(newFB);
            var syncObject = sync.$asArray();
            syncObject.$add(data);

        }
    }
}]);