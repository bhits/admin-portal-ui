'use strict';

xdescribe('app:patient ', function () {

    // Define global references for injections.
    var ctrl;

    beforeEach(module('app.patient'));
    beforeEach(module('app.core'));


    beforeEach(inject(function ($controller) {
        ctrl = $controller('PatientCreateEditController');
    }));

    xdescribe('PatientCreateEditController', function () {
        it('should have been defined', function () {
            expect(ctrl).toBeDefined();
        });
    });
});