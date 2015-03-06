var ctrl = angular.module('MasterTenantControllers', ['firebase', 'Data']);

ctrl.controller('CreateTenantController', ['$scope', '$http', function($scope, $http) {
    
}]);

ctrl.controller('AdministrationController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.currentMasterTenantID = $routeParams.masterTenantID;
    $scope.currentUserID = $routeParams.userID;
    $scope.userRoles = [];
    $scope.allUsers = [];
    $scope.addedUser = {};
    
    if ($scope.allUsers.length == 0) {
        $http.get('../api/getUsers.php?masterTenantID='+$scope.currentMasterTenantID).success(function(response) {
                console.log('response data', response);
                $scope.allUsers = response.users;
                $scope.roles = response.roles;
            });
    }

    $scope.addUser = function(data) {
        data.tenantID = 0;
        $http.post('../api/addUser.php', data).success(function(response) {
            console.log('added users', response);
            $scope.addedUser = response;
        });
    };

    $http.get('../api/getUserRoles.php').success(function(data) {
        $scope.userRoles = data;
    });
}]); 

ctrl.controller('OrderController', ['$scope', '$http', '$routeParams','Orders', function($scope, $http, $routeParams, Orders) {
    $scope.currentMasterTenantID = $routeParams.masterTenantID;
    $scope.currentUserID = $routeParams.userID;
    $scope.orders = Orders.getOrders();
    $scope.orderItems = Orders.getOrderItems();
    $scope.totalItems = 0;
    $scope.currentMasterTenantID = $routeParams.masterTenantID;

    $http.post('../api/getOrderItems.php', $scope.orders).success(function(data) {
        console.log('items', data);
        Orders.setOrderItems(data);
        $scope.orderItems = Orders.getOrderItems();
        $scope.sortOrders();
    });

    $scope.sortOrders = function() {
        var totalItems = 0;
        for (var n=0; n < $scope.orders.length; n++) {
            var count = 0;
           for (var i=0; i < $scope.orderItems.length; i++) {
                for (var s=0; s < $scope.orderItems[i].length; s++){
                    if ($scope.orders[n].orderID == $scope.orderItems[i][s].orderID) {
                        count++;
                        totalItems++;
                        $scope.totalItems = totalItems;
                        $scope.orders[n].totalItems = count;
                        console.log($scope.orders[n].totalItems, $scope.orderItems[i][s]);                         
                    }                   
                }                
           }
        }
    }

    console.log('orders to send', $scope.orders);
    

    /*
    for (var n=0; n < $scope.orders.length; n++) {
        
        $http.get('../api/getOrderItems.php?orderID='+$scope.orders[n].orderID).success(function(data) { 
            console.log(n);
            Orders.setOrderItems(data);            
            if (n == $scope.orders.length) {            
                $scope.sortOrders(Orders.getOrderItems());
            }
        });
        
    }
    */

    
}]);

