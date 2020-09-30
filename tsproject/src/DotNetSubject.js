"use strict";
exports.__esModule = true;
exports.DotNetSubject = void 0;
// Wraps a Subject-like object received from the .NET code
var DotNetSubject = /** @class */ (function () {
    function DotNetSubject(subject) {
        this.subject = subject;
    }
    DotNetSubject.prototype.next = function (obj) {
        var json = !!obj ? JSON.stringify(obj) : null;
        this.subject.invokeMethodAsync('OnNext', json);
    };
    DotNetSubject.prototype.complete = function () {
        this.subject.invokeMethodAsync('OnCompleted');
    };
    DotNetSubject.prototype.error = function (message) {
        this.subject.invokeMethodAsync('OnCompleted', message);
    };
    DotNetSubject.prototype.test = function (data) {
        debugger;
        this.subject.invokeMethodAsync('Test', JSON.stringify(data));
    };
    return DotNetSubject;
}());
exports.DotNetSubject = DotNetSubject;
