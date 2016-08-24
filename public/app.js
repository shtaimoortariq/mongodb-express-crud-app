(function () {
    angular.module("myApp", ['ngMaterial'])
        .controller("myController", ['$http', myController]);

    function myController($http) {
        var _self = this;
        this.dataDb = [];

        this.submit = function () {
            $http.post("/insert", _self.user).then(_self.getData(), _self.user = "");
        };

        this.getData = function () {
            $http.get("/getData")
                .success(function (data) {
                    _self.dataDb = data;
                })
        };

        this.updateUser = function () {
            _self.updateUserData = Object.assign({id: _self.UpdateUser.id}, _self.user);
            $http.post("/updateData", _self.updateUserData).then(_self.getData(), _self.user = "", _self.UpdateUser = "");
        };

        this.deleteUser = function () {
            $http.post("/deleteData", _self.UpdateUser).then(_self.getData(), _self.UpdateUser = "");
        };
    }
})();