ctrl.controller('LinkedTenantDetailsController', ['$scope', '$http', '$routeParams','Tenant','Catalog', function($scope, $http, $routeParams, Tenant, Catalog) {
$scope.currentMasterTenantID = $routeParams.masterTenantID;
    $scope.currentUserID = $routeParams.userID;
$scope.compareCatalogs = function(){
    //console.log('compare default', $scope.defaultCatalog.services);
    //console.log('compare tenant', $scope.linkedTenantCatalog.services);

    for (var n=0; n < $scope.defaultCatalog.services.length; n++) {
        for (var i=0; i < $scope.linkedTenantCatalog.services.length; i++) {
            if ($scope.defaultCatalog.services[n].id == $scope.linkedTenantCatalog.services[i].defaultCatalogID) {
                $scope.defaultCatalog.services[n].visible = true;
                break;
            } else {
                $scope.defaultCatalog.services[n].visible = false;
            }
        }
    }
    $scope.updatedLinkedTenantCatalog = $scope.linkedTenantCatalog;
    //console.log('default data', $scope.defaultCatalog.services);
    //console.log('tenant data', $scope.linkedTenantCatalog.services);
}

 $scope.getTenantDetails = function(masterTenantID, linkedTenantID) {
    $http.get('../api/getLinkedTenantDetails.php?linkedTenantID='+linkedTenantID).success(function(data) { 
        
        console.log('tenant data', data);
        Tenant.setTenant(data);
        $scope.currentLinkedTenant = Tenant.getTenant();
        $scope.linkedTenantCatalog = Tenant.getTenant();
        $scope.compareCatalogs();
    });
};

$scope.getDefaultCatalog = function() {
    $http.get('../api/getDefaultCatalog.php').success(function(catalog) {
        //console.log('default catalog', catalog);
        for (var i=0; i < catalog.providers.length; i++) {
            for (var n=0; n < catalog.services.length; n++) {
                if (catalog.providers[i].id == catalog.services[n].providerID) {
                    catalog.services[n].icon = catalog.providers[i].icon;
                }
            }
        }
        //console.log('new catalog', catalog);
        Catalog.setDefaultCatalog(catalog);
        $scope.defaultCatalog = Catalog.getDefaultCatalog();
        $scope.getTenantDetails($routeParams.masterTenantID, $routeParams.linkedTenantID);
    });
}

$scope.updateCatalog = function(data, action) {
    
    console.log('service compare', data.id, $scope.updatedLinkedTenantCatalog.services);
    console.log('new catalog before', $scope.updatedLinkedTenantCatalog.services);
    
    if (action) {
        data.serviceName = data.name;
        data.defaultCatalogID = data.id;
        data.linkedTenantID = $scope.currentLinkedTenant.info.id;
        //delete data.id;
        //delete data.name;
        //console.log('data to push/pull', data);
        $scope.updatedLinkedTenantCatalog.services.push(data);
    } else {

        for (var n=0; n < $scope.updatedLinkedTenantCatalog.services.length; n++) {
            console.log('REMOVE', typeof($scope.updatedLinkedTenantCatalog.services[n].defaultCatalogID));
            console.log('REMOVE2', typeof(data.id));
            if ($scope.updatedLinkedTenantCatalog.services[n].defaultCatalogID == data.id) {
                
                $scope.updatedLinkedTenantCatalog.services.splice(n, 1);
            }
        }
    }
    console.log('new catalog after', $scope.updatedLinkedTenantCatalog.services);
    Catalog.setUpdatedLinkedTenantCatalog($scope.updatedLinkedTenantCatalog);
    //console.log('catalog is now set', Catalog.getUpdatedLinkedTenantCatalog());
    

}

$scope.updateLinkedTenantCatalog = function() {
    console.log('updated catalog', Catalog.getUpdatedLinkedTenantCatalog());
    
    $http.post('../api/updateLinkedTenantCatalog.php', Catalog.getUpdatedLinkedTenantCatalog())

        .success(function (data) {
            console.log('updated tenant catalog ', data);
        });
}

//$scope.linkedTenantCatalog = Tenant.getTenant();
//$scope.defaultCatalog = Catalog.getCatalog();

$scope.getDefaultCatalog();
    
}]);

ctrl.controller('LinkedTenantsList', ['$scope', '$http','$routeParams','TenantList','MasterTenant', function($scope, $http, $routeParams, TenantList, MasterTenant) {
    $scope.currentMasterTenantID = $routeParams.masterTenantID;
    $scope.currentUserID = $routeParams.userID;
    MasterTenant.setCurrentMasterTenant($routeParams.masterTenantID);
    $scope.currentMasterTenant = MasterTenant.getCurrentMasterTenant();
    //console.log('current MT', $scope.currentMasterTenant);
    $scope.linkedTenantsList = TenantList.getTenantList();
    $http.get('getTenantList.php?masterTenantID='+$routeParams.masterTenantID).success(function(data) {
            //console.log('linked tenants', data)
            TenantList.setTenantList(data);
            $scope.linkedTenantsList = TenantList.getTenantList();
        });
}]);

ctrl.controller('CatalogController', ['$scope','$http','$routeParams','MasterTenant','Catalog', function($scope, $http, $routeParams, MasterTenant, Catalog) {
    $scope.currentMasterTenantID = $routeParams.masterTenantID;
    $scope.currentUserID = $routeParams.userID;
    $scope.catalog = {};
    MasterTenant.setCurrentMasterTenant($routeParams.masterTenantID);
    $scope.currentMasterTenant = MasterTenant.getCurrentMasterTenant();
    //console.log('url', $routeParams.masterTenantID);
    $http.get('getMTInfo.php?masterTenantID='+$routeParams.masterTenantID).success(function(data) {
        //console.log('mt catalog', data);
        if (data.defaultCatalog == true) {
            //console.log('show the catalog');
            $http.get('getCatalog.php').success(function(catalog) {
                //console.log('mt catalog', catalog);
                for (var i=0; i < catalog.providers.length; i++) {
                    for (var n=0; n < catalog.services.length; n++) {
                        if (catalog.providers[i].id == catalog.services[n].providerID) {
                            catalog.services[n].icon = catalog.providers[i].icon;
                        }
                    }
                }
                //console.log('new catalog', catalog);
                Catalog.setCatalog(catalog);
                $scope.catalog = Catalog.getCatalog();
            });

        } else {
            //console.log('catalog is empty');
        }
    });
}]);

