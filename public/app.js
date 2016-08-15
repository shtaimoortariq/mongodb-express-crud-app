(function () {
    angular.module("myApp", ['ngMaterial'])
        .controller("myController", ['$http', myController]);

    function myController($http) {
        var _self = this;
        this.dataDb = [];

        this.submit = function () {
            console.log(_self.user);
            $http.post("/insert", _self.user).then(_self.getData())
        };

        this.getData = function () {
            $http.get("/getData")
                .success(function (data) {
                    _self.dataDb = data;
                })
        }
    }
})();