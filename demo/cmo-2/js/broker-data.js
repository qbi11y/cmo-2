var app = angular.module('Data', []);

app.factory('ListViews', function () {
    var view = 'master';

    return {
        getView: function() {
            return view
        },
        setView: function(newView) {
            view = newView;
        }
    }
})

app.factory('Catalog', ['$http', function($http) {
    var catalog;
    var defaultCatalog = [];
    var linkedTenantCatalog = [];
    var serviceProviders = [];

    return {
        setServiceProviders: function(data) {
            if (!data) {
                $http.get('../api/getServiceProviders.php').success(function(response) {        
                    serviceProviders = response;
                    return defaultCatalog
                });
            } else {
                serviceProviders.push(data);
            }
        },
        getServiceProviders: function() {
            if (serviceProviders.length == 0) {
                $http.get('../api/getServiceProviders.php').success(function(response) {        
                    serviceProviders = response;
                    console.log('defualt', defaultCatalog);
                    return serviceProviders
                });
            } else {
                return serviceProviders;
            }
        },
        getCatalog: function() {
            return catalog
        },
        setCatalog: function(data) {
            catalog = data
        },
        getDefaultCatalog: function() {
            if (defaultCatalog.length == 0) {
                console.log('default catalog empty');
                $http.get('../api/getDefaultCatalog.php').success(function(response) {        
                    defaultCatalog = response;
                    console.log('defualt', defaultCatalog);
                    return defaultCatalog
                });
            } else {
                return defaultCatalog;
            }
        },
        setDefaultCatalog: function(data) {            
            if (!data) {
                console.log('no data attribute');
                $http.get('../api/getDefaultCatalog.php').success(function(response) {        
                    defaultCatalog = response;
                    return defaultCatalog
                });
            } else {
                defaultCatalog = data;
            }
        },
        getLinkedTenantCatalog: function() {
            return linkedTenantCatalog
        },
        setLinkedTenantCatalog: function(data) {
            linkedTenantCatalog = data;
        }
    }
}]);

app.factory('TenantDetails', function() {
    var masterTenantDetails = {};
    var linkedTenantDetails = {};

    return {
        getMasterTenantDetails: function() {
            console.log('show details');
            return masterTenantDetails
        },
        setMasterTenantDetails: function(data) {
            masterTenantDetails = data
        },
        getLinkedTenantDetails: function() {
            return linkedTenantDetails
        },
        setLinkedTenantDetails: function(data) {
            linkedTenantDetails = data
        }
    }
});

app.factory('MasterTenantList', function() {
    var masterTenantList = [];
    return {
        getMasterTenantList: function() {
            return masterTenantList
        },
        setMasterTenantList: function(data) {
            masterTenantList = data
        }
    }
});

