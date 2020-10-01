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
    /***/ "./bin/firebase.js": 
    /*!*************************!*\
      !*** ./bin/firebase.js ***!
      \*************************/
    /*! no static exports found */
    /***/ (function (module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Firebase = void 0;
        class Firebase {
            saveBlob(subject, uid, prompt, blob) {
                debugger;
                const db = firebase.firestore();
                const array = new Uint8Array(blob.data64);
                const b = firebase.firestore.Blob.fromUint8Array(array);
                const obj = { blob: 'b', type: blob.type };
                const key = `${uid}_${prompt.id}`;
                db.collection('blobs').doc(key).set(obj).then(() => {
                    subject.OnNext(null);
                    subject.OnCompleted();
                }, (err) => {
                    console.error(err);
                });
            }
        }
        exports.Firebase = Firebase;
        //# sourceMappingURL=firebase.js.map
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
        const firebase_1 = __webpack_require__(/*! ./firebase */ "./bin/firebase.js");
        window['PlayerService'] = new player_service_1.PlayerService();
        window['Firebase'] = new firebase_1.Firebase();
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
                //public urls: { [key: string]: Blob } = {};
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
                            var url = URL.createObjectURL(blob);
                            //this.urls[url] = blob;
                            //const fb = new Firebase();
                            //fb.saveBlob('abcd', blob);
                            subject.next({
                                url: url,
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
                    apiKey: "AIzaSyC3Y3Qc5hXFiIyL5hKg3WDKu_WAeR7Dupw",
                    authDomain: "blazorapp1-50c53.firebaseapp.com",
                    databaseURL: "https://blazorapp1-50c53.firebaseio.com",
                    projectId: "blazorapp1-50c53",
                    storageBucket: "blazorapp1-50c53.appspot.com",
                    messagingSenderId: "79075663488"
                };
            }
        };
        //var firebaseConfig = {
        //  apiKey: "AIzaSyC3Y3Qc5hXFiIyL5hKg3WDKu_WAeR7Dupw",
        //  authDomain: "blazorapp1-50c53.firebaseapp.com",
        //  databaseURL: "https://blazorapp1-50c53.firebaseio.com",
        //  projectId: "blazorapp1-50c53",
        //  storageBucket: "blazorapp1-50c53.appspot.com",
        //  messagingSenderId: "79075663488",
        //  appId: "1:79075663488:web:73761d404944e873425065"
        //};
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
                    //flash.fbApp = undefined;
                    //flash.fbUi = undefined;
                    subject.invokeMethodAsync('OnNext', null);
                    subject.invokeMethodAsync('OnCompleted');
                }, function (error) {
                    console.error(error);
                });
            },
            reload: () => {
                console.log("reload");
                location.href = '/';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYmluL0RvdE5ldFN1YmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vYmluL2ZpcmViYXNlLmpzIiwid2VicGFjazovLy8uL2Jpbi9tYWluLmpzIiwid2VicGFjazovLy8uL2Jpbi9wbGF5ZXIuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXVkaW8tcmVjb3JkZXItcG9seWZpbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1ZGlvLXJlY29yZGVyLXBvbHlmaWxsL3dhdmUtZW5jb2Rlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VjcmV0LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDOzs7Ozs7Ozs7Ozs7QUN4QmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQix1QkFBdUIsSUFBSSxHQUFHLFVBQVU7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7Ozs7Ozs7QUNwQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCx5QkFBeUIsbUJBQU8sQ0FBQyxpREFBa0I7QUFDbkQsbUJBQW1CLG1CQUFPLENBQUMscUNBQVk7QUFDdkM7QUFDQTtBQUNBLGdDOzs7Ozs7Ozs7Ozs7QUNOYTtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxrREFBa0QsbUJBQU8sQ0FBQyxnRkFBeUI7QUFDbkYsd0JBQXdCLG1CQUFPLENBQUMsK0NBQWlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVksY0FBYztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxjQUFjO0FBQzNELDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELCtCQUErQjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDOzs7Ozs7Ozs7Ozs7QUMvSEE7QUFBQTtBQUFpRDs7QUFFakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDLGVBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxjQUFjO0FBQ3REO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QywwQkFBMEI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDhEQUFXOztBQUVwQiw0RUFBYTs7Ozs7Ozs7Ozs7OztBQzNSNUI7QUFBQTs7QUFFZTtBQUNmOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDMUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCIsImZpbGUiOiJtYWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRG90TmV0U3ViamVjdCA9IHZvaWQgMDtcclxuLy8gV3JhcHMgYSBTdWJqZWN0LWxpa2Ugb2JqZWN0IHJlY2VpdmVkIGZyb20gdGhlIC5ORVQgY29kZVxyXG5jbGFzcyBEb3ROZXRTdWJqZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHN1YmplY3QpIHtcclxuICAgICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xyXG4gICAgfVxyXG4gICAgbmV4dChvYmopIHtcclxuICAgICAgICBjb25zdCBqc29uID0gISFvYmogPyBKU09OLnN0cmluZ2lmeShvYmopIDogbnVsbDtcclxuICAgICAgICB0aGlzLnN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ09uTmV4dCcsIGpzb24pO1xyXG4gICAgfVxyXG4gICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0Lmludm9rZU1ldGhvZEFzeW5jKCdPbkNvbXBsZXRlZCcpO1xyXG4gICAgfVxyXG4gICAgZXJyb3IobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25Db21wbGV0ZWQnLCBtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIHRlc3QoZGF0YSkge1xyXG4gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIHRoaXMuc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnVGVzdCcsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkRvdE5ldFN1YmplY3QgPSBEb3ROZXRTdWJqZWN0O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb3ROZXRTdWJqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRmlyZWJhc2UgPSB2b2lkIDA7XHJcbmNsYXNzIEZpcmViYXNlIHtcclxuICAgIHNhdmVCbG9iKHN1YmplY3QsIHVpZCwgcHJvbXB0LCBibG9iKSB7XHJcbiAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgICAgICBjb25zdCBhcnJheSA9IG5ldyBVaW50OEFycmF5KGJsb2IuZGF0YTY0KTtcclxuICAgICAgICBjb25zdCBiID0gZmlyZWJhc2UuZmlyZXN0b3JlLkJsb2IuZnJvbVVpbnQ4QXJyYXkoYXJyYXkpO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IHsgYmxvYjogJ2InLCB0eXBlOiBibG9iLnR5cGUgfTtcclxuICAgICAgICBjb25zdCBrZXkgPSBgJHt1aWR9XyR7cHJvbXB0LmlkfWA7XHJcbiAgICAgICAgZGIuY29sbGVjdGlvbignYmxvYnMnKS5kb2Moa2V5KS5zZXQob2JqKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgc3ViamVjdC5Pbk5leHQobnVsbCk7XHJcbiAgICAgICAgICAgIHN1YmplY3QuT25Db21wbGV0ZWQoKTtcclxuICAgICAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkZpcmViYXNlID0gRmlyZWJhc2U7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpcmViYXNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHBsYXllcl9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9wbGF5ZXIuc2VydmljZVwiKTtcclxuY29uc3QgZmlyZWJhc2VfMSA9IHJlcXVpcmUoXCIuL2ZpcmViYXNlXCIpO1xyXG53aW5kb3dbJ1BsYXllclNlcnZpY2UnXSA9IG5ldyBwbGF5ZXJfc2VydmljZV8xLlBsYXllclNlcnZpY2UoKTtcclxud2luZG93WydGaXJlYmFzZSddID0gbmV3IGZpcmViYXNlXzEuRmlyZWJhc2UoKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlBsYXllclNlcnZpY2UgPSB2b2lkIDA7XHJcbmNvbnN0IGF1ZGlvX3JlY29yZGVyX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImF1ZGlvLXJlY29yZGVyLXBvbHlmaWxsXCIpKTtcclxuY29uc3QgRG90TmV0U3ViamVjdF8xID0gcmVxdWlyZShcIi4vRG90TmV0U3ViamVjdFwiKTtcclxuY2xhc3MgUGxheWVyU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1heFJlY29yZFRpbWUgPSAyMDAwMDtcclxuICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIgPSBudWxsO1xyXG4gICAgICAgIC8vcHVibGljIHVybHM6IHsgW2tleTogc3RyaW5nXTogQmxvYiB9ID0ge307XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudCA9IG5ldyBBdWRpbygpO1xyXG4gICAgICAgIHRoaXMuY2FuUmVjb3JkID0gdHJ1ZTtcclxuICAgICAgICB3aW5kb3cuTWVkaWFSZWNvcmRlciA9IGF1ZGlvX3JlY29yZGVyX3BvbHlmaWxsXzEuZGVmYXVsdDtcclxuICAgIH1cclxuICAgIGdldCBpc0J1c3koKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNSZWNvcmRpbmcgfHwgdGhpcy5pc0xvYWRpbmc7XHJcbiAgICB9XHJcbiAgICBwbGF5VXJsKHMsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgRG90TmV0U3ViamVjdF8xLkRvdE5ldFN1YmplY3Qocyk7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXVkaW9FbGVtZW50ID0gbmV3IEF1ZGlvKHVybCk7XHJcbiAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQub25sb2FkZWRkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5vbmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXkgZW5kXCIsIHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN1YmplY3QubmV4dCgpO1xyXG4gICAgICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9FbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQub25lcnJvciA9IChlcnIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBsYXlpbmc6IFwiICsgdXJsKTtcclxuICAgICAgICAgICAgc3ViamVjdC5lcnJvcihcIkVycm9yIHBsYXlpbmc6IFwiICsgdXJsKTtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXlcIiwgdXJsLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQucGxheSgpO1xyXG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xyXG4gICAgfVxyXG4gICAgc3RvcFBsYXlpbmcoKSB7XHJcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gJ3N0b3AnIG1ldGhvZCBpbiB0aGUgQXVkaW8gb2JqZWN0LCBzbyB3ZSBoYXZlIHRvIGRvIGl0IHRoaXMgd2F5XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXVkaW9FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9FbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInN0b3BQbGF5aW5nXCIsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gOiBTdWJqZWN0PHsgYmxvYjogQmxvYjsgdXJsOiBzdHJpbmcgfT5cclxuICAgIHJlY29yZChzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIucmVjb3JkaW5nXCIpO1xyXG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgRG90TmV0U3ViamVjdF8xLkRvdE5ldFN1YmplY3Qocyk7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSkudGhlbihzdHJlYW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0geyBhdWRpb0JpdHNQZXJTZWNvbmQ6IDY0MDAwLCBtaW1lVHlwZTogJ2F1ZGlvL3dlYm0nIH07XHJcbiAgICAgICAgICAgIGxldCByZWNvcmRlZENodW5rcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIgPSBuZXcgd2luZG93Lk1lZGlhUmVjb3JkZXIoc3RyZWFtLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3N0YXJ0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25zdGFydFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc3RvcFJlY29yZGluZygpLCB0aGlzLm1heFJlY29yZFRpbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RhdGFhdmFpbGFibGUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbmRhdGFhdmFpbGFibGVcIiwgZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmRhdGEuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRlZENodW5rcy5wdXNoKGUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignc3RvcCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllcjogc3RvcCByZWNvcmRpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGdldHMgY2FsbGVkIHdoZW4gdGhlIHN0b3BSZWNvcmRpbmcoKSBtZXRob2QgZ2V0cyBjYWxsZWQgd2hpY2ggaXNcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgc3RvcCBpY29uLlxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJvbnN0b3BcIiwgdGhpcy5pc0xvYWRpbmcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHQpID0+IHQuc3RvcCgpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihyZWNvcmRlZENodW5rcywgeyB0eXBlOiByZWNvcmRlZENodW5rc1swXS50eXBlIH0pO1xyXG4gICAgICAgICAgICAgICAgYmxvYi5hcnJheUJ1ZmZlcigpLnRoZW4oYnVmZmVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMudXJsc1t1cmxdID0gYmxvYjtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IGZiID0gbmV3IEZpcmViYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mYi5zYXZlQmxvYignYWJjZCcsIGJsb2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3QubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBibG9iLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2I2NDogYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlKC4uLm5ldyBVaW50OEFycmF5KGJ1ZmZlcikpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVyci50b1N0cmluZygpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3ViamVjdDtcclxuICAgIH1cclxuICAgIHN0b3BSZWNvcmRpbmcoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIuc3RvcFJlY29yZGluZ1wiKTtcclxuICAgICAgICB0aGlzLmlzUmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tZWRpYVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUGxheWVyU2VydmljZSA9IFBsYXllclNlcnZpY2U7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsYXllci5zZXJ2aWNlLmpzLm1hcCIsImltcG9ydCB3YXZlRW5jb2RlciBmcm9tICcuL3dhdmUtZW5jb2Rlci9pbmRleC5qcydcblxubGV0IEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dFxuXG5mdW5jdGlvbiBjcmVhdGVXb3JrZXIgKGZuKSB7XG4gIGxldCBqcyA9IGZuXG4gICAgLnRvU3RyaW5nKClcbiAgICAucmVwbGFjZSgvXihcXChcXClcXHMqPT58ZnVuY3Rpb25cXHMqXFwoXFwpKVxccyp7LywgJycpXG4gICAgLnJlcGxhY2UoL30kLywgJycpXG4gIGxldCBibG9iID0gbmV3IEJsb2IoW2pzXSlcbiAgcmV0dXJuIG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSlcbn1cblxuZnVuY3Rpb24gZXJyb3IgKG1ldGhvZCkge1xuICBsZXQgZXZlbnQgPSBuZXcgRXZlbnQoJ2Vycm9yJylcbiAgZXZlbnQuZGF0YSA9IG5ldyBFcnJvcignV3Jvbmcgc3RhdGUgZm9yICcgKyBtZXRob2QpXG4gIHJldHVybiBldmVudFxufVxuXG5sZXQgY29udGV4dCwgcHJvY2Vzc29yXG5cbi8qKlxuICogQXVkaW8gUmVjb3JkZXIgd2l0aCBNZWRpYVJlY29yZGVyIEFQSS5cbiAqXG4gKiBAZXhhbXBsZVxuICogbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KS50aGVuKHN0cmVhbSA9PiB7XG4gKiAgIGxldCByZWNvcmRlciA9IG5ldyBNZWRpYVJlY29yZGVyKHN0cmVhbSlcbiAqIH0pXG4gKi9cbmNsYXNzIE1lZGlhUmVjb3JkZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gc3RyZWFtIFRoZSBhdWRpbyBzdHJlYW0gdG8gcmVjb3JkLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHN0cmVhbSkge1xuICAgIC8qKlxuICAgICAqIFRoZSBgTWVkaWFTdHJlYW1gIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAdHlwZSB7TWVkaWFTdHJlYW19XG4gICAgICovXG4gICAgdGhpcy5zdHJlYW0gPSBzdHJlYW1cblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHN0YXRlIG9mIHJlY29yZGluZyBwcm9jZXNzLlxuICAgICAqIEB0eXBlIHtcImluYWN0aXZlXCJ8XCJyZWNvcmRpbmdcInxcInBhdXNlZFwifVxuICAgICAqL1xuICAgIHRoaXMuc3RhdGUgPSAnaW5hY3RpdmUnXG5cbiAgICB0aGlzLmVtID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgdGhpcy5lbmNvZGVyID0gY3JlYXRlV29ya2VyKE1lZGlhUmVjb3JkZXIuZW5jb2RlcilcblxuICAgIGxldCByZWNvcmRlciA9IHRoaXNcbiAgICB0aGlzLmVuY29kZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGUgPT4ge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEV2ZW50KCdkYXRhYXZhaWxhYmxlJylcbiAgICAgIGV2ZW50LmRhdGEgPSBuZXcgQmxvYihbZS5kYXRhXSwgeyB0eXBlOiByZWNvcmRlci5taW1lVHlwZSB9KVxuICAgICAgcmVjb3JkZXIuZW0uZGlzcGF0Y2hFdmVudChldmVudClcbiAgICAgIGlmIChyZWNvcmRlci5zdGF0ZSA9PT0gJ2luYWN0aXZlJykge1xuICAgICAgICByZWNvcmRlci5lbS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnc3RvcCcpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQmVnaW5zIHJlY29yZGluZyBtZWRpYS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lc2xpY2VdIFRoZSBtaWxsaXNlY29uZHMgdG8gcmVjb3JkIGludG8gZWFjaCBgQmxvYmAuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiB0aGlzIHBhcmFtZXRlciBpc27igJl0IGluY2x1ZGVkLCBzaW5nbGUgYEJsb2JgXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsIGJlIHJlY29yZGVkLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJlY29yZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICogICByZWNvcmRlci5zdGFydCgpXG4gICAqIH0pXG4gICAqL1xuICBzdGFydCAodGltZXNsaWNlKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgIT09ICdpbmFjdGl2ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQoZXJyb3IoJ3N0YXJ0JykpXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9ICdyZWNvcmRpbmcnXG5cbiAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KClcbiAgICB9XG4gICAgdGhpcy5jbG9uZSA9IHRoaXMuc3RyZWFtLmNsb25lKClcbiAgICB0aGlzLmlucHV0ID0gY29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZSh0aGlzLmNsb25lKVxuXG4gICAgaWYgKCFwcm9jZXNzb3IpIHtcbiAgICAgIHByb2Nlc3NvciA9IGNvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDIwNDgsIDEsIDEpXG4gICAgfVxuXG4gICAgbGV0IHJlY29yZGVyID0gdGhpc1xuXG4gICAgcmVjb3JkZXIuZW5jb2Rlci5wb3N0TWVzc2FnZShbJ2luaXQnLCBjb250ZXh0LnNhbXBsZVJhdGVdKVxuXG4gICAgcHJvY2Vzc29yLm9uYXVkaW9wcm9jZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChyZWNvcmRlci5zdGF0ZSA9PT0gJ3JlY29yZGluZycpIHtcbiAgICAgICAgcmVjb3JkZXIuZW5jb2Rlci5wb3N0TWVzc2FnZShbXG4gICAgICAgICAgJ2VuY29kZScsXG4gICAgICAgICAgZS5pbnB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuICAgICAgICBdKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaW5wdXQuY29ubmVjdChwcm9jZXNzb3IpXG4gICAgcHJvY2Vzc29yLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbilcblxuICAgIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3N0YXJ0JykpXG5cbiAgICBpZiAodGltZXNsaWNlKSB7XG4gICAgICB0aGlzLnNsaWNpbmcgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmIChyZWNvcmRlci5zdGF0ZSA9PT0gJ3JlY29yZGluZycpIHJlY29yZGVyLnJlcXVlc3REYXRhKClcbiAgICAgIH0sIHRpbWVzbGljZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICAvKipcbiAgICogU3RvcCBtZWRpYSBjYXB0dXJlIGFuZCByYWlzZSBgZGF0YWF2YWlsYWJsZWAgZXZlbnQgd2l0aCByZWNvcmRlZCBkYXRhLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGZpbmlzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICogICByZWNvcmRlci5zdG9wKClcbiAgICogfSlcbiAgICovXG4gIHN0b3AgKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAnaW5hY3RpdmUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdzdG9wJykpXG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0RGF0YSgpXG4gICAgdGhpcy5zdGF0ZSA9ICdpbmFjdGl2ZSdcbiAgICB0aGlzLmNsb25lLmdldFRyYWNrcygpLmZvckVhY2godHJhY2sgPT4ge1xuICAgICAgdHJhY2suc3RvcCgpXG4gICAgfSlcbiAgICB0aGlzLmlucHV0LmRpc2Nvbm5lY3QoKVxuICAgIHJldHVybiBjbGVhckludGVydmFsKHRoaXMuc2xpY2luZylcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXVzZXMgcmVjb3JkaW5nIG9mIG1lZGlhIHN0cmVhbXMuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcGF1c2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIucGF1c2UoKVxuICAgKiB9KVxuICAgKi9cbiAgcGF1c2UgKCkge1xuICAgIGlmICh0aGlzLnN0YXRlICE9PSAncmVjb3JkaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChlcnJvcigncGF1c2UnKSlcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0gJ3BhdXNlZCdcbiAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncGF1c2UnKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN1bWVzIG1lZGlhIHJlY29yZGluZyB3aGVuIGl0IGhhcyBiZWVuIHByZXZpb3VzbHkgcGF1c2VkLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJlc3VtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICogICByZWNvcmRlci5yZXN1bWUoKVxuICAgKiB9KVxuICAgKi9cbiAgcmVzdW1lICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ3BhdXNlZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQoZXJyb3IoJ3Jlc3VtZScpKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSAncmVjb3JkaW5nJ1xuICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXN1bWUnKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSYWlzZSBhIGBkYXRhYXZhaWxhYmxlYCBldmVudCBjb250YWluaW5nIHRoZSBjYXB0dXJlZCBtZWRpYS5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB0aGlzLm9uKCduZXh0RGF0YScsICgpID0+IHtcbiAgICogICByZWNvcmRlci5yZXF1ZXN0RGF0YSgpXG4gICAqIH0pXG4gICAqL1xuICByZXF1ZXN0RGF0YSAoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdpbmFjdGl2ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQoZXJyb3IoJ3JlcXVlc3REYXRhJykpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZW5jb2Rlci5wb3N0TWVzc2FnZShbJ2R1bXAnLCBjb250ZXh0LnNhbXBsZVJhdGVdKVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBsaXN0ZW5lciBmb3Igc3BlY2lmaWVkIGV2ZW50IHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7XCJzdGFydFwifFwic3RvcFwifFwicGF1c2VcInxcInJlc3VtZVwifFwiZGF0YWF2YWlsYWJsZVwifFwiZXJyb3JcIn1cbiAgICogdHlwZSBFdmVudCB0eXBlLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignZGF0YWF2YWlsYWJsZScsIGUgPT4ge1xuICAgKiAgIGF1ZGlvLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZS5kYXRhKVxuICAgKiB9KVxuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lciAoLi4uYXJncykge1xuICAgIHRoaXMuZW0uYWRkRXZlbnRMaXN0ZW5lciguLi5hcmdzKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtcInN0YXJ0XCJ8XCJzdG9wXCJ8XCJwYXVzZVwifFwicmVzdW1lXCJ8XCJkYXRhYXZhaWxhYmxlXCJ8XCJlcnJvclwifVxuICAgKiB0eXBlIEV2ZW50IHR5cGUuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFRoZSBzYW1lIGZ1bmN0aW9uIHVzZWQgaW4gYGFkZEV2ZW50TGlzdGVuZXJgLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyICguLi5hcmdzKSB7XG4gICAgdGhpcy5lbS5yZW1vdmVFdmVudExpc3RlbmVyKC4uLmFyZ3MpXG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgZWFjaCBvZiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IElzIGV2ZW50IHdhcyBubyBjYW5jZWxlZCBieSBhbnkgbGlzdGVuZXIuXG4gICAqL1xuICBkaXNwYXRjaEV2ZW50ICguLi5hcmdzKSB7XG4gICAgdGhpcy5lbS5kaXNwYXRjaEV2ZW50KC4uLmFyZ3MpXG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgTUlNRSB0eXBlIHRoYXQgaXMgYmVpbmcgdXNlZCBmb3IgcmVjb3JkaW5nLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuTWVkaWFSZWNvcmRlci5wcm90b3R5cGUubWltZVR5cGUgPSAnYXVkaW8vd2F2J1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBNSU1FIHR5cGUgc3BlY2lmaWVkIGlzIG9uZSB0aGUgcG9seWZpbGwgY2FuIHJlY29yZC5cbiAqXG4gKiBUaGlzIHBvbHlmaWxsIHN1cHBvcnRzIGBhdWRpby93YXZgIGFuZCBgYXVkaW8vbXBlZ2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1pbWVUeXBlIFRoZSBtaW1lVHlwZSB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgb24gYGF1ZGlvL3dhdmAgYW5kIGBhdWRpby9tcGVnYCBNSU1FIHR5cGUuXG4gKi9cbk1lZGlhUmVjb3JkZXIuaXNUeXBlU3VwcG9ydGVkID0gbWltZVR5cGUgPT4ge1xuICByZXR1cm4gTWVkaWFSZWNvcmRlci5wcm90b3R5cGUubWltZVR5cGUgPT09IG1pbWVUeXBlXG59XG5cbi8qKlxuICogYHRydWVgIGlmIE1lZGlhUmVjb3JkZXIgY2FuIG5vdCBiZSBwb2x5ZmlsbGVkIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqXG4gKiBAZXhhbXBsZVxuICogaWYgKE1lZGlhUmVjb3JkZXIubm90U3VwcG9ydGVkKSB7XG4gKiAgIHNob3dXYXJuaW5nKCdBdWRpbyByZWNvcmRpbmcgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKVxuICogfVxuICovXG5NZWRpYVJlY29yZGVyLm5vdFN1cHBvcnRlZCA9ICFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIHx8ICFBdWRpb0NvbnRleHRcblxuLyoqXG4gKiBDb252ZXJ0cyBSQVcgYXVkaW8gYnVmZmVyIHRvIGNvbXByZXNzZWQgYXVkaW8gZmlsZXMuXG4gKiBJdCB3aWxsIGJlIGxvYWRlZCB0byBXZWIgV29ya2VyLlxuICogQnkgZGVmYXVsdCwgV0FWRSBlbmNvZGVyIHdpbGwgYmUgdXNlZC5cbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqXG4gKiBAZXhhbXBsZVxuICogTWVkaWFSZWNvcmRlci5wcm90b3R5cGUubWltZVR5cGUgPSAnYXVkaW8vb2dnJ1xuICogTWVkaWFSZWNvcmRlci5lbmNvZGVyID0gb2dnRW5jb2RlclxuICovXG5NZWRpYVJlY29yZGVyLmVuY29kZXIgPSB3YXZlRW5jb2RlclxuXG5leHBvcnQgZGVmYXVsdCBNZWRpYVJlY29yZGVyXG4iLCIvLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vY2hyaXMtcnVkbWluL1JlY29yZGVyanNcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBsZXQgQllURVNfUEVSX1NBTVBMRSA9IDJcblxuICBsZXQgcmVjb3JkZWQgPSBbXVxuXG4gIGZ1bmN0aW9uIGVuY29kZSAoYnVmZmVyKSB7XG4gICAgbGV0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGhcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCAqIEJZVEVTX1BFUl9TQU1QTEUpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGluZGV4ID0gaSAqIEJZVEVTX1BFUl9TQU1QTEVcbiAgICAgIGxldCBzYW1wbGUgPSBidWZmZXJbaV1cbiAgICAgIGlmIChzYW1wbGUgPiAxKSB7XG4gICAgICAgIHNhbXBsZSA9IDFcbiAgICAgIH0gZWxzZSBpZiAoc2FtcGxlIDwgLTEpIHtcbiAgICAgICAgc2FtcGxlID0gLTFcbiAgICAgIH1cbiAgICAgIHNhbXBsZSA9IHNhbXBsZSAqIDMyNzY4XG4gICAgICBkYXRhW2luZGV4XSA9IHNhbXBsZVxuICAgICAgZGF0YVtpbmRleCArIDFdID0gc2FtcGxlID4+IDhcbiAgICB9XG4gICAgcmVjb3JkZWQucHVzaChkYXRhKVxuICB9XG5cbiAgZnVuY3Rpb24gZHVtcCAoc2FtcGxlUmF0ZSkge1xuICAgIGxldCBidWZmZXJMZW5ndGggPSByZWNvcmRlZC5sZW5ndGggPyByZWNvcmRlZFswXS5sZW5ndGggOiAwXG4gICAgbGV0IGxlbmd0aCA9IHJlY29yZGVkLmxlbmd0aCAqIGJ1ZmZlckxlbmd0aFxuICAgIGxldCB3YXYgPSBuZXcgVWludDhBcnJheSg0NCArIGxlbmd0aClcbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyh3YXYuYnVmZmVyKVxuXG4gICAgLy8gUklGRiBpZGVudGlmaWVyICdSSUZGJ1xuICAgIHZpZXcuc2V0VWludDMyKDAsIDEzODA1MzM4MzAsIGZhbHNlKVxuICAgIC8vIGZpbGUgbGVuZ3RoIG1pbnVzIFJJRkYgaWRlbnRpZmllciBsZW5ndGggYW5kIGZpbGUgZGVzY3JpcHRpb24gbGVuZ3RoXG4gICAgdmlldy5zZXRVaW50MzIoNCwgMzYgKyBsZW5ndGgsIHRydWUpXG4gICAgLy8gUklGRiB0eXBlICdXQVZFJ1xuICAgIHZpZXcuc2V0VWludDMyKDgsIDE0NjM4OTk3MTcsIGZhbHNlKVxuICAgIC8vIGZvcm1hdCBjaHVuayBpZGVudGlmaWVyICdmbXQgJ1xuICAgIHZpZXcuc2V0VWludDMyKDEyLCAxNzE4NDQ5MTg0LCBmYWxzZSlcbiAgICAvLyBmb3JtYXQgY2h1bmsgbGVuZ3RoXG4gICAgdmlldy5zZXRVaW50MzIoMTYsIDE2LCB0cnVlKVxuICAgIC8vIHNhbXBsZSBmb3JtYXQgKHJhdylcbiAgICB2aWV3LnNldFVpbnQxNigyMCwgMSwgdHJ1ZSlcbiAgICAvLyBjaGFubmVsIGNvdW50XG4gICAgdmlldy5zZXRVaW50MTYoMjIsIDEsIHRydWUpXG4gICAgLy8gc2FtcGxlIHJhdGVcbiAgICB2aWV3LnNldFVpbnQzMigyNCwgc2FtcGxlUmF0ZSwgdHJ1ZSlcbiAgICAvLyBieXRlIHJhdGUgKHNhbXBsZSByYXRlICogYmxvY2sgYWxpZ24pXG4gICAgdmlldy5zZXRVaW50MzIoMjgsIHNhbXBsZVJhdGUgKiBCWVRFU19QRVJfU0FNUExFLCB0cnVlKVxuICAgIC8vIGJsb2NrIGFsaWduIChjaGFubmVsIGNvdW50ICogYnl0ZXMgcGVyIHNhbXBsZSlcbiAgICB2aWV3LnNldFVpbnQxNigzMiwgQllURVNfUEVSX1NBTVBMRSwgdHJ1ZSlcbiAgICAvLyBiaXRzIHBlciBzYW1wbGVcbiAgICB2aWV3LnNldFVpbnQxNigzNCwgOCAqIEJZVEVTX1BFUl9TQU1QTEUsIHRydWUpXG4gICAgLy8gZGF0YSBjaHVuayBpZGVudGlmaWVyICdkYXRhJ1xuICAgIHZpZXcuc2V0VWludDMyKDM2LCAxNjg0MTA4Mzg1LCBmYWxzZSlcbiAgICAvLyBkYXRhIGNodW5rIGxlbmd0aFxuICAgIHZpZXcuc2V0VWludDMyKDQwLCBsZW5ndGgsIHRydWUpXG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9uby1mb3ItbG9vcFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3JkZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHdhdi5zZXQocmVjb3JkZWRbaV0sIGkgKiBidWZmZXJMZW5ndGggKyA0NClcbiAgICB9XG5cbiAgICByZWNvcmRlZCA9IFtdXG4gICAgcG9zdE1lc3NhZ2Uod2F2LmJ1ZmZlciwgW3dhdi5idWZmZXJdKVxuICB9XG5cbiAgb25tZXNzYWdlID0gZSA9PiB7XG4gICAgaWYgKGUuZGF0YVswXSA9PT0gJ2VuY29kZScpIHtcbiAgICAgIGVuY29kZShlLmRhdGFbMV0pXG4gICAgfSBlbHNlIGlmIChlLmRhdGFbMF0gPT09ICdkdW1wJykge1xuICAgICAgZHVtcChlLmRhdGFbMV0pXG4gICAgfVxuICB9XG59XG4iLCIvLyBUaGlzIGZpbGUgaXMgbm90IHNhdmVkIGluIEdpdEh1YiBzbyB0aGF0IGl0IHdpbGwgbm90IGJlIHB1YmxpY2FsbHkgdmlzaWJsZVxyXG53aW5kb3cuZmlyZWJhc2VDb25maWcgPSB7XHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFwaUtleTogXCJBSXphU3lDM1kzUWM1aFhGaUl5TDVoS2czV0RLdV9XQWVSN0R1cHdcIixcclxuICAgICAgYXV0aERvbWFpbjogXCJibGF6b3JhcHAxLTUwYzUzLmZpcmViYXNlYXBwLmNvbVwiLFxyXG4gICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2JsYXpvcmFwcDEtNTBjNTMuZmlyZWJhc2Vpby5jb21cIixcclxuICAgICAgcHJvamVjdElkOiBcImJsYXpvcmFwcDEtNTBjNTNcIixcclxuICAgICAgc3RvcmFnZUJ1Y2tldDogXCJibGF6b3JhcHAxLTUwYzUzLmFwcHNwb3QuY29tXCIsXHJcbiAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjc5MDc1NjYzNDg4XCJcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4vL3ZhciBmaXJlYmFzZUNvbmZpZyA9IHtcclxuLy8gIGFwaUtleTogXCJBSXphU3lDM1kzUWM1aFhGaUl5TDVoS2czV0RLdV9XQWVSN0R1cHdcIixcclxuLy8gIGF1dGhEb21haW46IFwiYmxhem9yYXBwMS01MGM1My5maXJlYmFzZWFwcC5jb21cIixcclxuLy8gIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vYmxhem9yYXBwMS01MGM1My5maXJlYmFzZWlvLmNvbVwiLFxyXG4vLyAgcHJvamVjdElkOiBcImJsYXpvcmFwcDEtNTBjNTNcIixcclxuLy8gIHN0b3JhZ2VCdWNrZXQ6IFwiYmxhem9yYXBwMS01MGM1My5hcHBzcG90LmNvbVwiLFxyXG4vLyAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiNzkwNzU2NjM0ODhcIixcclxuLy8gIGFwcElkOiBcIjE6NzkwNzU2NjM0ODg6d2ViOjczNzYxZDQwNDk0NGU4NzM0MjUwNjVcIlxyXG4vL307XHJcblxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZWNyZXQuanMubWFwIiwi77u/XHJcbndpbmRvdy5mbGFzaCA9IHtcclxuICAvLyBNYXRJY29uQnV0dG9uIHZpc3VhbCBmZWVkYmFjayBkb2Vzbid0IHJldHVybiB0byBhIG5vcm1hbCBzdHlsZSwgc28gdGhpcyBmaXhlcyB0aGUgcHJvYmxlbS4gXHJcbiAgbG9zZUZvY3VzOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcclxuICB9LFxyXG5cclxuICAvLyBTaWduIGluIHVzaW5nIHRoZSBGaXJlYmFzZVVJIHdpZGdldCBhbmQgcmV0dXJuIHRoZSB1c2VyJ3MgaWQuXHJcbiAgZmlyZWJhc2VMb2dpbjogKHN1YmplY3QpID0+IHtcclxuICAgIGlmICghZmxhc2guZmJBcHApIHtcclxuICAgICAgZmxhc2guZmJBcHAgPSBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHdpbmRvdy5maXJlYmFzZUNvbmZpZy5nZXQoKSk7XHJcbiAgICAgIGZsYXNoLmZiVWkgPSBuZXcgZmlyZWJhc2V1aS5hdXRoLkF1dGhVSShmaXJlYmFzZS5hdXRoKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZsYXNoLmZiVWkuc3RhcnQoJyNmaXJlYmFzZXVpLWF1dGgtY29udGFpbmVyJywge1xyXG4gICAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICBzaWduSW5TdWNjZXNzV2l0aEF1dGhSZXN1bHQ6IGZ1bmN0aW9uIChhdXRoUmVzdWx0LCByZWRpcmVjdFVybCkge1xyXG4gICAgICAgICAgLy8gVXNlciBzdWNjZXNzZnVsbHkgc2lnbmVkIGluLiBOb3RpZnkgdGhlIEJsYXpvciBjb2RlLlxyXG4gICAgICAgICAgc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25OZXh0JywgSlNPTi5zdHJpbmdpZnkoYXV0aFJlc3VsdC51c2VyKSk7XHJcbiAgICAgICAgICBzdWJqZWN0Lmludm9rZU1ldGhvZEFzeW5jKCdPbkNvbXBsZXRlZCcpO1xyXG5cclxuICAgICAgICAgIC8vIFJldHVybiBmYWxzZSBhbmQgbGV0IHRoZSBCbGF6b3IgY29kZSB0YWtlIGNhcmUgb2YgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBzaWduSW5PcHRpb25zOiBbXHJcbiAgICAgICAgICBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlci5QUk9WSURFUl9JRCxcclxuICAgICAgICAgIGZpcmViYXNlLmF1dGguRW1haWxBdXRoUHJvdmlkZXIuUFJPVklERVJfSURcclxuICAgICAgXSxcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGZpcmViYXNlTG9nb3V0OiAoc3ViamVjdCkgPT4ge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgLy9mbGFzaC5mYkFwcCA9IHVuZGVmaW5lZDtcclxuICAgICAgLy9mbGFzaC5mYlVpID0gdW5kZWZpbmVkO1xyXG4gICAgICBzdWJqZWN0Lmludm9rZU1ldGhvZEFzeW5jKCdPbk5leHQnLCBudWxsKTtcclxuICAgICAgc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25Db21wbGV0ZWQnKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIHJlbG9hZDogKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJyZWxvYWRcIik7XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gJy8nO1xyXG4gIH0sXHJcblxyXG59XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceMappingURL=main-bundle.js.map