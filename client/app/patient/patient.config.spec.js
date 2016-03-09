'use strict';

describe('app.patient: ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.patient");
    });

    it("should be registered", function() {
        expect(module).not.toEqual(null);
    });

    describe("Dependencies:", function() {

        var dependencies;

        var hasModule = function(m) {
            return dependencies.indexOf(m) >= 0;
        };
        beforeEach(function() {
            dependencies = module.value('app.patient').requires;
        });

        it("should have app.core as a dependency", function() {
            expect(hasModule('app.core')).toEqual(true);
        });
    });
});


xdescribe('Patient Route', function () {
    // Define global references for injections
    var $state,
        $rootScope,
        state = 'fe.patient.create';

    beforeEach(module('ui.router'));

    // Inject and assign the $state and $rootScope services.
    // Put the template in template cache.
    beforeEach(inject(function (_$state_, $templateCache, _$rootScope_) {
        $state = _$state_;
        $rootScope = _$rootScope_;

        $templateCache.put('app/patient/controllers/patientCreate.html', '');
    }));

    // Test whether the url is correct
    it('should respond to URL', function() {
        expect($state.href(state)).toEqual('/patient/create');
    });

    // Test whether our state activates correctly
    it('should activate the state', function() {
        $state.go(state);
        $rootScope.$digest();
        expect($state.current.name).toBe(state);
    });
});