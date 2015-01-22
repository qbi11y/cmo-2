var app = angular.module('Data', ['firebase']);

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
})