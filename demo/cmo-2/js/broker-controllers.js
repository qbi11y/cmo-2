var ctrl = angular.module('BrokerControllers', ['Data']);

ctrl.controller('ServiceDetailsController', ['$scope', '$http', '$routeParams', 'Orders', function($scope, $http, $routeParams, Orders) {
    console.log(Orders.getService());
    $scope.service = Orders.getService();
}]);

ctrl.controller('OrderController', ['$scope', '$http', '$routeParams','Orders',  function($scope, $http, $routeParams, Orders) {
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.orderID = 1;
    $scope.orders = Orders.getOrders();
    $scope.hoveredOrder = {};
    $scope.date = new Date();
    $scope.servicesDue = [];
    
    $scope.currentDate = $scope.date.getTime();
    $scope.endDateRange = 0;

    $scope.getOrdersDue = function(startDate) {
        $scope.servicesDue = [];
        for (var n=0; n < $scope.orders.length; n++) {
            var date = new Date($scope.orders[n].orderInfo.startDate);
            if (!startDate) {
                //initialize
                if (date.getTime() - $scope.currentDate  < 86400000){
                    $scope.servicesDue.push($scope.orders[n]);
                }  
            } else {
                //calculate date
                if (date.getTime() - $scope.currentDate  < startDate * 86400000){
                    $scope.servicesDue.push($scope.orders[n]);
                }                
            }
        }
    }

    $scope.getOrdersDue();
    $scope.showOrderDetails = function(data) {
        Orders.setOrder(data);
    }
     $scope.showActions = function(data) {
        $scope.hoveredOrder = data;
    }

    $scope.isHovered = function(data) {
        return $scope.hoveredOrder == data;
    }

    $scope.updateDateRange = function(days) {
        $scope.endDateRange = $scope.currentDate + (days * 86400000);
        $scope.getOrdersDue(days);
    }
}]);

ctrl.controller('OrderDetailsController', ['$scope', '$http', '$routeParams','Orders', function($scope, $http, $routeParams, Orders) {
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.orderID = $routeParams.orderID;
    $scope.showCM = true;
    $scope.showExternal = true;
    $scope.showManual = true;
    $scope.serviceID = 1;
    $scope.order = Orders.getOrder();
    console.log('order to show', Orders.getOrder());
    $scope.showServiceDetails = function(service) {
        console.log('service to show', service);
        Orders.setService(service);
    }
    $scope.showDetails = function(view) {
        switch (view) {
            case 'cm':
                $scope.showCM = true;
                break;

            case 'external':
                $scope.showExternal = true;
                break;

            case 'manual':
                $scope.showManual = true;
                break;
        }
    }

    $scope.hideDetails = function(view) {
        switch (view) {
            case 'cm':
                $scope.showCM = false;
                break;

            case 'external':
                $scope.showExternal = false;
                break;

            case 'manual':
                $scope.showManual = false;
                break;
        }
    }
}])

/*
any controllers for the main.html broker portal go here
*/
ctrl.controller('BrokerController', ['$scope', '$http','$routeParams', 'ListViews', 'Catalog', function($scope, $http, $routeParams, ListViews, Catalog) {
    Catalog.setDefaultCatalog();
    Catalog.setServiceProviders();

    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.masterTenants = [];
    $scope.linkedTenants = [];
    $scope.defaultCatalog = Catalog.getDefaultCatalog();
    $scope.totalServices = 0;


    

    $scope.setListView = function(view) {
        ListViews.setView(view);
    }

    console.log('current broker', $scope.currentBrokerID);
    $http.get('../api/getMasterTenants.php?brokerID='+$scope.currentBrokerID).success(function(response) {
        console.log($scope.currentBrokerID);
        console.log(response);
        $scope.masterTenants = response;
    });

    $http.get('../api/getLinkedTenants.php?brokerID='+$scope.currentBrokerID).success(function(response) {
        $scope.linkedTenants = response;
    })

}]);

ctrl.controller('AdministrationController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.userForm = {};
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.userRoles = [];
    $scope.allUsers = [];
    $scope.addedUser = {};
    
    if ($scope.allUsers.length == 0) {
        $http.get('../api/getUsers.php').success(function(response) {
                console.log('response data', response);
                $scope.allUsers = response.users;
                $scope.roles = response.roles;
            });
    }

    $scope.addUser = function(data) {
        data.tenantID = 0;
        data.masterTenantID = 0
        $http.post('../api/addUser.php', data).success(function(response) {
            console.log('added users', response);
            $scope.addedUser = response;
            $scope.userForm = {};
            $scope.userForm.roleID = 0;
        });
    };

    $http.get('../api/getUserRoles.php').success(function(data) {
        $scope.userRoles = data;
    });
}]); 

