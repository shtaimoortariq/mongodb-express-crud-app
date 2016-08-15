(function () {
    angular.module("myApp", ['ngMaterial'])
    .controller("myController", ['$http', myController]);

    function myController($http) {
        var _self = this;

        this.submit = function () {
            console.log(_self.user);
            $http.post("/insert", _self.user);
        };

        this.getData = function () {
            $http.get("/get-data")
                .success(function (data) {
                    console.log(data);
                })

        }
    }
})();