app.factory('NewMasterTenant', ['$firebase', function($firebase) {
    var newMasterTenant = {};   

    return {
        getNewMasterTenant:  function() {
            return newMasterTenant
        },
        setNewMasterTenant: function(data) {
            newMasterTenant = data;
        },
        createNewMasterTenant: function(data) {            
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

app.factory('NewServiceData', function() {
    var newServiceData = {};

    return {
        getNewServiceData: function() {
            return newServiceData
        },
        setNewServiceData: function(data) {
            newServiceData = data
        }
    }
})

app.factory('Orders', function() {
    var service = {};
    var order = {};
    var orders = [{
        orderInfo: {
            id: 'xxx-xx-xxxx-xxx',
            name: 'My Order',
            status: 'Submitted',
            customerName: 'ACME',
            submittedDate: 1425355146601,
            submittedBy: 'M. Garcia',
            startDate: '2015-03-8',
            endDate: 'never',
            cost: 45.90,
            lastActivity: 'Wed Jan 1',
            affiliate: 'ACME',
            type: 'VDC',
            provider: 'Amazon'
        },
        services: 
        {
                vdc: {
                    name: 'My VDC',
                    progress: 60,
                    cost: 50,
                    provider: 'Amazon',
                    taskDescription: 'Some task description',
                    taskType: 'Add Service',
                    updatedDate: 'Some Date',
                    serviceDescription: 'Some service description',
                    lineItems: [
                    {
                        icon: 'some icon',
                        quantity: '744',
                        unit: 'VM Hours',
                        unitPrice: 40,
                        mrc: 0,
                        estimatedUsageCharge: 50,
                        pricingRules: 'rule',
                        lineItem: 'Some Line Item Info',
                        resource: 'some resource'
                    }]
                },
                automated: 
                [
                    {
                        name: 'Dev DB Group (10 VMs)',
                        progress: 10,
                        cost: 50,
                        provider: 'Amazon',
                        taskDescription: 'Some task description',
                        taskType: 'Add Service',
                        updatedDate: 'Some Date',
                        serviceDescription: 'Some service description',
                        lineItems: [
                        {
                            icon: 'some icon',
                            quantity: '744',
                            unit: 'VM Hours',
                            unitPrice: 40,
                            mrc: 0,
                            estimatedUsageCharge: 50,
                            pricingRules: 'rule',
                            lineItem: 'Some Line Item Info',
                            resource: 'some resource'
                        }]
                    },
                    {
                        name: 'Dev App Group (25 VMs)',
                        progress: 100,
                        cost: 50,
                        provider: 'Amazon',
                        taskDescription: 'Some task description',
                        taskType: 'Add Service',
                        updatedDate: 'Some Date',
                        serviceDescription: 'Some service description',
                        lineItems: [
                        {
                            icon: 'some icon',
                            quantity: '744',
                            unit: 'VM Hours',
                            unitPrice: 40,
                            mrc: 0,
                            estimatedUsageCharge: 50,
                            pricingRules: 'rule',
                            lineItem: 'Some Line Item Info',
                            resource: 'some resource'
                        }],
                        attributes: 
                        {
                            cloudService: 'CM-GRAV-SRV-BPSP-Sharepoint Online',
                            cloudServiceName: 'SP One',
                            storage: 1,
                            uom: 'GB',
                            serviceStartDate: 'some date',
                            serviceEndDate: 'some date',
                        }  
                    }
                ],
                external:
                [
                    {
                        name: 'My New Hadoop Cluster',
                        progress: 30,
                        cost: 50,
                        provider: 'Amazon',
                        taskDescription: 'Some task description',
                        taskType: 'Add Service',
                        updatedDate: 'Some Date',
                        serviceDescription: 'Some service description',
                        lineItems: [
                        {
                            icon: 'some icon',
                            quantity: '744',
                            unit: 'VM Hours',
                            unitPrice: 40,
                            mrc: 0,
                            estimatedUsageCharge: 50,
                            pricingRules: 'rule',
                            lineItem: 'Some Line Item Info',
                            resource: 'some resource'
                        }],
                        attributes: 
                        {
                            cloudService: 'CM-GRAV-SRV-BPSP-Sharepoint Online',
                            cloudServiceName: 'SP One',
                            storage: 1,
                            uom: 'GB',
                            serviceStartDate: 'some date',
                            serviceEndDate: 'some date',
                        }
                    }
                ],
                manual: 
                [
                    {
                        name: 'ACME Backup Service',
                        progress: 25,
                        cost: 100,
                        provider: 'Amazon',
                        taskDescription: 'Some task description',
                        taskType: 'Add Service',
                        updatedDate: 'Some Date',
                        serviceDescription: 'Some service description',
                        lineItems: [
                        {
                            icon: 'some icon',
                            quantity: '744',
                            unit: 'VM Hours',
                            unitPrice: 40,
                            mrc: 0,
                            estimatedUsageCharge: 50,
                            pricingRules: 'rule',
                            lineItem: 'Some Line Item Info',
                            resource: 'some resource'
                        }],
                        attributes: 
                        {
                            cloudService: 'CM-GRAV-SRV-BPSP-Sharepoint Online',
                            cloudServiceName: 'SP One',
                            storage: 1,
                            uom: 'GB',
                            serviceStartDate: 'some date',
                            serviceEndDate: 'some date',
                        }
                    }
                ]
            }
    },
    {
        orderInfo: {
            id: 'xxx-xx-xxxx-xxx',
            name: 'My Order',
            status: 'Submitted',
            customerName: 'ACME',
            submittedDate: 1425045146601,
            submittedBy: 'M. Garcia',
            startDate: '2015-04-01',
            endDate: 'never',
            cost: 45.90,
            lastActivity: '1288323623006',
            affiliate: 'ACME',
            type: 'VDC',
            provider: 'Amazon'
        },
        services:[
            {automated: []}]
    },
    {
        orderInfo: {
            id: 'xxx-xx-xxxx-xxx',
            name: 'My Order',
            status: 'Submitted',
            customerName: 'ACME',
            submittedDate: 1425655437626,
            submittedBy: 'M. Garcia',
            startDate: '2015-03-06',
            endDate: 'never',
            cost: 45.90,
            lastActivity: 'Wed Jan 1',
            affiliate: 'ACME',
            type: 'VDC',
            provider: 'Amazon'
        },
        services:[
            {automated: []}]
    }]

    return {
        getOrders: function() {
            return orders
        },
        setOrder: function(data) {
            order = data
        },
        getOrder: function() {
            return order
        },
        setService: function(data) {
            service = data;
        },
        getService: function() {
            return service
        }
    }
})