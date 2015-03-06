var app = angular.module('CloudMatrix', ['Data']);

app.controller('CMController', ['$scope','$http', function($scope, $http) {
    $scope.broker = {};
    $scope.newMasterTenant = {};
    $scope.newLinkedTenant = {};
    $scope.user = {};
    $scope.showBrokerForm = true;

    $http.get('api/getDefaultCatalogProviders.php').success(function(response) {
        console.log('providers', response);
        $scope.providers = response;
    });

    $scope.createBroker = function(data) {
        //console.log('data for broker', data);
        $http.post('api/createBroker.php', data).success(function(response) {
            $scope.broker.brokerID = response.brokerID;
            $scope.broker.roleID = 1;
            $scope.broker.tenantID = 0;
            $scope.broker.masterTenantID = 0;

            if (data.createLinkedTenant) {
                if (data.createMasterTenant == 'yes') {
                    //console.log('data to create Mt ', data);
                    data.maxTenants = 0;
                    data.defaultCatalog = 1;
                    data.accountName = data.masterTenantName;
                    $http.post('api/createNewMasterTenant.php', data).success(function(mtResponse) {
                        $scope.newMasterTenant = mtResponse;
                        console.log('new master tenant ', mtResponse);
                        $scope.broker.masterTenantID = mtResponse.id;
                        var linkedTenant = {};
                        linkedTenant.accountName = data.linkedTenantName;
                        linkedTenant.masterTenantID = mtResponse.id;
                        linkedTenant.brokerID = $scope.broker.brokerID;
                        $http.post('api/createNewLinkedTenant.php', linkedTenant).success(function(ltResponse) {
                            $scope.newLinkedTenant = ltResponse;
                            console.log('new linked tenant to create catalog for', ltResponse);
                            $http.post('api/createNewLinkedTenantCatalog.php', ltResponse).success(function(catalogResponse) {
                                console.log('linked tenant catalog', catalogResponse);
                                $scope.broker.tenantID = ltResponse.id;
                                $http.post('api/addUser.php', $scope.broker).success(function(userResponse) {
                                    console.log(userResponse);
                                    $scope.user = userResponse;
                                    $scope.showBrokerForm = false;
                                }) 

                            })
                             
                        })

                    })
                } else {
                    console.log('create linked tenant and link to broker', data);
                    var linkedTenant = {};
                    linkedTenant.accountName = data.linkedTenantName;
                    linkedTenant.masterTenantID = 0;
                    linkedTenant.brokerID = data.brokerID;
                    $http.post('api/createNewLinkedTenant.php', linkedTenant).success(function(ltResponse) {
                        console.log('new lt w/ broker', ltResponse)
                        $scope.broker.tenantID = ltResponse.id;
                        $http.post('api/addUser.php', $scope.broker).success(function(userResponse) {
                                console.log(userResponse);
                                $scope.user = userResponse;
                                $scope.showBrokerForm = false;
                            })
                    })
                }
            }  

                          
        })
        console.log('master', $scope.newMasterTenant);
        console.log('linked', $scope.newLinkedTenant);

                  

    };
}]);