ctrl.controller('MasterTenantController', ['$scope', '$http','$routeParams', '$firebase', 'MasterTenant', 'TenantList', 'Orders', 'Users', function($scope, $http, $routeParams, $firebase, MasterTenant, TenantList, Orders, Users) {
    $scope.currentMasterTenantID = $routeParams.masterTenantID;
    $scope.currentUserID = $routeParams.userID;
    $scope.currentUser = Users.getCurrentUser();
    $scope.orders = Orders.getOrders();

    if (!$scope.currentUser.id) {
        $http.get('../api/getUser.php?id='+$routeParams.userID).success(function(response) {
            Users.setCurrentUser(response);
            $scope.currentUser = Users.getCurrentUser();
        });
    };
    

    $scope.getOrders = function() {
       $http.get('../api/getOrders.php?masterTenantID='+$routeParams.masterTenantID).success(function(data) {
            console.log('order data', data);
            Orders.setOrders(data);
            $scope.orders = Orders.getOrders();
       });
    }
    $scope.getOrders();
    //var sync = $firebase(fb);
    //var syncObject = sync.$asArray();
    //console.log('firebase  object', syncObject);
    $scope.getTenantList = function() {
        $http.get('getTenantList.php?masterTenantID='+$routeParams.masterTenantID).success(function(data) {
            TenantList.setTenantList(data);
            $scope.tenantList = TenantList.getTenantList();
        });
    }
    $scope.getTenantList();
    $scope.tenantList = TenantList.getTenantList();
    //console.log('tenants', TenantList.getTenantList());
    

    
    MasterTenant.setCurrentMasterTenant($routeParams.masterTenantID);
    $scope.currentMasterTenant = MasterTenant.getCurrentMasterTenant();

    //console.log('current master tenant ', MasterTenant.getCurrentMasterTenant());
    //$scope.test = $routeParams.masterTenantID; 
    
    //console.log('i should see this', TenantList.getTenantList($routeParams.masterTenantID));

    $http.get('database.php?masterTenantID='+$routeParams.masterTenantID).success(function(data) {
        //console.table(data);
    });
}]);

ctrl.controller('TenantController', ['$scope', '$routeParams', '$firebase','$http', 'Tenant', 'MasterTenant', 'Catalog','TenantCatalog', function($scope, $routeParams, $firebase, $http, Tenant, MasterTenant, Catalog, TenantCatalog) {
    $scope.currentMasterTenantID = $routeParams.masterTenantID;
    $scope.currentUserID = $routeParams.userID;
    $http.get('getMTInfo.php?masterTenantID='+$routeParams.masterTenantID).success(function(data) {
        //console.log('mt catalog', data);
        if (data.defaultCatalog == true) {
            //console.log('show the catalog');
            $http.get('../api/getDefaultCatalog.php').success(function(defaultCatalog) {

                //merge the provider icon information with the services information
                for (var i=0; i < defaultCatalog.providers.length; i++) {
                    for (var n=0; n < defaultCatalog.services.length; n++) {
                        if (defaultCatalog.providers[i].id == defaultCatalog.services[n].providerID) {
                            defaultCatalog.services[n].icon = defaultCatalog.providers[i].icon;
                        }
                    }
                }
                
                //console.log('new catalog', defaultCatalog);
                Catalog.setDefaultCatalog(defaultCatalog);
                $scope.defaultCatalog = Catalog.getDefaultCatalog();
            });

        } else {
            console.log('catalog is empty');
        }
    });
    $scope.defaultCatalog = Catalog.getDefaultCatalog();
    $scope.tenantCatalog = TenantCatalog.getCatalog();


    $scope.tenantForm = Tenant.getTenant();
    $scope.tenant = Tenant.getTenant();
    MasterTenant.setCurrentMasterTenant($routeParams.masterTenantID);
    $scope.currentMasterTenant = MasterTenant.getCurrentMasterTenant();
    Tenant.setTenant
    $scope.currentLinkedTenant = Tenant.getTenant();
    //console.log('linked tenant', Tenant.getTenant());

    $scope.updateTenantCatalog = function(service, action) {
        console.log('linked tenant catalog', service);
        if (action) {
            TenantCatalog.addService(service);
        } else {
            TenantCatalog.removeService(service);
        }
    }

    $scope.setTenant = function() {
        Tenant.setTenant($scope.tenantForm);
    }

    $scope.createTenant = function() {
        //console.log('creating the linked tenant', Tenant.getTenant());
        $http.post('../api/uploadLinkedTenant.php', Tenant.getTenant())

        .success(function (data) {
            console.log('new linked tenant', data);
            Tenant.setTenant(data);
            //console.log('new tenant ', Tenant.getTenant());
        });
        var fb = new Firebase('https://cmo-master-tenants.firebaseio.com/'+MasterTenant.getCurrentMasterTenant());
        var fb_tenants = fb.child('tenants');
        var sync = $firebase(fb_tenants);
        var syncObject = sync.$asArray();
        syncObject.$add(Tenant.getTenant());
    }
}]);