var app = angular.module('Data', ['firebase']);

app.factory('Users', ['$http', function($http) {
    var users = [];
    var user = 0;
    var tenant = 0;

    return {
        getUsers: function() {
            return users
        },
        setUsers: function(id) {
            
        },
        getUser: function() {
            

            return user;
        },
        setUser: function(data) {
            console.log('what tenant should be', data);
            user = data;
        },
        getTenant: function() {
            return tenant
        },
        setTenant: function(data) {
            tenant = data;
        }
    }
}]);

app.factory('Catalog', function() {
    var catalog = 'catalog array';

    return {
        getCatalog: function() {
            return catalog;
        },
        setCatalog: function(data) {
            catalog = data;
        }
    }
});

app.factory('Configure', function() {
    var item = {};

    return {
        getConfigureItem: function() {
            return item
        },
        setConfigureItem: function(data) {
            item = data;
        }
    }
});

app.factory('Service', function() {
    var service = {};

    return {
        getService: function() {
            return service
        },
        setService: function(data) {
            service = data
        }
    }
});

app.factory('Cart', function() {
    var cart = [];
    return {
        getCart: function() {
            return cart
        },
        clearCart: function() {
            cart = [];
        },
        addItem: function(data) {
            cart.push(data)
        },
        removeItem: function(data) {
            for (var n=0; n < cart.length; n++) {
                if (cart[n].id == data.id) {
                    cart.splice(n, 1);
                }
            }
        }
    }
})