;(function (module) {
    // module.init = function (name) {
    //     console.log(name);
    // };
    // module.info = function () {
    //     console.log("test module");
    // }
    function Test() {
    }
    Test.prototype.getName = function (name) {
        console.log(name);
    }

    module.t = Test;
}(exports));