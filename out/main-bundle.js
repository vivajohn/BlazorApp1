/******/ (function (modules) {
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports;
            /******/ }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/ 
        };
        /******/
        /******/ // Execute the module function
        /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/ module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/ 
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/ __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/ __webpack_require__.d = function (exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/ }
        /******/ 
    };
    /******/
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = function (exports) {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/ }
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/ 
    };
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/ __webpack_require__.t = function (value, mode) {
        /******/ if (mode & 1)
            value = __webpack_require__(value);
        /******/ if (mode & 8)
            return value;
        /******/ if ((mode & 4) && typeof value === 'object' && value && value.__esModule)
            return value;
        /******/ var ns = Object.create(null);
        /******/ __webpack_require__.r(ns);
        /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        /******/ if (mode & 2 && typeof value != 'string')
            for (var key in value)
                __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
        /******/ return ns;
        /******/ 
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = function (module) {
        /******/ var getter = module && module.__esModule ?
            /******/ function getDefault() { return module['default']; } :
            /******/ function getModuleExports() { return module; };
        /******/ __webpack_require__.d(getter, 'a', getter);
        /******/ return getter;
        /******/ 
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/ __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ // __webpack_public_path__
    /******/ __webpack_require__.p = "";
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/ return __webpack_require__(__webpack_require__.s = 0);
    /******/ 
})({
    /***/ "./bin/DotNetSubject.js": 
    /*!******************************!*\
      !*** ./bin/DotNetSubject.js ***!
      \******************************/
    /*! no static exports found */
    /***/ (function (module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.DotNetSubject = void 0;
        // Wraps a Subject-like object received from the .NET code
        class DotNetSubject {
            constructor(subject) {
                this.subject = subject;
            }
            next(obj) {
                const json = !!obj ? JSON.stringify(obj) : null;
                this.subject.invokeMethodAsync('OnNext', json);
            }
            complete() {
                this.subject.invokeMethodAsync('OnCompleted');
            }
            error(message) {
                this.subject.invokeMethodAsync('OnCompleted', message);
            }
            test(data) {
                debugger;
                this.subject.invokeMethodAsync('Test', JSON.stringify(data));
            }
        }
        exports.DotNetSubject = DotNetSubject;
        //# sourceMappingURL=dotNetSubject.js.map
        /***/ 
    }),
    /***/ "./bin/main.js": 
    /*!*********************!*\
      !*** ./bin/main.js ***!
      \*********************/
    /*! no static exports found */
    /***/ (function (module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const player_service_1 = __webpack_require__(/*! ./player.service */ "./bin/player.service.js");
        window['PlayerService'] = new player_service_1.PlayerService();
        //# sourceMappingURL=main.js.map
        /***/ 
    }),
    /***/ "./bin/player.service.js": 
    /*!*******************************!*\
      !*** ./bin/player.service.js ***!
      \*******************************/
    /*! no static exports found */
    /***/ (function (module, exports, __webpack_require__) {
        "use strict";
        var __importDefault = (this && this.__importDefault) || function (mod) {
            return (mod && mod.__esModule) ? mod : { "default": mod };
        };
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.PlayerService = void 0;
        const audio_recorder_polyfill_1 = __importDefault(__webpack_require__(/*! audio-recorder-polyfill */ "./node_modules/audio-recorder-polyfill/index.js"));
        const DotNetSubject_1 = __webpack_require__(/*! ./DotNetSubject */ "./bin/DotNetSubject.js");
        class PlayerService {
            constructor() {
                this.maxRecordTime = 20000;
                this.mediaRecorder = null;
                this.isLoading = false;
                this.isPlaying = false;
                this.isRecording = false;
                this.audioElement = new Audio();
                this.canRecord = true;
                window.MediaRecorder = audio_recorder_polyfill_1.default;
            }
            get isBusy() {
                return this.isPlaying || this.isRecording || this.isLoading;
            }
            playUrl(s, url) {
                const subject = new DotNetSubject_1.DotNetSubject(s);
                this.isLoading = true;
                this.audioElement = new Audio(url);
                this.audioElement.onloadeddata = () => {
                    this.isLoading = false;
                    this.isPlaying = true;
                };
                this.audioElement.onended = () => {
                    console.log("play end", url);
                    this.isPlaying = false;
                    subject.next();
                    subject.complete();
                    this.audioElement = undefined;
                };
                this.audioElement.onerror = (err) => {
                    this.isLoading = false;
                    console.error("Error playing: " + url);
                    subject.error("Error playing: " + url);
                    this.isPlaying = false;
                    this.audioElement = undefined;
                };
                console.log("play", url.length);
                this.audioElement.play();
                return subject;
            }
            stopPlaying() {
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
            }
            // : Subject<{ blob: Blob; url: string }>
            record(s) {
                console.log("Player.recording");
                const subject = new DotNetSubject_1.DotNetSubject(s);
                this.isLoading = true;
                navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                    const options = { audioBitsPerSecond: 64000, mimeType: 'audio/webm' };
                    let recordedChunks = [];
                    this.mediaRecorder = new window.MediaRecorder(stream, options);
                    this.mediaRecorder.addEventListener('start', (e) => {
                        console.log("onstart");
                        this.isRecording = true;
                        this.isLoading = false;
                        this.timer = setTimeout(() => this.stopRecording(), this.maxRecordTime);
                    });
                    this.mediaRecorder.addEventListener('dataavailable', (e) => {
                        console.log("ondataavailable", e.data);
                        if (e.data.size > 0) {
                            recordedChunks.push(e.data);
                        }
                    });
                    this.mediaRecorder.addEventListener('stop', (e) => {
                        console.log("Player: stop recording");
                        // This gets called when the stopRecording() method gets called which is
                        // called when the user clicks on the stop icon.
                        // console.log("onstop", this.isLoading);
                        this.isLoading = true;
                        stream.getTracks().forEach((t) => t.stop());
                        const blob = new Blob(recordedChunks, { type: recordedChunks[0].type });
                        blob.arrayBuffer().then(buffer => {
                            subject.next({
                                url: URL.createObjectURL(blob),
                                type: blob.type,
                                blob64: btoa(String.fromCharCode(...new Uint8Array(buffer)))
                            });
                            subject.complete();
                            this.isLoading = false;
                        });
                    });
                    this.mediaRecorder.start();
                    this.isRecording = true;
                    this.isLoading = false;
                }, (err) => {
                    subject.error(err.toString());
                });
                return subject;
            }
            stopRecording() {
                console.log("Player.stopRecording");
                this.isRecording = false;
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = undefined;
                }
                if (this.mediaRecorder) {
                    this.mediaRecorder.stop();
                }
            }
        }
        exports.PlayerService = PlayerService;
        //# sourceMappingURL=player.service.js.map
        /***/ 
    }),
    /***/ "./node_modules/audio-recorder-polyfill/index.js": 
    /*!*******************************************************!*\
      !*** ./node_modules/audio-recorder-polyfill/index.js ***!
      \*******************************************************/
    /*! exports provided: default */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _wave_encoder_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wave-encoder/index.js */ "./node_modules/audio-recorder-polyfill/wave-encoder/index.js");
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        function createWorker(fn) {
            let js = fn
                .toString()
                .replace(/^(\(\)\s*=>|function\s*\(\))\s*{/, '')
                .replace(/}$/, '');
            let blob = new Blob([js]);
            return new Worker(URL.createObjectURL(blob));
        }
        function error(method) {
            let event = new Event('error');
            event.data = new Error('Wrong state for ' + method);
            return event;
        }
        let context, processor;
        /**
         * Audio Recorder with MediaRecorder API.
         *
         * @example
         * navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
         *   let recorder = new MediaRecorder(stream)
         * })
         */
        class MediaRecorder {
            /**
             * @param {MediaStream} stream The audio stream to record.
             */
            constructor(stream) {
                /**
                 * The `MediaStream` passed into the constructor.
                 * @type {MediaStream}
                 */
                this.stream = stream;
                /**
                 * The current state of recording process.
                 * @type {"inactive"|"recording"|"paused"}
                 */
                this.state = 'inactive';
                this.em = document.createDocumentFragment();
                this.encoder = createWorker(MediaRecorder.encoder);
                let recorder = this;
                this.encoder.addEventListener('message', e => {
                    let event = new Event('dataavailable');
                    event.data = new Blob([e.data], { type: recorder.mimeType });
                    recorder.em.dispatchEvent(event);
                    if (recorder.state === 'inactive') {
                        recorder.em.dispatchEvent(new Event('stop'));
                    }
                });
            }
            /**
             * Begins recording media.
             *
             * @param {number} [timeslice] The milliseconds to record into each `Blob`.
             *                             If this parameter isn’t included, single `Blob`
             *                             will be recorded.
             *
             * @return {undefined}
             *
             * @example
             * recordButton.addEventListener('click', () => {
             *   recorder.start()
             * })
             */
            start(timeslice) {
                if (this.state !== 'inactive') {
                    return this.em.dispatchEvent(error('start'));
                }
                this.state = 'recording';
                if (!context) {
                    context = new AudioContext();
                }
                this.clone = this.stream.clone();
                this.input = context.createMediaStreamSource(this.clone);
                if (!processor) {
                    processor = context.createScriptProcessor(2048, 1, 1);
                }
                let recorder = this;
                recorder.encoder.postMessage(['init', context.sampleRate]);
                processor.onaudioprocess = function (e) {
                    if (recorder.state === 'recording') {
                        recorder.encoder.postMessage([
                            'encode',
                            e.inputBuffer.getChannelData(0)
                        ]);
                    }
                };
                this.input.connect(processor);
                processor.connect(context.destination);
                this.em.dispatchEvent(new Event('start'));
                if (timeslice) {
                    this.slicing = setInterval(() => {
                        if (recorder.state === 'recording')
                            recorder.requestData();
                    }, timeslice);
                }
                return undefined;
            }
            /**
             * Stop media capture and raise `dataavailable` event with recorded data.
             *
             * @return {undefined}
             *
             * @example
             * finishButton.addEventListener('click', () => {
             *   recorder.stop()
             * })
             */
            stop() {
                if (this.state === 'inactive') {
                    return this.em.dispatchEvent(error('stop'));
                }
                this.requestData();
                this.state = 'inactive';
                this.clone.getTracks().forEach(track => {
                    track.stop();
                });
                this.input.disconnect();
                return clearInterval(this.slicing);
            }
            /**
             * Pauses recording of media streams.
             *
             * @return {undefined}
             *
             * @example
             * pauseButton.addEventListener('click', () => {
             *   recorder.pause()
             * })
             */
            pause() {
                if (this.state !== 'recording') {
                    return this.em.dispatchEvent(error('pause'));
                }
                this.state = 'paused';
                return this.em.dispatchEvent(new Event('pause'));
            }
            /**
             * Resumes media recording when it has been previously paused.
             *
             * @return {undefined}
             *
             * @example
             * resumeButton.addEventListener('click', () => {
             *   recorder.resume()
             * })
             */
            resume() {
                if (this.state !== 'paused') {
                    return this.em.dispatchEvent(error('resume'));
                }
                this.state = 'recording';
                return this.em.dispatchEvent(new Event('resume'));
            }
            /**
             * Raise a `dataavailable` event containing the captured media.
             *
             * @return {undefined}
             *
             * @example
             * this.on('nextData', () => {
             *   recorder.requestData()
             * })
             */
            requestData() {
                if (this.state === 'inactive') {
                    return this.em.dispatchEvent(error('requestData'));
                }
                return this.encoder.postMessage(['dump', context.sampleRate]);
            }
            /**
             * Add listener for specified event type.
             *
             * @param {"start"|"stop"|"pause"|"resume"|"dataavailable"|"error"}
             * type Event type.
             * @param {function} listener The listener function.
             *
             * @return {undefined}
             *
             * @example
             * recorder.addEventListener('dataavailable', e => {
             *   audio.src = URL.createObjectURL(e.data)
             * })
             */
            addEventListener(...args) {
                this.em.addEventListener(...args);
            }
            /**
             * Remove event listener.
             *
             * @param {"start"|"stop"|"pause"|"resume"|"dataavailable"|"error"}
             * type Event type.
             * @param {function} listener The same function used in `addEventListener`.
             *
             * @return {undefined}
             */
            removeEventListener(...args) {
                this.em.removeEventListener(...args);
            }
            /**
             * Calls each of the listeners registered for a given event.
             *
             * @param {Event} event The event object.
             *
             * @return {boolean} Is event was no canceled by any listener.
             */
            dispatchEvent(...args) {
                this.em.dispatchEvent(...args);
            }
        }
        /**
         * The MIME type that is being used for recording.
         * @type {string}
         */
        MediaRecorder.prototype.mimeType = 'audio/wav';
        /**
         * Returns `true` if the MIME type specified is one the polyfill can record.
         *
         * This polyfill supports `audio/wav` and `audio/mpeg`.
         *
         * @param {string} mimeType The mimeType to check.
         *
         * @return {boolean} `true` on `audio/wav` and `audio/mpeg` MIME type.
         */
        MediaRecorder.isTypeSupported = mimeType => {
            return MediaRecorder.prototype.mimeType === mimeType;
        };
        /**
         * `true` if MediaRecorder can not be polyfilled in the current browser.
         * @type {boolean}
         *
         * @example
         * if (MediaRecorder.notSupported) {
         *   showWarning('Audio recording is not supported in this browser')
         * }
         */
        MediaRecorder.notSupported = !navigator.mediaDevices || !AudioContext;
        /**
         * Converts RAW audio buffer to compressed audio files.
         * It will be loaded to Web Worker.
         * By default, WAVE encoder will be used.
         * @type {function}
         *
         * @example
         * MediaRecorder.prototype.mimeType = 'audio/ogg'
         * MediaRecorder.encoder = oggEncoder
         */
        MediaRecorder.encoder = _wave_encoder_index_js__WEBPACK_IMPORTED_MODULE_0__["default"];
        /* harmony default export */ __webpack_exports__["default"] = (MediaRecorder);
        /***/ 
    }),
    /***/ "./node_modules/audio-recorder-polyfill/wave-encoder/index.js": 
    /*!********************************************************************!*\
      !*** ./node_modules/audio-recorder-polyfill/wave-encoder/index.js ***!
      \********************************************************************/
    /*! exports provided: default */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        // Copied from https://github.com/chris-rudmin/Recorderjs
        /* harmony default export */ __webpack_exports__["default"] = (() => {
            let BYTES_PER_SAMPLE = 2;
            let recorded = [];
            function encode(buffer) {
                let length = buffer.length;
                let data = new Uint8Array(length * BYTES_PER_SAMPLE);
                for (let i = 0; i < length; i++) {
                    let index = i * BYTES_PER_SAMPLE;
                    let sample = buffer[i];
                    if (sample > 1) {
                        sample = 1;
                    }
                    else if (sample < -1) {
                        sample = -1;
                    }
                    sample = sample * 32768;
                    data[index] = sample;
                    data[index + 1] = sample >> 8;
                }
                recorded.push(data);
            }
            function dump(sampleRate) {
                let bufferLength = recorded.length ? recorded[0].length : 0;
                let length = recorded.length * bufferLength;
                let wav = new Uint8Array(44 + length);
                let view = new DataView(wav.buffer);
                // RIFF identifier 'RIFF'
                view.setUint32(0, 1380533830, false);
                // file length minus RIFF identifier length and file description length
                view.setUint32(4, 36 + length, true);
                // RIFF type 'WAVE'
                view.setUint32(8, 1463899717, false);
                // format chunk identifier 'fmt '
                view.setUint32(12, 1718449184, false);
                // format chunk length
                view.setUint32(16, 16, true);
                // sample format (raw)
                view.setUint16(20, 1, true);
                // channel count
                view.setUint16(22, 1, true);
                // sample rate
                view.setUint32(24, sampleRate, true);
                // byte rate (sample rate * block align)
                view.setUint32(28, sampleRate * BYTES_PER_SAMPLE, true);
                // block align (channel count * bytes per sample)
                view.setUint16(32, BYTES_PER_SAMPLE, true);
                // bits per sample
                view.setUint16(34, 8 * BYTES_PER_SAMPLE, true);
                // data chunk identifier 'data'
                view.setUint32(36, 1684108385, false);
                // data chunk length
                view.setUint32(40, length, true);
                // eslint-disable-next-line unicorn/no-for-loop
                for (let i = 0; i < recorded.length; i++) {
                    wav.set(recorded[i], i * bufferLength + 44);
                }
                recorded = [];
                postMessage(wav.buffer, [wav.buffer]);
            }
            onmessage = e => {
                if (e.data[0] === 'encode') {
                    encode(e.data[1]);
                }
                else if (e.data[0] === 'dump') {
                    dump(e.data[1]);
                }
            };
        });
        /***/ 
    }),
    /***/ "./src/secret.js": 
    /*!***********************!*\
      !*** ./src/secret.js ***!
      \***********************/
    /*! no static exports found */
    /***/ (function (module, exports) {
        // This file is not saved in GitHub so that it will not be publically visible
        window.firebaseConfig = {
            get: function () {
                return {
                    apiKey: "AIzaSyBLHFfWW4nYLcsMDhqunFcnsurz0ScRxfk",
                    authDomain: "flashdev-69399.firebaseapp.com",
                    databaseURL: "https://flashdev-69399.firebaseio.com",
                    projectId: "flashdev-69399",
                    storageBucket: "flashdev-69399.appspot.com",
                    messagingSenderId: "297825270138"
                };
            }
        };
        //# sourceMappingURL=secret.js.map
        /***/ 
    }),
    /***/ "./src/util.js": 
    /*!*********************!*\
      !*** ./src/util.js ***!
      \*********************/
    /*! no static exports found */
    /***/ (function (module, exports) {
        window.flash = {
            // MatIconButton visual feedback doesn't return to a normal style, so this fixes the problem. 
            loseFocus: () => {
                console.log("loseFocus");
                document.activeElement.blur();
            },
            // Sign in using the FirebaseUI widget and return the user's id.
            firebaseLogin: (subject) => {
                if (!flash.fbApp) {
                    flash.fbApp = firebase.initializeApp(window.firebaseConfig.get());
                    flash.fbUi = new firebaseui.auth.AuthUI(firebase.auth());
                }
                flash.fbUi.start('#firebaseui-auth-container', {
                    callbacks: {
                        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                            // User successfully signed in. Notify the Blazor code.
                            subject.invokeMethodAsync('OnNext', JSON.stringify(authResult.user));
                            subject.invokeMethodAsync('OnCompleted');
                            // Return false and let the Blazor code take care of the navigation
                            return false;
                        },
                    },
                    signInOptions: [
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        firebase.auth.EmailAuthProvider.PROVIDER_ID
                    ],
                });
            },
            firebaseLogout: (subject) => {
                firebase.auth().signOut().then(() => {
                    subject.invokeMethodAsync('OnNext', null);
                    subject.invokeMethodAsync('OnCompleted');
                }, function (error) {
                    console.error(error);
                });
            },
        };
        /***/ 
    }),
    /***/ 0: 
    /*!*********************************************************!*\
      !*** multi ./src/secret.js ./src/util.js ./bin/main.js ***!
      \*********************************************************/
    /*! no static exports found */
    /***/ (function (module, exports, __webpack_require__) {
        __webpack_require__(/*! ./src/secret.js */ "./src/secret.js");
        __webpack_require__(/*! ./src/util.js */ "./src/util.js");
        module.exports = __webpack_require__(/*! ./bin/main.js */ "./bin/main.js");
        /***/ 
    })
    /******/ 
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYmluL0RvdE5ldFN1YmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vYmluL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vYmluL3BsYXllci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdWRpby1yZWNvcmRlci1wb2x5ZmlsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXVkaW8tcmVjb3JkZXItcG9seWZpbGwvd2F2ZS1lbmNvZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMxRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCIsImZpbGUiOiJtYWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRG90TmV0U3ViamVjdCA9IHZvaWQgMDtcclxuLy8gV3JhcHMgYSBTdWJqZWN0LWxpa2Ugb2JqZWN0IHJlY2VpdmVkIGZyb20gdGhlIC5ORVQgY29kZVxyXG5jbGFzcyBEb3ROZXRTdWJqZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHN1YmplY3QpIHtcclxuICAgICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xyXG4gICAgfVxyXG4gICAgbmV4dChvYmopIHtcclxuICAgICAgICBjb25zdCBqc29uID0gISFvYmogPyBKU09OLnN0cmluZ2lmeShvYmopIDogbnVsbDtcclxuICAgICAgICB0aGlzLnN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ09uTmV4dCcsIGpzb24pO1xyXG4gICAgfVxyXG4gICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0Lmludm9rZU1ldGhvZEFzeW5jKCdPbkNvbXBsZXRlZCcpO1xyXG4gICAgfVxyXG4gICAgZXJyb3IobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25Db21wbGV0ZWQnLCBtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIHRlc3QoZGF0YSkge1xyXG4gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIHRoaXMuc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnVGVzdCcsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkRvdE5ldFN1YmplY3QgPSBEb3ROZXRTdWJqZWN0O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb3ROZXRTdWJqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHBsYXllcl9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9wbGF5ZXIuc2VydmljZVwiKTtcclxud2luZG93WydQbGF5ZXJTZXJ2aWNlJ10gPSBuZXcgcGxheWVyX3NlcnZpY2VfMS5QbGF5ZXJTZXJ2aWNlKCk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5QbGF5ZXJTZXJ2aWNlID0gdm9pZCAwO1xyXG5jb25zdCBhdWRpb19yZWNvcmRlcl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJhdWRpby1yZWNvcmRlci1wb2x5ZmlsbFwiKSk7XHJcbmNvbnN0IERvdE5ldFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuL0RvdE5ldFN1YmplY3RcIik7XHJcbmNsYXNzIFBsYXllclNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tYXhSZWNvcmRUaW1lID0gMjAwMDA7XHJcbiAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXVkaW9FbGVtZW50ID0gbmV3IEF1ZGlvKCk7XHJcbiAgICAgICAgdGhpcy5jYW5SZWNvcmQgPSB0cnVlO1xyXG4gICAgICAgIHdpbmRvdy5NZWRpYVJlY29yZGVyID0gYXVkaW9fcmVjb3JkZXJfcG9seWZpbGxfMS5kZWZhdWx0O1xyXG4gICAgfVxyXG4gICAgZ2V0IGlzQnVzeSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1JlY29yZGluZyB8fCB0aGlzLmlzTG9hZGluZztcclxuICAgIH1cclxuICAgIHBsYXlVcmwocywgdXJsKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IG5ldyBEb3ROZXRTdWJqZWN0XzEuRG90TmV0U3ViamVjdChzKTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQgPSBuZXcgQXVkaW8odXJsKTtcclxuICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5vbmxvYWRlZGRhdGEgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYXVkaW9FbGVtZW50Lm9uZW5kZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheSBlbmRcIiwgdXJsKTtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3ViamVjdC5uZXh0KCk7XHJcbiAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5vbmVycm9yID0gKGVycikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGxheWluZzogXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKFwiRXJyb3IgcGxheWluZzogXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheVwiLCB1cmwubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5wbGF5KCk7XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XHJcbiAgICB9XHJcbiAgICBzdG9wUGxheWluZygpIHtcclxuICAgICAgICAvLyBUaGVyZSBpcyBubyAnc3RvcCcgbWV0aG9kIGluIHRoZSBBdWRpbyBvYmplY3QsIHNvIHdlIGhhdmUgdG8gZG8gaXQgdGhpcyB3YXlcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdWRpb0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9FbGVtZW50LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic3RvcFBsYXlpbmdcIiwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyA6IFN1YmplY3Q8eyBibG9iOiBCbG9iOyB1cmw6IHN0cmluZyB9PlxyXG4gICAgcmVjb3JkKHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllci5yZWNvcmRpbmdcIik7XHJcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IG5ldyBEb3ROZXRTdWJqZWN0XzEuRG90TmV0U3ViamVjdChzKTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KS50aGVuKHN0cmVhbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGF1ZGlvQml0c1BlclNlY29uZDogNjQwMDAsIG1pbWVUeXBlOiAnYXVkaW8vd2VibScgfTtcclxuICAgICAgICAgICAgbGV0IHJlY29yZGVkQ2h1bmtzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG5ldyB3aW5kb3cuTWVkaWFSZWNvcmRlcihzdHJlYW0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbnN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zdG9wUmVjb3JkaW5nKCksIHRoaXMubWF4UmVjb3JkVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignZGF0YWF2YWlsYWJsZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uZGF0YWF2YWlsYWJsZVwiLCBlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YS5zaXplID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZGVkQ2h1bmtzLnB1c2goZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5hZGRFdmVudExpc3RlbmVyKCdzdG9wJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyOiBzdG9wIHJlY29yZGluZ1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgZ2V0cyBjYWxsZWQgd2hlbiB0aGUgc3RvcFJlY29yZGluZygpIG1ldGhvZCBnZXRzIGNhbGxlZCB3aGljaCBpc1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBzdG9wIGljb24uXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9uc3RvcFwiLCB0aGlzLmlzTG9hZGluZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCgodCkgPT4gdC5zdG9wKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKHJlY29yZGVkQ2h1bmtzLCB7IHR5cGU6IHJlY29yZGVkQ2h1bmtzWzBdLnR5cGUgfSk7XHJcbiAgICAgICAgICAgICAgICBibG9iLmFycmF5QnVmZmVyKCkudGhlbihidWZmZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3QubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogYmxvYi50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9iNjQ6IGJ0b2EoU3RyaW5nLmZyb21DaGFyQ29kZSguLi5uZXcgVWludDhBcnJheShidWZmZXIpKSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICAgICAgc3ViamVjdC5lcnJvcihlcnIudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XHJcbiAgICB9XHJcbiAgICBzdG9wUmVjb3JkaW5nKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyLnN0b3BSZWNvcmRpbmdcIik7XHJcbiAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubWVkaWFSZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlBsYXllclNlcnZpY2UgPSBQbGF5ZXJTZXJ2aWNlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wbGF5ZXIuc2VydmljZS5qcy5tYXAiLCJpbXBvcnQgd2F2ZUVuY29kZXIgZnJvbSAnLi93YXZlLWVuY29kZXIvaW5kZXguanMnXG5cbmxldCBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHRcblxuZnVuY3Rpb24gY3JlYXRlV29ya2VyIChmbikge1xuICBsZXQganMgPSBmblxuICAgIC50b1N0cmluZygpXG4gICAgLnJlcGxhY2UoL14oXFwoXFwpXFxzKj0+fGZ1bmN0aW9uXFxzKlxcKFxcKSlcXHMqey8sICcnKVxuICAgIC5yZXBsYWNlKC99JC8sICcnKVxuICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtqc10pXG4gIHJldHVybiBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpXG59XG5cbmZ1bmN0aW9uIGVycm9yIChtZXRob2QpIHtcbiAgbGV0IGV2ZW50ID0gbmV3IEV2ZW50KCdlcnJvcicpXG4gIGV2ZW50LmRhdGEgPSBuZXcgRXJyb3IoJ1dyb25nIHN0YXRlIGZvciAnICsgbWV0aG9kKVxuICByZXR1cm4gZXZlbnRcbn1cblxubGV0IGNvbnRleHQsIHByb2Nlc3NvclxuXG4vKipcbiAqIEF1ZGlvIFJlY29yZGVyIHdpdGggTWVkaWFSZWNvcmRlciBBUEkuXG4gKlxuICogQGV4YW1wbGVcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSkudGhlbihzdHJlYW0gPT4ge1xuICogICBsZXQgcmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcihzdHJlYW0pXG4gKiB9KVxuICovXG5jbGFzcyBNZWRpYVJlY29yZGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IHN0cmVhbSBUaGUgYXVkaW8gc3RyZWFtIHRvIHJlY29yZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChzdHJlYW0pIHtcbiAgICAvKipcbiAgICAgKiBUaGUgYE1lZGlhU3RyZWFtYCBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IuXG4gICAgICogQHR5cGUge01lZGlhU3RyZWFtfVxuICAgICAqL1xuICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiByZWNvcmRpbmcgcHJvY2Vzcy5cbiAgICAgKiBAdHlwZSB7XCJpbmFjdGl2ZVwifFwicmVjb3JkaW5nXCJ8XCJwYXVzZWRcIn1cbiAgICAgKi9cbiAgICB0aGlzLnN0YXRlID0gJ2luYWN0aXZlJ1xuXG4gICAgdGhpcy5lbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgIHRoaXMuZW5jb2RlciA9IGNyZWF0ZVdvcmtlcihNZWRpYVJlY29yZGVyLmVuY29kZXIpXG5cbiAgICBsZXQgcmVjb3JkZXIgPSB0aGlzXG4gICAgdGhpcy5lbmNvZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBlID0+IHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBFdmVudCgnZGF0YWF2YWlsYWJsZScpXG4gICAgICBldmVudC5kYXRhID0gbmV3IEJsb2IoW2UuZGF0YV0sIHsgdHlwZTogcmVjb3JkZXIubWltZVR5cGUgfSlcbiAgICAgIHJlY29yZGVyLmVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgICBpZiAocmVjb3JkZXIuc3RhdGUgPT09ICdpbmFjdGl2ZScpIHtcbiAgICAgICAgcmVjb3JkZXIuZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3N0b3AnKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyByZWNvcmRpbmcgbWVkaWEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZXNsaWNlXSBUaGUgbWlsbGlzZWNvbmRzIHRvIHJlY29yZCBpbnRvIGVhY2ggYEJsb2JgLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgdGhpcyBwYXJhbWV0ZXIgaXNu4oCZdCBpbmNsdWRlZCwgc2luZ2xlIGBCbG9iYFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbCBiZSByZWNvcmRlZC5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByZWNvcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIuc3RhcnQoKVxuICAgKiB9KVxuICAgKi9cbiAgc3RhcnQgKHRpbWVzbGljZSkge1xuICAgIGlmICh0aGlzLnN0YXRlICE9PSAnaW5hY3RpdmUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdzdGFydCcpKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSAncmVjb3JkaW5nJ1xuXG4gICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpXG4gICAgfVxuICAgIHRoaXMuY2xvbmUgPSB0aGlzLnN0cmVhbS5jbG9uZSgpXG4gICAgdGhpcy5pbnB1dCA9IGNvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2UodGhpcy5jbG9uZSlcblxuICAgIGlmICghcHJvY2Vzc29yKSB7XG4gICAgICBwcm9jZXNzb3IgPSBjb250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigyMDQ4LCAxLCAxKVxuICAgIH1cblxuICAgIGxldCByZWNvcmRlciA9IHRoaXNcblxuICAgIHJlY29yZGVyLmVuY29kZXIucG9zdE1lc3NhZ2UoWydpbml0JywgY29udGV4dC5zYW1wbGVSYXRlXSlcblxuICAgIHByb2Nlc3Nvci5vbmF1ZGlvcHJvY2VzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAocmVjb3JkZXIuc3RhdGUgPT09ICdyZWNvcmRpbmcnKSB7XG4gICAgICAgIHJlY29yZGVyLmVuY29kZXIucG9zdE1lc3NhZ2UoW1xuICAgICAgICAgICdlbmNvZGUnLFxuICAgICAgICAgIGUuaW5wdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcbiAgICAgICAgXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlucHV0LmNvbm5lY3QocHJvY2Vzc29yKVxuICAgIHByb2Nlc3Nvci5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pXG5cbiAgICB0aGlzLmVtLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzdGFydCcpKVxuXG4gICAgaWYgKHRpbWVzbGljZSkge1xuICAgICAgdGhpcy5zbGljaW5nID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAocmVjb3JkZXIuc3RhdGUgPT09ICdyZWNvcmRpbmcnKSByZWNvcmRlci5yZXF1ZXN0RGF0YSgpXG4gICAgICB9LCB0aW1lc2xpY2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgbWVkaWEgY2FwdHVyZSBhbmQgcmFpc2UgYGRhdGFhdmFpbGFibGVgIGV2ZW50IHdpdGggcmVjb3JkZWQgZGF0YS5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBmaW5pc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIuc3RvcCgpXG4gICAqIH0pXG4gICAqL1xuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2luYWN0aXZlJykge1xuICAgICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChlcnJvcignc3RvcCcpKVxuICAgIH1cblxuICAgIHRoaXMucmVxdWVzdERhdGEoKVxuICAgIHRoaXMuc3RhdGUgPSAnaW5hY3RpdmUnXG4gICAgdGhpcy5jbG9uZS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHtcbiAgICAgIHRyYWNrLnN0b3AoKVxuICAgIH0pXG4gICAgdGhpcy5pbnB1dC5kaXNjb25uZWN0KClcbiAgICByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aGlzLnNsaWNpbmcpXG4gIH1cblxuICAvKipcbiAgICogUGF1c2VzIHJlY29yZGluZyBvZiBtZWRpYSBzdHJlYW1zLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHBhdXNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgKiAgIHJlY29yZGVyLnBhdXNlKClcbiAgICogfSlcbiAgICovXG4gIHBhdXNlICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ3JlY29yZGluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQoZXJyb3IoJ3BhdXNlJykpXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9ICdwYXVzZWQnXG4gICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3BhdXNlJykpXG4gIH1cblxuICAvKipcbiAgICogUmVzdW1lcyBtZWRpYSByZWNvcmRpbmcgd2hlbiBpdCBoYXMgYmVlbiBwcmV2aW91c2x5IHBhdXNlZC5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByZXN1bWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIucmVzdW1lKClcbiAgICogfSlcbiAgICovXG4gIHJlc3VtZSAoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgIT09ICdwYXVzZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdyZXN1bWUnKSlcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0gJ3JlY29yZGluZydcbiAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVzdW1lJykpXG4gIH1cblxuICAvKipcbiAgICogUmFpc2UgYSBgZGF0YWF2YWlsYWJsZWAgZXZlbnQgY29udGFpbmluZyB0aGUgY2FwdHVyZWQgbWVkaWEuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdGhpcy5vbignbmV4dERhdGEnLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIucmVxdWVzdERhdGEoKVxuICAgKiB9KVxuICAgKi9cbiAgcmVxdWVzdERhdGEgKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAnaW5hY3RpdmUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdyZXF1ZXN0RGF0YScpKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVuY29kZXIucG9zdE1lc3NhZ2UoWydkdW1wJywgY29udGV4dC5zYW1wbGVSYXRlXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbGlzdGVuZXIgZm9yIHNwZWNpZmllZCBldmVudCB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge1wic3RhcnRcInxcInN0b3BcInxcInBhdXNlXCJ8XCJyZXN1bWVcInxcImRhdGFhdmFpbGFibGVcInxcImVycm9yXCJ9XG4gICAqIHR5cGUgRXZlbnQgdHlwZS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJlY29yZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RhdGFhdmFpbGFibGUnLCBlID0+IHtcbiAgICogICBhdWRpby5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGUuZGF0YSlcbiAgICogfSlcbiAgICovXG4gIGFkZEV2ZW50TGlzdGVuZXIgKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmVtLmFkZEV2ZW50TGlzdGVuZXIoLi4uYXJncylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7XCJzdGFydFwifFwic3RvcFwifFwicGF1c2VcInxcInJlc3VtZVwifFwiZGF0YWF2YWlsYWJsZVwifFwiZXJyb3JcIn1cbiAgICogdHlwZSBFdmVudCB0eXBlLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgc2FtZSBmdW5jdGlvbiB1c2VkIGluIGBhZGRFdmVudExpc3RlbmVyYC5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAoLi4uYXJncykge1xuICAgIHRoaXMuZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgZXZlbnQgb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBldmVudCB3YXMgbm8gY2FuY2VsZWQgYnkgYW55IGxpc3RlbmVyLlxuICAgKi9cbiAgZGlzcGF0Y2hFdmVudCAoLi4uYXJncykge1xuICAgIHRoaXMuZW0uZGlzcGF0Y2hFdmVudCguLi5hcmdzKVxuICB9XG59XG5cbi8qKlxuICogVGhlIE1JTUUgdHlwZSB0aGF0IGlzIGJlaW5nIHVzZWQgZm9yIHJlY29yZGluZy5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbk1lZGlhUmVjb3JkZXIucHJvdG90eXBlLm1pbWVUeXBlID0gJ2F1ZGlvL3dhdidcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgTUlNRSB0eXBlIHNwZWNpZmllZCBpcyBvbmUgdGhlIHBvbHlmaWxsIGNhbiByZWNvcmQuXG4gKlxuICogVGhpcyBwb2x5ZmlsbCBzdXBwb3J0cyBgYXVkaW8vd2F2YCBhbmQgYGF1ZGlvL21wZWdgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtaW1lVHlwZSBUaGUgbWltZVR5cGUgdG8gY2hlY2suXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gYHRydWVgIG9uIGBhdWRpby93YXZgIGFuZCBgYXVkaW8vbXBlZ2AgTUlNRSB0eXBlLlxuICovXG5NZWRpYVJlY29yZGVyLmlzVHlwZVN1cHBvcnRlZCA9IG1pbWVUeXBlID0+IHtcbiAgcmV0dXJuIE1lZGlhUmVjb3JkZXIucHJvdG90eXBlLm1pbWVUeXBlID09PSBtaW1lVHlwZVxufVxuXG4vKipcbiAqIGB0cnVlYCBpZiBNZWRpYVJlY29yZGVyIGNhbiBub3QgYmUgcG9seWZpbGxlZCBpbiB0aGUgY3VycmVudCBicm93c2VyLlxuICogQHR5cGUge2Jvb2xlYW59XG4gKlxuICogQGV4YW1wbGVcbiAqIGlmIChNZWRpYVJlY29yZGVyLm5vdFN1cHBvcnRlZCkge1xuICogICBzaG93V2FybmluZygnQXVkaW8gcmVjb3JkaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAqIH1cbiAqL1xuTWVkaWFSZWNvcmRlci5ub3RTdXBwb3J0ZWQgPSAhbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyB8fCAhQXVkaW9Db250ZXh0XG5cbi8qKlxuICogQ29udmVydHMgUkFXIGF1ZGlvIGJ1ZmZlciB0byBjb21wcmVzc2VkIGF1ZGlvIGZpbGVzLlxuICogSXQgd2lsbCBiZSBsb2FkZWQgdG8gV2ViIFdvcmtlci5cbiAqIEJ5IGRlZmF1bHQsIFdBVkUgZW5jb2RlciB3aWxsIGJlIHVzZWQuXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKlxuICogQGV4YW1wbGVcbiAqIE1lZGlhUmVjb3JkZXIucHJvdG90eXBlLm1pbWVUeXBlID0gJ2F1ZGlvL29nZydcbiAqIE1lZGlhUmVjb3JkZXIuZW5jb2RlciA9IG9nZ0VuY29kZXJcbiAqL1xuTWVkaWFSZWNvcmRlci5lbmNvZGVyID0gd2F2ZUVuY29kZXJcblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFSZWNvcmRlclxuIiwiLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NocmlzLXJ1ZG1pbi9SZWNvcmRlcmpzXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgbGV0IEJZVEVTX1BFUl9TQU1QTEUgPSAyXG5cbiAgbGV0IHJlY29yZGVkID0gW11cblxuICBmdW5jdGlvbiBlbmNvZGUgKGJ1ZmZlcikge1xuICAgIGxldCBsZW5ndGggPSBidWZmZXIubGVuZ3RoXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGggKiBCWVRFU19QRVJfU0FNUExFKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBpbmRleCA9IGkgKiBCWVRFU19QRVJfU0FNUExFXG4gICAgICBsZXQgc2FtcGxlID0gYnVmZmVyW2ldXG4gICAgICBpZiAoc2FtcGxlID4gMSkge1xuICAgICAgICBzYW1wbGUgPSAxXG4gICAgICB9IGVsc2UgaWYgKHNhbXBsZSA8IC0xKSB7XG4gICAgICAgIHNhbXBsZSA9IC0xXG4gICAgICB9XG4gICAgICBzYW1wbGUgPSBzYW1wbGUgKiAzMjc2OFxuICAgICAgZGF0YVtpbmRleF0gPSBzYW1wbGVcbiAgICAgIGRhdGFbaW5kZXggKyAxXSA9IHNhbXBsZSA+PiA4XG4gICAgfVxuICAgIHJlY29yZGVkLnB1c2goZGF0YSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGR1bXAgKHNhbXBsZVJhdGUpIHtcbiAgICBsZXQgYnVmZmVyTGVuZ3RoID0gcmVjb3JkZWQubGVuZ3RoID8gcmVjb3JkZWRbMF0ubGVuZ3RoIDogMFxuICAgIGxldCBsZW5ndGggPSByZWNvcmRlZC5sZW5ndGggKiBidWZmZXJMZW5ndGhcbiAgICBsZXQgd2F2ID0gbmV3IFVpbnQ4QXJyYXkoNDQgKyBsZW5ndGgpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcod2F2LmJ1ZmZlcilcblxuICAgIC8vIFJJRkYgaWRlbnRpZmllciAnUklGRidcbiAgICB2aWV3LnNldFVpbnQzMigwLCAxMzgwNTMzODMwLCBmYWxzZSlcbiAgICAvLyBmaWxlIGxlbmd0aCBtaW51cyBSSUZGIGlkZW50aWZpZXIgbGVuZ3RoIGFuZCBmaWxlIGRlc2NyaXB0aW9uIGxlbmd0aFxuICAgIHZpZXcuc2V0VWludDMyKDQsIDM2ICsgbGVuZ3RoLCB0cnVlKVxuICAgIC8vIFJJRkYgdHlwZSAnV0FWRSdcbiAgICB2aWV3LnNldFVpbnQzMig4LCAxNDYzODk5NzE3LCBmYWxzZSlcbiAgICAvLyBmb3JtYXQgY2h1bmsgaWRlbnRpZmllciAnZm10ICdcbiAgICB2aWV3LnNldFVpbnQzMigxMiwgMTcxODQ0OTE4NCwgZmFsc2UpXG4gICAgLy8gZm9ybWF0IGNodW5rIGxlbmd0aFxuICAgIHZpZXcuc2V0VWludDMyKDE2LCAxNiwgdHJ1ZSlcbiAgICAvLyBzYW1wbGUgZm9ybWF0IChyYXcpXG4gICAgdmlldy5zZXRVaW50MTYoMjAsIDEsIHRydWUpXG4gICAgLy8gY2hhbm5lbCBjb3VudFxuICAgIHZpZXcuc2V0VWludDE2KDIyLCAxLCB0cnVlKVxuICAgIC8vIHNhbXBsZSByYXRlXG4gICAgdmlldy5zZXRVaW50MzIoMjQsIHNhbXBsZVJhdGUsIHRydWUpXG4gICAgLy8gYnl0ZSByYXRlIChzYW1wbGUgcmF0ZSAqIGJsb2NrIGFsaWduKVxuICAgIHZpZXcuc2V0VWludDMyKDI4LCBzYW1wbGVSYXRlICogQllURVNfUEVSX1NBTVBMRSwgdHJ1ZSlcbiAgICAvLyBibG9jayBhbGlnbiAoY2hhbm5lbCBjb3VudCAqIGJ5dGVzIHBlciBzYW1wbGUpXG4gICAgdmlldy5zZXRVaW50MTYoMzIsIEJZVEVTX1BFUl9TQU1QTEUsIHRydWUpXG4gICAgLy8gYml0cyBwZXIgc2FtcGxlXG4gICAgdmlldy5zZXRVaW50MTYoMzQsIDggKiBCWVRFU19QRVJfU0FNUExFLCB0cnVlKVxuICAgIC8vIGRhdGEgY2h1bmsgaWRlbnRpZmllciAnZGF0YSdcbiAgICB2aWV3LnNldFVpbnQzMigzNiwgMTY4NDEwODM4NSwgZmFsc2UpXG4gICAgLy8gZGF0YSBjaHVuayBsZW5ndGhcbiAgICB2aWV3LnNldFVpbnQzMig0MCwgbGVuZ3RoLCB0cnVlKVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vbm8tZm9yLWxvb3BcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICB3YXYuc2V0KHJlY29yZGVkW2ldLCBpICogYnVmZmVyTGVuZ3RoICsgNDQpXG4gICAgfVxuXG4gICAgcmVjb3JkZWQgPSBbXVxuICAgIHBvc3RNZXNzYWdlKHdhdi5idWZmZXIsIFt3YXYuYnVmZmVyXSlcbiAgfVxuXG4gIG9ubWVzc2FnZSA9IGUgPT4ge1xuICAgIGlmIChlLmRhdGFbMF0gPT09ICdlbmNvZGUnKSB7XG4gICAgICBlbmNvZGUoZS5kYXRhWzFdKVxuICAgIH0gZWxzZSBpZiAoZS5kYXRhWzBdID09PSAnZHVtcCcpIHtcbiAgICAgIGR1bXAoZS5kYXRhWzFdKVxuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhpcyBmaWxlIGlzIG5vdCBzYXZlZCBpbiBHaXRIdWIgc28gdGhhdCBpdCB3aWxsIG5vdCBiZSBwdWJsaWNhbGx5IHZpc2libGVcclxud2luZG93LmZpcmViYXNlQ29uZmlnID0ge1xyXG4gIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFwaUtleTogXCJBSXphU3lCTEhGZldXNG5ZTGNzTURocXVuRmNuc3VyejBTY1J4ZmtcIixcclxuICAgICAgICBhdXRoRG9tYWluOiBcImZsYXNoZGV2LTY5Mzk5LmZpcmViYXNlYXBwLmNvbVwiLFxyXG4gICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vZmxhc2hkZXYtNjkzOTkuZmlyZWJhc2Vpby5jb21cIixcclxuICAgICAgICBwcm9qZWN0SWQ6IFwiZmxhc2hkZXYtNjkzOTlcIixcclxuICAgICAgICBzdG9yYWdlQnVja2V0OiBcImZsYXNoZGV2LTY5Mzk5LmFwcHNwb3QuY29tXCIsXHJcbiAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMjk3ODI1MjcwMTM4XCJcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlY3JldC5qcy5tYXAiLCLvu79cclxud2luZG93LmZsYXNoID0ge1xyXG4gIC8vIE1hdEljb25CdXR0b24gdmlzdWFsIGZlZWRiYWNrIGRvZXNuJ3QgcmV0dXJuIHRvIGEgbm9ybWFsIHN0eWxlLCBzbyB0aGlzIGZpeGVzIHRoZSBwcm9ibGVtLiBcclxuICBsb3NlRm9jdXM6ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwibG9zZUZvY3VzXCIpO1xyXG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8gU2lnbiBpbiB1c2luZyB0aGUgRmlyZWJhc2VVSSB3aWRnZXQgYW5kIHJldHVybiB0aGUgdXNlcidzIGlkLlxyXG4gIGZpcmViYXNlTG9naW46IChzdWJqZWN0KSA9PiB7XHJcbiAgICBpZiAoIWZsYXNoLmZiQXBwKSB7XHJcbiAgICAgIGZsYXNoLmZiQXBwID0gZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh3aW5kb3cuZmlyZWJhc2VDb25maWcuZ2V0KCkpO1xyXG4gICAgICBmbGFzaC5mYlVpID0gbmV3IGZpcmViYXNldWkuYXV0aC5BdXRoVUkoZmlyZWJhc2UuYXV0aCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBmbGFzaC5mYlVpLnN0YXJ0KCcjZmlyZWJhc2V1aS1hdXRoLWNvbnRhaW5lcicsIHtcclxuICAgICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgc2lnbkluU3VjY2Vzc1dpdGhBdXRoUmVzdWx0OiBmdW5jdGlvbiAoYXV0aFJlc3VsdCwgcmVkaXJlY3RVcmwpIHtcclxuICAgICAgICAgIC8vIFVzZXIgc3VjY2Vzc2Z1bGx5IHNpZ25lZCBpbi4gTm90aWZ5IHRoZSBCbGF6b3IgY29kZS5cclxuICAgICAgICAgIHN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ09uTmV4dCcsIEpTT04uc3RyaW5naWZ5KGF1dGhSZXN1bHQudXNlcikpO1xyXG4gICAgICAgICAgc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25Db21wbGV0ZWQnKTtcclxuXHJcbiAgICAgICAgICAvLyBSZXR1cm4gZmFsc2UgYW5kIGxldCB0aGUgQmxhem9yIGNvZGUgdGFrZSBjYXJlIG9mIHRoZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgc2lnbkluT3B0aW9uczogW1xyXG4gICAgICAgICAgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIuUFJPVklERVJfSUQsXHJcbiAgICAgICAgICBmaXJlYmFzZS5hdXRoLkVtYWlsQXV0aFByb3ZpZGVyLlBST1ZJREVSX0lEXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBmaXJlYmFzZUxvZ291dDogKHN1YmplY3QpID0+IHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ09uTmV4dCcsIG51bGwpO1xyXG4gICAgICBzdWJqZWN0Lmludm9rZU1ldGhvZEFzeW5jKCdPbkNvbXBsZXRlZCcpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufVxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceMappingURL=main-bundle.js.map