/*
Controller for the master tenant list page
Fetches the list of master tenants to display
*/
ctrl.controller('TenantListController', ['$scope', '$http','$routeParams', 'MasterTenantList','TenantDetails','ListViews', function($scope, $http, $routeParams, MasterTenantList, TenantDetails, ListViews) {
    $scope.masterTenantList = [];
    $scope.linkedTenantList = [];
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.tenantView = ListViews.getView();
    $scope.hover = false;
    $scope.deleteItem = {};
    
    //sends request for the master tenant list
    console.log('get the master tenant list');
    $http.get('../api/getMasterTenants.php?brokerID='+$scope.currentBrokerID).success(function(data) {
        MasterTenantList.setMasterTenantList(data);  //set the master tenant list data object
        $scope.masterTenantList = MasterTenantList.getMasterTenantList(); //set the master tenant list equal to the data object
    }); 

    $http.get('../api/getLinkedTenants.php?brokerID='+$scope.currentBrokerID).success(function(response) {
        $scope.linkedTenantList = response;
    })

    $scope.delete = function(item) {
        $http.post('../api/deleteMasterTenant.php?masterTenantID='+item.id).success(function(response) {
            console.log('delete', $scope.masterTenantList);
            for (var i=0; i<$scope.masterTenantList.length; i++) {
                if ($scope.masterTenantList[i].id == item.id ) {
                    $scope.masterTenantList.splice(i, 1);
                }
            }

        })
    }  

    $scope.showTenantDetails = function(tenant, type) {
        $http.get('../api/getLinkedTenantCatalog.php?id='+tenant.linkedTenantID).success(function(catalogResponse) {
            console.log('linked tenant catalog', catalogResponse);
            tenant.catalog = catalogResponse;

            switch(type) {
                case 'linked':
                    TenantDetails.setLinkedTenantDetails(tenant);
                    break;

                case 'master':
                    TenantDetails.setMasterTenantDetails(tenant);
                    break;
            }
        });
        
    }

    $scope.setDeleteItem = function(item) {
        $scope.deleteItem = item;
    }

    $scope.changeTenantView = function(view) {
        $scope.tenantView = view;
    } 

    $scope.isHovered = function(data) {
        return $scope.hover === data;
    }

    $scope.setHover = function(data, action) {
        if (action == 'enter') {
            $scope.hover = data;
        } else {
            $scope.hover = {};
        }
        
    }
}]);

/*
Controller for the master tenant details page
Fetches all of the data for the specified master tenant
*/
ctrl.controller('MasterTenantDetailsController',['$scope', '$http', '$routeParams','MasterTenantDetails', function($scope, $http, $routeParams, MasterTenantDetails) {
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.masterTenantDetails = MasterTenantDetails.getMasterTenantDetails();  //initate the masterTenantDetails variable
    $scope.getMasterTenantDetails = function(id) {
        $http.get('../api/getMasterTenantInfo.php?masterTenantID='+id).success(function(data) {
            MasterTenantDetails.setMasterTenantDetails(data); //set masterTenantDetails with the data returned from the database query
            $scope.masterTenantDetails = MasterTenantDetails.getMasterTenantDetails(); //update masterTenant Details with the new MasterTenant Details
        }).error(function(data) {
            console.log('error');
        });
    };

    $scope.getMasterTenantDetails($routeParams.masterTenantID);
}]);


/*
Controller for the default catalog
Fetches all of the data for the default catalog to be displayed
*/
ctrl.controller('CatalogController', ['$scope', '$http', '$routeParams', 'Catalog', function($scope, $http, $routeParams, Catalog) {
    window.scrollTo(0,0);
    if (!Catalog.getDefaultCatalog()) {
        console.log('getting catalog on initial page load');
        $http.get('../api/getDefaultCatalog.php').success(function(response) {        
            Catalog.setDefaultCatalog(response);
            $scope.defaultCatalog = Catalog.getDefaultCatalog();
        });
    }
    console.log('loading...', Catalog.getDefaultCatalog());
    $scope.defaultCatalog = Catalog.getDefaultCatalog();
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    //console.log(Catalog.getDefaultCatalog());
}]);

