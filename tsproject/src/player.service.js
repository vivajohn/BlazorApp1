"use strict";
exports.__esModule = true;
exports.PlayerService = void 0;
var audio_recorder_polyfill_1 = require("audio-recorder-polyfill");
var DotNetSubject_1 = require("./DotNetSubject");
var PlayerService = /** @class */ (function () {
    function PlayerService() {
        this.maxRecordTime = 20000;
        this.mediaRecorder = null;
        this.isLoading = false;
        this.isPlaying = false;
        this.isRecording = false;
        this.audioElement = new Audio();
        this.canRecord = true;
        window.MediaRecorder = audio_recorder_polyfill_1["default"];
    }
    Object.defineProperty(PlayerService.prototype, "isBusy", {
        get: function () {
            return this.isPlaying || this.isRecording || this.isLoading;
        },
        enumerable: false,
        configurable: true
    });
    PlayerService.prototype.playUrl = function (s, url) {
        var _this = this;
        var subject = new DotNetSubject_1.DotNetSubject(s);
        this.isLoading = true;
        this.audioElement = new Audio(url);
        this.audioElement.onloadeddata = function () {
            _this.isLoading = false;
            _this.isPlaying = true;
        };
        this.audioElement.onended = function () {
            console.log("play end", url);
            _this.isPlaying = false;
            subject.next();
            subject.complete();
            _this.audioElement = undefined;
        };
        this.audioElement.onerror = function (err) {
            _this.isLoading = false;
            console.error("Error playing: " + url);
            subject.error("Error playing: " + url);
            _this.isPlaying = false;
            _this.audioElement = undefined;
        };
        console.log("play", url.length);
        this.audioElement.play();
        return subject;
    };
    PlayerService.prototype.stopPlaying = function () {
        // There is no 'stop' method in the Audio object, so we have to do it this way
        try {
            if (this.audioElement) {
                this.audioElement.pause();
                this.audioElement.currentTime = 0;
                this.isPlaying = false;
                this.audioElement = undefined;
            }
        }
        catch (err) {
            console.error("stopPlaying", err);
        }
    };
    // : Subject<{ blob: Blob; url: string }>
    PlayerService.prototype.record = function (s) {
        var _this = this;
        console.log("Player.recording");
        var subject = new DotNetSubject_1.DotNetSubject(s);
        this.isLoading = true;
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
            var options = { audioBitsPerSecond: 64000, mimeType: 'audio/webm' };
            var recordedChunks = [];
            _this.mediaRecorder = new window.MediaRecorder(stream, options);
            _this.mediaRecorder.addEventListener('start', function (e) {
                _this.isRecording = true;
                _this.isLoading = false;
                _this.timer = setTimeout(function () { return _this.stopRecording(); }, _this.maxRecordTime);
            });
            _this.mediaRecorder.addEventListener('dataavailable', function (e) {
                // console.log("ondataavailable", e.data);
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            });
            _this.mediaRecorder.addEventListener('stop', function (e) {
                // This gets called when the stopRecording() method gets called which is
                // called when the user clicks on the stop icon.
                // console.log("onstop", this.isLoading);
                _this.isLoading = true;
                stream.getTracks().forEach(function (t) {
                    //console.log("track", t);
                    t.stop();
                });
                var blob = new Blob(recordedChunks, { type: recordedChunks[0].type });
                //const reader = new FileReader();
                //reader.readAsDataURL(blob);
                //reader.onloadend = function () {
                //  debugger;
                //  const obj = { blob: reader.result };
                //  subject.test(reader.result);
                //};
                blob.arrayBuffer().then(function (buffer) {
                    var url = URL.createObjectURL(blob);
                    console.log("newUrl", url);
                    //const dbug = new Uint8Array(buffer);
                    var blob64 = btoa(String.fromCharCode.apply(String, new Uint8Array(buffer)));
                    //subject.test({ blob: dbug });
                    debugger;
                    subject.next({ url: url, type: blob.type, blob64: blob64 });
                    subject.complete();
                    _this.isLoading = false;
                });
                //this.blobToBuffer(blob, (buffer: ArrayBuffer) => {
                //  const url = URL.createObjectURL(blob);
                //  console.log("newUrl", url);
                //  //const dbug = new Uint8Array(buffer);
                //  const dbug = btoa(String.fromCharCode(...new Uint8Array(buffer)));
                //  //subject.test({ blob: dbug });
                //  subject.next({ blob: dbug, url: url, type: blob.type });
                //  subject.complete();
                //  this.isLoading = false;
                //});
            });
            _this.mediaRecorder.start();
            _this.isRecording = true;
            _this.isLoading = false;
        }, function (err) {
            subject.error(err.toString());
        });
        return subject;
    };
    PlayerService.prototype.blobToBuffer = function (blob, onResult) {
        var fileReader = new FileReader();
        fileReader.onloadend = function () {
            onResult(fileReader.result);
        };
        fileReader.readAsArrayBuffer(blob);
    };
    PlayerService.prototype.stopRecording = function () {
        console.log("stopRecording");
        this.isRecording = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
        }
    };
    return PlayerService;
}());
exports.PlayerService = PlayerService;
