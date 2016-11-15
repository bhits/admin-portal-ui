'use strict';

xdescribe('app.data:', function () {
    // Define global references for injections.
    var patientService;
    var $httpBackend;

    beforeEach(module('app.config'));
    beforeEach(module('app.core'));
    beforeEach(module('app.patient'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        patientService = $injector.get('patientService');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('patientService', function () {
        xit('should create patient ', function () {
            var patient = {
                birthDate: "03/02/2016",
                email: "usr3@gmail.com",
                firstName: "usr1",
                genderCode: "M",
                lastName: "usr2",
                password: "Akacity77",
                username: "usr3"
            };
            $httpBackend.expectPOST('https://localhost:8448/registration/users/signup').respond({status: 201});

            var status = patientService.createPatient(
                patient,
                function (data) {
                    status = data.status;
                },
                function (error) {
                });
            $httpBackend.flush();
            expect(status).toEqual(201);
        });
    });
});