ctrl.controller('CreateMasterTenantController', ['$scope', '$http','$routeParams', 'NewMasterTenant', function($scope, $http, $routeParams, NewMasterTenant) {
    //$scope.newMasterTenantID = 0;
    $scope.masterTenantForm = {};
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.createMasterTenant = function() {
        $http.post('../api/createNewMasterTenant.php', NewMasterTenant.getNewMasterTenant())

        .success(function (data) {
            console.log('new master tenant ', data);
        });
    };

    $scope.newMasterTenantInfo = NewMasterTenant.getNewMasterTenant();
    $scope.setNewMasterTenant = function() {
        NewMasterTenant.setNewMasterTenant($scope.masterTenantForm);
        //console.log(NewMasterTenant.getNewMasterTenant());
    }    
}]);


/*
Controller to handle the adding of new services to the catalog
*/
ctrl.controller('AddServiceController', ['$scope', '$http', '$routeParams', '$location', 'NewServiceData','Catalog', function($scope, $http, $routeParams, $location, NewServiceData, Catalog) {
    if (!Catalog.getServiceProviders()) {
        $http.get('../api/getServiceProviders.php').success(function(response) {        
            Catalog.setServiceProviders(response);
            $scope.serviceProviders = Catalog.getServiceProviders();
        });
    }
    $scope.currentInputStep = 'pricing';
    $scope.showQuestions = false;
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.serviceProviders = Catalog.getServiceProviders();
    $scope.addServiceForm = {};
    $scope.newServiceData = NewServiceData.getNewServiceData();
    $scope.defineService = {};
    $scope.attribute = {};
    $scope.customAttributes = [];
    $scope.catalog = Catalog.getDefaultCatalog();
    $scope.comboOptions = [];
    $scope.pricingOptions = [];
    console.log('current catalog', Catalog.getDefaultCatalog());

    //ensures that the appropriate fields have been filled out before user can move forward
    $scope.enableContinue = function() {
        if ($scope.addServiceForm.providerID && /*$scope.addServiceForm.locations &&*/ $scope.addServiceForm.solutionCenter && $scope.addServiceForm.marketplace && /*$scope.addServiceForm.dependency &&*/ $scope.addServiceForm.type != 'select') {
            return true
        }
    }

    $scope.deleteCombo = function(data) {
        console.log('current options array ', $scope.pricingOptions);

        for (var n=0; n < $scope.pricingOptions.length; n++) {
           if ($scope.pricingOptions[n].options[0] == data.options[0]) {
            console.log('to delete ', data, n);
            $scope.pricingOptions.splice(n, 1);
           }
        }
    }

    //
    $scope.addPriceCombo = function(data) {
        var price = data.price;
        var options = [];
        var combo = {};

        for ( n in data.options) {
            var option = {};
            option[n] = data.options[n];
            options.push(option);
        }

        combo.price = price;
        combo.options = options;

        $scope.pricingOptions.push(combo);
        $scope.addServiceForm.attribute.pricingCombo = $scope.pricingOptions; 
    }

    $scope.addComboOptions = function(data) {
        var options = data.options.split(',');
        var label = data.optionTitle;
        var option = {};
        option.label = label;
        option.options = options;
        $scope.comboOptions.push(option);
        $scope.addServiceForm.attribute.comboPricing.optionTitle = '';
        $scope.addServiceForm.attribute.comboPricing.options = '';


        console.log(options);
    }

    //when creating custom form fields this creates the object and pushes it onto the array that holds all of the attributes
    $scope.createAttribute = function(data) {        
        var customAttribute = {};
        for (var n in data) {
            customAttribute[n] = data[n];
        }
        
        if (data.inputType == 'select') {
            customAttribute.selectOptions = data.selectOptions.split(",");
        }
        $scope.customAttributes.push(customAttribute);
        $scope.addServiceForm.customAttributes = $scope.customAttributes;
        $scope.addServiceForm.attribute = {};        
    }

    //determines when to hide and show the initial questionaire
    $scope.hideQuestions = function() {
        $scope.showQuestions = false;
        if ($scope.addServiceForm.marketplace == 'yes') {
            console.log('marketplace checked');
            $scope.addServiceForm.enableMarketplace = true;
        }

        if ($scope.addServiceForm.solutionCenter == 'yes') {
            $scope.addServiceForm.enableSolutionCenter = true;
        }
        $scope.currentInputStep = 'information';
    }

    //keep track of where the user is in the process of adding a service
    $scope.updateStep = function(step) {
        if (step == 'dependency' && $scope.defineService.dependency == 'no') {
            $scope.currentInputStep = 'summary';
        } else {
            $scope.currentInputStep = step;
        }        
    }

    //sends the data to the api to create the new service
    $scope.createNewDefaultCatalogService = function(data) {
        console.log('new service data', data);

        if (data.addProvider) {            
            $http.post('../api/createNewDefaultCatalogProvider.php', data.addProvider).success(function (providerResponse) {
                console.log('new provider', providerResponse);
                //$scope.updateCatalog('provider', providerResponse);
                Catalog.setServiceProviders(providerResponse);
                data.providerID = providerResponse.providerID;
                $http.post('../api/createNewDefaultCatalogService.php', data).success(function (serviceResponse) {
                    console.log('new service', serviceResponse);
                    Catalog.setDefaultCatalog(serviceResponse);
                    //$scope.updateCatalog('service', serviceResponse);
                    if ( data.customAttributes ) {
                        console.log('form data', data.customAttributes);
                        var attributes = {};
                        attributes.serviceID = serviceResponse.serviceID;
                        attributes.attributes = data.customAttributes;
                        attributes.brokerID = $scope.currentBrokerID;
                        attributes.masterTenantID = 0;
                        $http.post('../api/createCustomAttribute.php', attributes).success(function(attrResponse) {
                            console.log('forms ', attrResponse);
                        });
                    }
                    $location.path('/'+$scope.currentBrokerID+'/'+$scope.currentUserID+'/catalog');
                });
            });

        } else {
            $http.post('../api/createNewDefaultCatalogService.php', data).success(function (serviceResponse) {
                
                //$scope.updateCatalog('service', serviceResponse);
                Catalog.setDefaultCatalog(serviceResponse);
                //$scope.catalog = Catalog.getDefaultCatalog();
                if ( data.customAttributes ) {
                    var attributes = {};
                    console.log('added service', serviceResponse);
                    attributes.serviceID = serviceResponse[0].serviceID;
                    attributes.attributes = data.customAttributes;                    
                    attributes.brokerID = $scope.currentBrokerID;
                    attributes.masterTenantID = 0;
                    console.log('forms ', attributes);
                    $http.post('../api/createCustomAttribute.php', attributes).success(function(attrResponse) {
                        console.log('forms ', attrResponse);
                    });
                }

                $location.path('/'+$scope.currentBrokerID+'/'+$scope.currentUserID+'/catalog');
            })
        }
    };



    $scope.updateCatalog = function(type, data) {
        console.log('current data ',type, data);
        switch(type) {
            case 'provider':
                console.log('psuh provider', data);
                $scope.catalog = Catalog.getCatalog();
                $scope.catalog.providers.push(data);
                Catalog.setCatalog($scope.catalog);
                break;

            case 'service':
                $scope.catalog = Catalog.getCatalog();
                $scope.catalog.services.push(data);
                Catalog.setCatalog($scope.catalog);
                break;
        }   
        console.log('after update', Catalog.getCatalog());
    };


    $scope.setNewServiceData = function(data) {
        NewServiceData.setNewServiceData(data);
        $scope.newServiceData = NewServiceData.getNewServiceData();
    };

    $scope.getProviders = function() {
       $http.get('../api/getDefaultCatalog.php').success(function(data) {
            //console.log('adding', data);
            $scope.providers = data.providers;
       });        
    }
    $scope.getProviders();
}]);

