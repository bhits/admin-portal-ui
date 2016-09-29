'use strict';

describe('app.patient: ', function () {
    var module;

    beforeEach(function () {
        module = angular.module("app.patient");
    });

    it("should be registered", function () {
        expect(module).not.toEqual(null);
    });

    describe("dependencies:", function () {

        var dependencies;

        var hasModule = function (m) {
            return dependencies.indexOf(m) >= 0;
        };
        beforeEach(function () {
            dependencies = module.value('app.patient').requires;
        });

        it("should have app.core as a dependency", function () {
            expect(hasModule('app.core')).toEqual(true);
        });
    });
});


