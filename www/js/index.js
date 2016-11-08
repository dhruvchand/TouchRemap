

var host = "http://52.34.9.15/api/v1/patients/";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var dhat = angular.module('dhat', []);

dhat.controller('customersCtrl', function($scope, $http) {
    var pendingTask;

    
function fetch(){
        
        $http({
    url: (host +$scope.id), 
    method: "GET",
    params: {USER:localStorage.username,PW:localStorage.password}
 }).then(function(response) {
        
    for(a in response.data.forms){
            form = response.data.forms[a];
            _form = {}
        for(key in form.formData){
            if(key[0]!="_"){
            _form[key.replace(/_/g," ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})] = form.formData[key]}
        }
        form.formData = _form
        }
        
        $scope.forms = response.data.forms;
                             $scope.patientData = response.data.patientInfo;
                              
                             });
    }
    
    
    
    $scope.change = function() {
      if (pendingTask) {
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };
    
if ($scope.id === undefined) {
      $scope.id = "Enter Patient ID";
      fetch();
    }
    
$scope.update = function(patient) {
      $scope.id = patient.id;
      $scope.change();
    };
    $scope.select = function() {
      this.setSelectionRange(0, this.value.length);
    }
    

});




dhat.controller('searchCtrl', function($scope, $http) {
    var pendingTask;
function fetch(){
        options = {}
        options.USER = localStorage.username
        options.PW = localStorage.password
       if(typeof($scope.birthyear)!="undefined") options.birthyear = $scope.birthyear;
       if(typeof($scope.name)!="undefined") options.name = $scope.name;
        if(typeof($scope.phone)!="undefined") options.phone = $scope.phone;
        $http({
    url: (host), 
    method: "GET",
    params: options
 }).then(function(response) {
                
        $scope.patients = response.data.patients;            
                            });
    }
    
    
    
$scope.change = function() {
      if (pendingTask) {
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };
    
$scope.update = function() {
      $scope.change();
};

    

});

