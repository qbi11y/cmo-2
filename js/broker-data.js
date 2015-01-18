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
            var mt = fb.child(data[0].id);
            var mt_info = mt.child('info');
            var sync = $firebase(mt_info);
            var syncObject = sync.$asArray();
            syncObject.$add(data);

        }
    }
}]);