ctrl.controller('LinkedTenantDetailsController', ['$scope', '$http','$routeParams', 'TenantDetails', 'Catalog', function($scope, $http, $routeParams, TenantDetails, Catalog) {
    $scope.currentBrokerID = $routeParams.brokerID;
    $scope.currentUserID = $routeParams.userID;
    $scope.currentLinkedTenantID = $routeParams.linkedTenantID;
    $scope.currentLinkedTenant = TenantDetails.getLinkedTenantDetails();
    $scope.updatedLinkedTenantCatalog = [];
    $scope.linkedTenantCatalog = [];
    $scope.defaultCatalog = [];

    $scope.updateCatalog = function(item, action) {        
        switch(action) {
            case true:
                item.defaultServiceID = item.serviceID;
                item.linkedTenantID = $scope.currentLinkedTenantID;
                item.serviceIcon = "";
                item.servicePoints = 0;
                $scope.updatedLinkedTenantCatalog.push(item);
                console.log('item', item);
                break;

            default:
                console.log('updated', $scope.updatedLinkedTenantCatalog);
                console.log('should be deleting', item);
                for (var n=0; n < $scope.updatedLinkedTenantCatalog.length; n++) {
                    if ($scope.updatedLinkedTenantCatalog[n].defaultServiceID == item.serviceID) {
                        $scope.updatedLinkedTenantCatalog.splice(n, 1);
                    }
                }
                break;
        }
        console.log('updated catalog', $scope.updatedLinkedTenantCatalog);
    }

    $scope.saveCatalog = function(catalog) {
        

        var updatedCatalog = {};
        updatedCatalog.linkedTenantID = $scope.currentLinkedTenantID;
        updatedCatalog.services = $scope.updatedLinkedTenantCatalog;
        console.log('send to server', updatedCatalog);
        
        $http.post('../api/updateLinkedTenantCatalog.php', updatedCatalog).success(function(response) {
            console.log('new catalog', response);
        })
        
    }

    $scope.compareCatalogs = function(def, linked) {
        //console.log('linked', linked);
        //console.log('default', def);
        for (var n=0; n < def.length; n++) {
            for (var i=0; i < linked.length; i++) {
                if ( linked[i].defaultServiceID == def[n].serviceID) {
                    //console.log('checked');
                    $scope.defaultCatalog[n].visible = true;
                    break;
                } else {
                    //console.log('unchecked');
                    $scope.defaultCatalog[n].visible = false;
                }
            }
        }
        //console.log('updated catalog from service', $scope.updatedLinkedTenantCatalog);
    }

    $http.get('../api/getDefaultCatalog.php').success(function(response) {        Catalog.setDefaultCatalog(response);
        $scope.defaultCatalog = Catalog.getDefaultCatalog();

        $http.get('../api/getLinkedTenantCatalog.php?id='+$scope.currentLinkedTenantID).success(function(ltResponse) {
            
            Catalog.setLinkedTenantCatalog(ltResponse);
            $scope.linkedTenantCatalog = Catalog.getLinkedTenantCatalog();
            //console.log('tenant catalog from service', $scope.linkedTenantCatalog);

            for (var x=0; x < ltResponse.length; x++) {
                $scope.updatedLinkedTenantCatalog.push(ltResponse[x]);
            }
            
            $scope.compareCatalogs($scope.defaultCatalog, $scope.linkedTenantCatalog);
            //console.log('tdefault catalog', $scope.defaultCatalog);
        })
    })

    



/*
    $scope.defaultCatalog = Catalog.getCatalog();
    console.log('default', $scope.defaultCatalog);

    $scope.filterDefaultCatalog = function(linkedTenantCatalog) {
        for (var n=0; n < linkedTenantCatalog.length; n++) {
            for (var i=0; i < $scope.defaultCatalog.length; i++) {

            }
        }
    }



    $scope.saveCatalog = function(catalog) {
        var updatedCatalog = {};
        updatedCatalog.linkedTenantID = $scope.currentLinkedTenantID;
        updatedCatalog.services = catalog;
        $http.post('../api/updateLinkedTenantCatalog.php', updatedCatalog).success(function(response) {
            console.log('new catalog', response);
        })
        
    }

    

    $http.get('../api/getLinkedTenantCatalog.php?id='+$scope.currentLinkedTenantID).success(function(serviceResponse) {
        console.log('catalog', serviceResponse);
        $http.get('../api/getDefaultCatalogProviders.php').success( function(providerResponse) {
            console.log('providers', providerResponse);
            $scope.mergeProviderAndCatalog(serviceResponse, providerResponse);
        });
    });


    $http.get('../api/getDefaultCatalog.php').success(function(response) {
        console.log('default', response);
        $scope.defaultCatalog = response
    })

    //take all of the services and apply the appropriate provider information
    $scope.mergeProviderAndCatalog = function(services, providers ) {
        for (var n=0; n < providers.length; n++) {
            for (var i=0; i < services.length; i++) {
                if (providers[n].providerID == services[i].providerID) {
                    services[i].providerName = providers[n].providerName;
                    services[i].providerIcon = providers[n].providerIcon;
                }
            }
        }

        for (var x=0; x < services.length; x++) {
            $scope.updatedLinkedTenantCatalog.push(services[x]);
        }
    
        $scope.currentLinkedTenant.catalog = services;
        $scope.filterDefaultCatalog($scope.currentLinkedTenant.catalog);
        //TenantDetails.setLinkedTenantDetails($scope.currentLinkedTenant);
        //$scope.updatedLinkedTenantCatalog = TenantDetails.getLinkedTenantDetails().catalog;
    }
    */
}])



















