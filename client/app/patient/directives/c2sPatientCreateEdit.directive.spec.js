'use strict';

xdescribe('app.patient:', function() {

    beforeEach(module('app.config'));
    beforeEach(module('app.core'));
    beforeEach(module('app.patient'));
    beforeEach(module('app/patient/directives/patientCreateEdit.html'));

    describe('c2sPatientCreateEdit directive', function() {
        var patientCreateTemplate;
        var rootScope;
        var scope;
        var element;
        var controller;
        var patientService;
        var notificationService;
        var $state;
        var patient1;
        var patient2;

        beforeEach(inject(function($templateCache, $compile,  _$rootScope_, _patientService_, _notificationService_, _$state_) {
            rootScope =  _$rootScope_;
            scope = rootScope.$new();
            patientService = _patientService_;
            notificationService = _notificationService_;
            $state = _$state_;
            patientCreateTemplate = $templateCache.get('app/patient/directives/patientCreate.html');
            element = angular.element("<c2s-patient-create-edit></c2s-patient-create-edit>");
            $compile(element)(scope);
            rootScope.$digest();
            controller = element.isolateScope().patientCreateVm;
            patient1 = {birthDate: "03/02/2016", email: "usr3@gmail.com", firstName: "usr1", genderCode: "M", lastName: "usr2", password: "Akacity77",password2: "Akacity77", username: "usr3"};
            patient2 = {birthDate: "03/02/2016", email: "usr3@gmail.com", firstName: "usr1", genderCode: "M", lastName: "usr2", password: "Akacity77", username: "usr3"};
        }));

        xit('should save patient', function() {
            scope.patient = patient1;
            spyOn(patientService, 'createPatient').and.callThrough();
            spyOn(controller, 'removeConfirmPassword').and.returnValue(patient2);

            controller.save();

            expect(patientService.createPatient).toHaveBeenCalled();
            expect(controller.removeConfirmPassword).toHaveBeenCalledWith(patient1);
        });

        xit('should disable create patient form submit button', function() {
            //dump(controller.form);
            console.log("Hello");
        });

        it('should enable create patient form  submit button', function() {

        });
    });
});