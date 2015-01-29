var ctrl = angular.module('LinkedTenantControllers', ['firebase', 'Data']);

ctrl.controller('LinkedTenantController', ['$scope', '$http','$routeParams', 'Users','Cart', function($scope, $http, $routeParams, Users, Cart) {
    $scope.cartItems = Cart.getCart();
    $scope.currentLinkedTenantID = $routeParams.linkedTenantID;
    $scope.currentUserID = $routeParams.userID;
    $scope.currentUser = {};

    $scope.getUser = function(user) {
        $http.get('../api/getUser.php?id='+user).success(function(response) {
            Users.setUser(response);
            $scope.currentUser = Users.getUser();
        });
    }
}]);
    
ctrl.controller('CartController', ['$scope', '$http', '$routeParams', '$location', 'Cart', 'Users', function($scope, $http, $routeParams, $location, Cart, Users) {
    $scope.cartItems = Cart.getCart();
    $scope.cart = Cart.getCart();
    $scope.currentUser = Users.getUser();
    $scope.currentLinkedTenantID = $routeParams.linkedTenantID;
    $scope.currentUserID = $routeParams.userID;
    console.log('current user', $scope.currentUser);
    $scope.submitOrder = function(user, items) {
        $scope.order = {};
        $scope.order.user = user;
        $scope.order.items = items;
        console.log('sending order to server', $scope.order);
        $http.post('../api/createOrder.php', $scope.order).success(function(response) {
                console.log('response data', response);
                Cart.clearCart();
                $scope.cart = Cart.getCart();
                $scope.cartItems = Cart.getCart();
                $location.path('/'+$scope.currentLinkedTenantID+'/'+$scope.currentUserID+'/service-store');

                //window.location = '/79/11/service-store';
            });
    }
}]);

ctrl.controller('AdministrationController', ['$scope', '$http', '$routeParams','Users','Cart', function($scope, $http, $routeParams, Users,Cart) {
    $scope.cartItems = Cart.getCart();
    $scope.currentUser = Users.getUser();
    $scope.currentLinkedTenantID = $routeParams.linkedTenantID;
    $scope.currentUserID = $routeParams.userID;
    $scope.userRoles = [];
    $scope.userForm = {};
    $scope.addedUser = {};
    $scope.allUsers = [];
    $scope.roles = [];
    if ($scope.allUsers.length == 0) {
        $http.get('../api/getUsers.php?tenantID='+$scope.currentLinkedTenantID).success(function(response) {
                console.log('response data', response);
                $scope.allUsers = response.users;
                $scope.roles = response.roles;
            });
    }

    

    $http.get('../api/getUserRoles.php').success(function(data) {
        $scope.userRoles = data;
        console.log('roles', $scope.userRoles);
    });
    $scope.addUser = function(data) {
        console.log('data to send', data);
        $http.post('../api/addUser.php', data).success(function(response) {
            $scope.addedUser = response;
            $scope.userForm = {};
            $scope.userForm.roleID = 0;
            console.log('repsonse', response);
        });
    }
}]);    

ctrl.controller('HeaderController', ['$scope', '$http', '$routeParams', 'Cart', 'Users', function($scope, $http, $routeParams, Cart, Users) {
    $scope.cartItems = Cart.getCart();
    $scope.currentUserID = Users.getUser();
    $scope.currentLinkedTenantID = Users.getTenant();
    $scope.user = Users;
    console.log('tenant', $scope.currentLinkedTenantID);
}]);

ctrl.controller('ServiceDetailsController', ['$scope', '$http', '$routeParams','Service', function($scope, $http, $routeParams, Service) {
    $scope.service = Service.getService();
    $scope.currentLinkedTenantID = $routeParams.linkedTenantID;
}])

ctrl.controller('StoreController', ['$scope', '$http', '$routeParams', 'Catalog', 'Configure','Service', 'Users', 'Cart', function($scope, $http, $routeParams, Catalog, Configure, Service, Users, Cart) {
    $scope.cartItems = Cart.getCart();
    $scope.providerFilter = [];
    $scope.currentUser = Users.getUser();
    $scope.currentLinkedTenantID = $routeParams.linkedTenantID;
    $scope.currentUserID = $routeParams.userID;
    $scope.compareItems = [];
    $scope.setServiceDetails = function(data) {
        console.log(data);
        Service.setService(data);
    }

    $scope.isHovered = function(data) {
        return $scope.hover === data
    }

    $scope.setHover = function(data, action) {
        if (action == 'enter') {
            $scope.hover = data;
        } else {
            $scope.hover = {};
        }
        
    }

    $scope.configureService = function(data) {
        console.log('service to configure', data);
        Configure.setConfigureItem(data);
    };

    $scope.updateSelectedService = function(data) {
        if (data.type == 'mouseover') {
            $scope.hover = true;
        } else {
            console.log('out');
            $scope.hover = false;
        }
    } 

    $scope.updateCompare = function(data, action) {
        //console.log(data, action);
        if (action) {
            $scope.compareItems.push(data);
        } else {
            for (var n=0; n < $scope.compareItems.length; n++) {
                if ($scope.compareItems[n].id == data.id) {
                    $scope.compareItems.splice(n, 1);
                }
            }
        }
    };

    $http.get('../api/getLinkedTenantDetails.php?linkedTenantID='+$routeParams.linkedTenantID).success(function(data) {
        //console.log('linked catalog', data);
        for (var n=0; n < data.services.length; n++) {
            data.services[n].visible = true;
        }
        Catalog.setCatalog(data);
        $scope.catalog = Catalog.getCatalog();
        $scope.filteredCatalog = Catalog.getCatalog();
    });

    $http.get('../api/getDefaultCatalogProviders.php').success(function(data) {
        //console.log('provider', data);
        $scope.defaultCatalogProviders = data;
    });

    $scope.updateProviderFilter = function(data, action) {
        if (action) {
            $scope.providerFilter.push(data);
        } else {
            for (var p=0; p < $scope.providerFilter.length; p++) {
                if ($scope.providerFilter[p].id == data.id) {
                    $scope.providerFilter.splice(p, 1);
                }
            }
        }

        if ($scope.providerFilter.length == 0) {
            for (var x=0; x < $scope.catalog.services.length; x++)  {
                $scope.catalog.services[x].visible = true;
            }
        } else {
            for (var n=0; n < $scope.catalog.services.length; n++) {
                for (var i=0; i < $scope.providerFilter.length; i++) {
                    if ($scope.providerFilter[i].id != $scope.catalog.services[n].providerID) {
                        $scope.catalog.services[n].visible = false;
                    } else {
                        $scope.catalog.services[n].visible = true;
                        break;
                    }
                }
            }
        }    
    }

    $scope.selectedView = 'grid';
    $scope.defaultCatalogProviders = [];
}]);

ctrl.controller('ConfigureServiceController', ['$scope', '$http', '$routeParams', 'Configure','Cart', function($scope, $http, $routeParams, Configure, Cart) {
    $scope.item = Configure.getConfigureItem();
    $scope.currentLinkedTenantID = $routeParams.linkedTenantID;
    $scope.currentUserID = $routeParams.userID;
    console.log('linked tenant', $scope.currentLinkedTenantID);
    $scope.currentServiceID = $scope.item.id;

    $scope.addToCart = function(data) {
        Cart.addItem(data);
    }
    console.log($scope.item);
}]);