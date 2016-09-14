/**
 * Created by tomson.ngassa on 3/9/2016.
 */
(function () {

    'use strict';

    angular.module('app.core')
        .constant("constants",
            {
                SSN_REGEXP: /^(\d{3}-?\d{2}-?\d{4}|XXX-XX-XXXX)$/,
                ZIPCODE_REGEXP: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                EMAIL_REGEXP: /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
                PHONE_NUMBER_REGEXP: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                FIRSTNAMELASTNAME_REGEXP: /^[a-zA-ZÀ-ÿ]+[-]?[a-zA-ZÀ-ÿ]*[a-zA-ZÀ-ÿ]$/
            });
})();