/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bin/DotNetSubject.js":
/*!******************************!*\
  !*** ./bin/DotNetSubject.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),

/***/ "./bin/main.js":
/*!*********************!*\
  !*** ./bin/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const player_service_1 = __webpack_require__(/*! ./player.service */ "./bin/player.service.js");
window['PlayerService'] = new player_service_1.PlayerService();
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "./bin/player.service.js":
/*!*******************************!*\
  !*** ./bin/player.service.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
            //console.log("play end", url);
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
        //console.log("play", url.length);
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
        //console.log("Player.recording");
        const subject = new DotNetSubject_1.DotNetSubject(s);
        this.isLoading = true;
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const options = { audioBitsPerSecond: 64000, mimeType: 'audio/webm' };
            let recordedChunks = [];
            this.mediaRecorder = new window.MediaRecorder(stream, options);
            this.mediaRecorder.addEventListener('start', (e) => {
                //console.log("onstart");
                this.isRecording = true;
                this.isLoading = false;
                this.timer = setTimeout(() => this.stopRecording(), this.maxRecordTime);
            });
            this.mediaRecorder.addEventListener('dataavailable', (e) => {
                //console.log("ondataavailable", e.data);
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            });
            this.mediaRecorder.addEventListener('stop', (e) => {
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

/***/ }),

/***/ "./node_modules/audio-recorder-polyfill/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/audio-recorder-polyfill/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wave_encoder_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wave-encoder/index.js */ "./node_modules/audio-recorder-polyfill/wave-encoder/index.js");


let AudioContext = window.AudioContext || window.webkitAudioContext

function createWorker (fn) {
  let js = fn
    .toString()
    .replace(/^(\(\)\s*=>|function\s*\(\))\s*{/, '')
    .replace(/}$/, '')
  let blob = new Blob([js])
  return new Worker(URL.createObjectURL(blob))
}

function error (method) {
  let event = new Event('error')
  event.data = new Error('Wrong state for ' + method)
  return event
}

let context, processor

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
  constructor (stream) {
    /**
     * The `MediaStream` passed into the constructor.
     * @type {MediaStream}
     */
    this.stream = stream

    /**
     * The current state of recording process.
     * @type {"inactive"|"recording"|"paused"}
     */
    this.state = 'inactive'

    this.em = document.createDocumentFragment()
    this.encoder = createWorker(MediaRecorder.encoder)

    let recorder = this
    this.encoder.addEventListener('message', e => {
      let event = new Event('dataavailable')
      event.data = new Blob([e.data], { type: recorder.mimeType })
      recorder.em.dispatchEvent(event)
      if (recorder.state === 'inactive') {
        recorder.em.dispatchEvent(new Event('stop'))
      }
    })
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
  start (timeslice) {
    if (this.state !== 'inactive') {
      return this.em.dispatchEvent(error('start'))
    }

    this.state = 'recording'

    if (!context) {
      context = new AudioContext()
    }
    this.clone = this.stream.clone()
    this.input = context.createMediaStreamSource(this.clone)

    if (!processor) {
      processor = context.createScriptProcessor(2048, 1, 1)
    }

    let recorder = this

    recorder.encoder.postMessage(['init', context.sampleRate])

    processor.onaudioprocess = function (e) {
      if (recorder.state === 'recording') {
        recorder.encoder.postMessage([
          'encode',
          e.inputBuffer.getChannelData(0)
        ])
      }
    }

    this.input.connect(processor)
    processor.connect(context.destination)

    this.em.dispatchEvent(new Event('start'))

    if (timeslice) {
      this.slicing = setInterval(() => {
        if (recorder.state === 'recording') recorder.requestData()
      }, timeslice)
    }

    return undefined
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
  stop () {
    if (this.state === 'inactive') {
      return this.em.dispatchEvent(error('stop'))
    }

    this.requestData()
    this.state = 'inactive'
    this.clone.getTracks().forEach(track => {
      track.stop()
    })
    this.input.disconnect()
    return clearInterval(this.slicing)
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
  pause () {
    if (this.state !== 'recording') {
      return this.em.dispatchEvent(error('pause'))
    }

    this.state = 'paused'
    return this.em.dispatchEvent(new Event('pause'))
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
  resume () {
    if (this.state !== 'paused') {
      return this.em.dispatchEvent(error('resume'))
    }

    this.state = 'recording'
    return this.em.dispatchEvent(new Event('resume'))
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
  requestData () {
    if (this.state === 'inactive') {
      return this.em.dispatchEvent(error('requestData'))
    }

    return this.encoder.postMessage(['dump', context.sampleRate])
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
  addEventListener (...args) {
    this.em.addEventListener(...args)
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
  removeEventListener (...args) {
    this.em.removeEventListener(...args)
  }

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {Event} event The event object.
   *
   * @return {boolean} Is event was no canceled by any listener.
   */
  dispatchEvent (...args) {
    this.em.dispatchEvent(...args)
  }
}

/**
 * The MIME type that is being used for recording.
 * @type {string}
 */
MediaRecorder.prototype.mimeType = 'audio/wav'

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
  return MediaRecorder.prototype.mimeType === mimeType
}

/**
 * `true` if MediaRecorder can not be polyfilled in the current browser.
 * @type {boolean}
 *
 * @example
 * if (MediaRecorder.notSupported) {
 *   showWarning('Audio recording is not supported in this browser')
 * }
 */
MediaRecorder.notSupported = !navigator.mediaDevices || !AudioContext

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
MediaRecorder.encoder = _wave_encoder_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]

/* harmony default export */ __webpack_exports__["default"] = (MediaRecorder);


/***/ }),

/***/ "./node_modules/audio-recorder-polyfill/wave-encoder/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/audio-recorder-polyfill/wave-encoder/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copied from https://github.com/chris-rudmin/Recorderjs

/* harmony default export */ __webpack_exports__["default"] = (() => {
  let BYTES_PER_SAMPLE = 2

  let recorded = []

  function encode (buffer) {
    let length = buffer.length
    let data = new Uint8Array(length * BYTES_PER_SAMPLE)
    for (let i = 0; i < length; i++) {
      let index = i * BYTES_PER_SAMPLE
      let sample = buffer[i]
      if (sample > 1) {
        sample = 1
      } else if (sample < -1) {
        sample = -1
      }
      sample = sample * 32768
      data[index] = sample
      data[index + 1] = sample >> 8
    }
    recorded.push(data)
  }

  function dump (sampleRate) {
    let bufferLength = recorded.length ? recorded[0].length : 0
    let length = recorded.length * bufferLength
    let wav = new Uint8Array(44 + length)
    let view = new DataView(wav.buffer)

    // RIFF identifier 'RIFF'
    view.setUint32(0, 1380533830, false)
    // file length minus RIFF identifier length and file description length
    view.setUint32(4, 36 + length, true)
    // RIFF type 'WAVE'
    view.setUint32(8, 1463899717, false)
    // format chunk identifier 'fmt '
    view.setUint32(12, 1718449184, false)
    // format chunk length
    view.setUint32(16, 16, true)
    // sample format (raw)
    view.setUint16(20, 1, true)
    // channel count
    view.setUint16(22, 1, true)
    // sample rate
    view.setUint32(24, sampleRate, true)
    // byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * BYTES_PER_SAMPLE, true)
    // block align (channel count * bytes per sample)
    view.setUint16(32, BYTES_PER_SAMPLE, true)
    // bits per sample
    view.setUint16(34, 8 * BYTES_PER_SAMPLE, true)
    // data chunk identifier 'data'
    view.setUint32(36, 1684108385, false)
    // data chunk length
    view.setUint32(40, length, true)

    // eslint-disable-next-line unicorn/no-for-loop
    for (let i = 0; i < recorded.length; i++) {
      wav.set(recorded[i], i * bufferLength + 44)
    }

    recorded = []
    postMessage(wav.buffer, [wav.buffer])
  }

  onmessage = e => {
    if (e.data[0] === 'encode') {
      encode(e.data[1])
    } else if (e.data[0] === 'dump') {
      dump(e.data[1])
    }
  }
});


/***/ }),

/***/ "./src/secret.js":
/*!***********************!*\
  !*** ./src/secret.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// This file is not saved in GitHub so that it will not be publically visible

// BlazorApp1 database
window.firebaseConfig = {
  get: function () {
    return {
      apiKey: "AIzaSyC3Y3Qc5hXFiIyL5hKg3WDKu_WAeR7Dupw",
      authDomain: "blazorapp1-50c53.firebaseapp.com",
      databaseURL: "https://blazorapp1-50c53.firebaseio.com",
      projectId: "blazorapp1-50c53",
      storageBucket: "blazorapp1-50c53.appspot.com",
      messagingSenderId: "79075663488",
      appId: "1:79075663488:web:73761d404944e873425065"
    };
  }
}

// flashdev database
//window.firebaseConfig = {
//  get: function () {
//    return {
//      apiKey: "AIzaSyBLHFfWW4nYLcsMDhqunFcnsurz0ScRxfk",
//      authDomain: "flashdev-69399.firebaseapp.com",
//      databaseURL: "https://flashdev-69399.firebaseio.com",
//      projectId: "flashdev-69399",
//      storageBucket: "flashdev-69399.appspot.com",
//      messagingSenderId: "297825270138",
//      appId: "1:79075663488:web:73761d404944e873425065"
//    };
//  }
//}


//# sourceMappingURL=secret.js.map

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿
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
    location.href = '/';
  },

  utcOffset: () => {
    return (new Date(Date.now())).getTimezoneOffset();
  },

  write: (text) => {
    console.log(text);
  },

}





/***/ }),

/***/ 0:
/*!*********************************************************!*\
  !*** multi ./src/secret.js ./src/util.js ./bin/main.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/secret.js */"./src/secret.js");
__webpack_require__(/*! ./src/util.js */"./src/util.js");
module.exports = __webpack_require__(/*! ./bin/main.js */"./bin/main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYmluL0RvdE5ldFN1YmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vYmluL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vYmluL3BsYXllci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdWRpby1yZWNvcmRlci1wb2x5ZmlsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXVkaW8tcmVjb3JkZXItcG9seWZpbGwvd2F2ZS1lbmNvZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMxRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxrQzs7Ozs7Ozs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUgiLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkRvdE5ldFN1YmplY3QgPSB2b2lkIDA7XHJcbi8vIFdyYXBzIGEgU3ViamVjdC1saWtlIG9iamVjdCByZWNlaXZlZCBmcm9tIHRoZSAuTkVUIGNvZGVcclxuY2xhc3MgRG90TmV0U3ViamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcclxuICAgIH1cclxuICAgIG5leHQob2JqKSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9ICEhb2JqID8gSlNPTi5zdHJpbmdpZnkob2JqKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0Lmludm9rZU1ldGhvZEFzeW5jKCdPbk5leHQnLCBqc29uKTtcclxuICAgIH1cclxuICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25Db21wbGV0ZWQnKTtcclxuICAgIH1cclxuICAgIGVycm9yKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLnN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ09uQ29tcGxldGVkJywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICB0ZXN0KGRhdGEpIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICB0aGlzLnN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ1Rlc3QnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Eb3ROZXRTdWJqZWN0ID0gRG90TmV0U3ViamVjdDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG90TmV0U3ViamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBwbGF5ZXJfc2VydmljZV8xID0gcmVxdWlyZShcIi4vcGxheWVyLnNlcnZpY2VcIik7XHJcbndpbmRvd1snUGxheWVyU2VydmljZSddID0gbmV3IHBsYXllcl9zZXJ2aWNlXzEuUGxheWVyU2VydmljZSgpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUGxheWVyU2VydmljZSA9IHZvaWQgMDtcclxuY29uc3QgYXVkaW9fcmVjb3JkZXJfcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiYXVkaW8tcmVjb3JkZXItcG9seWZpbGxcIikpO1xyXG5jb25zdCBEb3ROZXRTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9Eb3ROZXRTdWJqZWN0XCIpO1xyXG5jbGFzcyBQbGF5ZXJTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubWF4UmVjb3JkVGltZSA9IDIwMDAwO1xyXG4gICAgICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG51bGw7XHJcbiAgICAgICAgLy9wdWJsaWMgdXJsczogeyBba2V5OiBzdHJpbmddOiBCbG9iIH0gPSB7fTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXVkaW9FbGVtZW50ID0gbmV3IEF1ZGlvKCk7XHJcbiAgICAgICAgdGhpcy5jYW5SZWNvcmQgPSB0cnVlO1xyXG4gICAgICAgIHdpbmRvdy5NZWRpYVJlY29yZGVyID0gYXVkaW9fcmVjb3JkZXJfcG9seWZpbGxfMS5kZWZhdWx0O1xyXG4gICAgfVxyXG4gICAgZ2V0IGlzQnVzeSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1JlY29yZGluZyB8fCB0aGlzLmlzTG9hZGluZztcclxuICAgIH1cclxuICAgIHBsYXlVcmwocywgdXJsKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IG5ldyBEb3ROZXRTdWJqZWN0XzEuRG90TmV0U3ViamVjdChzKTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQgPSBuZXcgQXVkaW8odXJsKTtcclxuICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5vbmxvYWRlZGRhdGEgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYXVkaW9FbGVtZW50Lm9uZW5kZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJwbGF5IGVuZFwiLCB1cmwpO1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdWJqZWN0Lm5leHQoKTtcclxuICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYXVkaW9FbGVtZW50Lm9uZXJyb3IgPSAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwbGF5aW5nOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoXCJFcnJvciBwbGF5aW5nOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9FbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInBsYXlcIiwgdXJsLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQucGxheSgpO1xyXG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xyXG4gICAgfVxyXG4gICAgc3RvcFBsYXlpbmcoKSB7XHJcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gJ3N0b3AnIG1ldGhvZCBpbiB0aGUgQXVkaW8gb2JqZWN0LCBzbyB3ZSBoYXZlIHRvIGRvIGl0IHRoaXMgd2F5XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXVkaW9FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9FbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInN0b3BQbGF5aW5nXCIsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gOiBTdWJqZWN0PHsgYmxvYjogQmxvYjsgdXJsOiBzdHJpbmcgfT5cclxuICAgIHJlY29yZChzKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlBsYXllci5yZWNvcmRpbmdcIik7XHJcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IG5ldyBEb3ROZXRTdWJqZWN0XzEuRG90TmV0U3ViamVjdChzKTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KS50aGVuKHN0cmVhbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGF1ZGlvQml0c1BlclNlY29uZDogNjQwMDAsIG1pbWVUeXBlOiAnYXVkaW8vd2VibScgfTtcclxuICAgICAgICAgICAgbGV0IHJlY29yZGVkQ2h1bmtzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG5ldyB3aW5kb3cuTWVkaWFSZWNvcmRlcihzdHJlYW0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm9uc3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUmVjb3JkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnN0b3BSZWNvcmRpbmcoKSwgdGhpcy5tYXhSZWNvcmRUaW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5hZGRFdmVudExpc3RlbmVyKCdkYXRhYXZhaWxhYmxlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJvbmRhdGFhdmFpbGFibGVcIiwgZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmRhdGEuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRlZENodW5rcy5wdXNoKGUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignc3RvcCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGdldHMgY2FsbGVkIHdoZW4gdGhlIHN0b3BSZWNvcmRpbmcoKSBtZXRob2QgZ2V0cyBjYWxsZWQgd2hpY2ggaXNcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgc3RvcCBpY29uLlxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJvbnN0b3BcIiwgdGhpcy5pc0xvYWRpbmcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHQpID0+IHQuc3RvcCgpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihyZWNvcmRlZENodW5rcywgeyB0eXBlOiByZWNvcmRlZENodW5rc1swXS50eXBlIH0pO1xyXG4gICAgICAgICAgICAgICAgYmxvYi5hcnJheUJ1ZmZlcigpLnRoZW4oYnVmZmVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMudXJsc1t1cmxdID0gYmxvYjtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IGZiID0gbmV3IEZpcmViYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mYi5zYXZlQmxvYignYWJjZCcsIGJsb2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3QubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBibG9iLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2I2NDogYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlKC4uLm5ldyBVaW50OEFycmF5KGJ1ZmZlcikpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVyci50b1N0cmluZygpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3ViamVjdDtcclxuICAgIH1cclxuICAgIHN0b3BSZWNvcmRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubWVkaWFSZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlBsYXllclNlcnZpY2UgPSBQbGF5ZXJTZXJ2aWNlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wbGF5ZXIuc2VydmljZS5qcy5tYXAiLCJpbXBvcnQgd2F2ZUVuY29kZXIgZnJvbSAnLi93YXZlLWVuY29kZXIvaW5kZXguanMnXG5cbmxldCBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHRcblxuZnVuY3Rpb24gY3JlYXRlV29ya2VyIChmbikge1xuICBsZXQganMgPSBmblxuICAgIC50b1N0cmluZygpXG4gICAgLnJlcGxhY2UoL14oXFwoXFwpXFxzKj0+fGZ1bmN0aW9uXFxzKlxcKFxcKSlcXHMqey8sICcnKVxuICAgIC5yZXBsYWNlKC99JC8sICcnKVxuICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtqc10pXG4gIHJldHVybiBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpXG59XG5cbmZ1bmN0aW9uIGVycm9yIChtZXRob2QpIHtcbiAgbGV0IGV2ZW50ID0gbmV3IEV2ZW50KCdlcnJvcicpXG4gIGV2ZW50LmRhdGEgPSBuZXcgRXJyb3IoJ1dyb25nIHN0YXRlIGZvciAnICsgbWV0aG9kKVxuICByZXR1cm4gZXZlbnRcbn1cblxubGV0IGNvbnRleHQsIHByb2Nlc3NvclxuXG4vKipcbiAqIEF1ZGlvIFJlY29yZGVyIHdpdGggTWVkaWFSZWNvcmRlciBBUEkuXG4gKlxuICogQGV4YW1wbGVcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSkudGhlbihzdHJlYW0gPT4ge1xuICogICBsZXQgcmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcihzdHJlYW0pXG4gKiB9KVxuICovXG5jbGFzcyBNZWRpYVJlY29yZGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IHN0cmVhbSBUaGUgYXVkaW8gc3RyZWFtIHRvIHJlY29yZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChzdHJlYW0pIHtcbiAgICAvKipcbiAgICAgKiBUaGUgYE1lZGlhU3RyZWFtYCBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IuXG4gICAgICogQHR5cGUge01lZGlhU3RyZWFtfVxuICAgICAqL1xuICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiByZWNvcmRpbmcgcHJvY2Vzcy5cbiAgICAgKiBAdHlwZSB7XCJpbmFjdGl2ZVwifFwicmVjb3JkaW5nXCJ8XCJwYXVzZWRcIn1cbiAgICAgKi9cbiAgICB0aGlzLnN0YXRlID0gJ2luYWN0aXZlJ1xuXG4gICAgdGhpcy5lbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgIHRoaXMuZW5jb2RlciA9IGNyZWF0ZVdvcmtlcihNZWRpYVJlY29yZGVyLmVuY29kZXIpXG5cbiAgICBsZXQgcmVjb3JkZXIgPSB0aGlzXG4gICAgdGhpcy5lbmNvZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBlID0+IHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBFdmVudCgnZGF0YWF2YWlsYWJsZScpXG4gICAgICBldmVudC5kYXRhID0gbmV3IEJsb2IoW2UuZGF0YV0sIHsgdHlwZTogcmVjb3JkZXIubWltZVR5cGUgfSlcbiAgICAgIHJlY29yZGVyLmVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgICBpZiAocmVjb3JkZXIuc3RhdGUgPT09ICdpbmFjdGl2ZScpIHtcbiAgICAgICAgcmVjb3JkZXIuZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3N0b3AnKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyByZWNvcmRpbmcgbWVkaWEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZXNsaWNlXSBUaGUgbWlsbGlzZWNvbmRzIHRvIHJlY29yZCBpbnRvIGVhY2ggYEJsb2JgLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgdGhpcyBwYXJhbWV0ZXIgaXNu4oCZdCBpbmNsdWRlZCwgc2luZ2xlIGBCbG9iYFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbCBiZSByZWNvcmRlZC5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByZWNvcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIuc3RhcnQoKVxuICAgKiB9KVxuICAgKi9cbiAgc3RhcnQgKHRpbWVzbGljZSkge1xuICAgIGlmICh0aGlzLnN0YXRlICE9PSAnaW5hY3RpdmUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdzdGFydCcpKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSAncmVjb3JkaW5nJ1xuXG4gICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpXG4gICAgfVxuICAgIHRoaXMuY2xvbmUgPSB0aGlzLnN0cmVhbS5jbG9uZSgpXG4gICAgdGhpcy5pbnB1dCA9IGNvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2UodGhpcy5jbG9uZSlcblxuICAgIGlmICghcHJvY2Vzc29yKSB7XG4gICAgICBwcm9jZXNzb3IgPSBjb250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigyMDQ4LCAxLCAxKVxuICAgIH1cblxuICAgIGxldCByZWNvcmRlciA9IHRoaXNcblxuICAgIHJlY29yZGVyLmVuY29kZXIucG9zdE1lc3NhZ2UoWydpbml0JywgY29udGV4dC5zYW1wbGVSYXRlXSlcblxuICAgIHByb2Nlc3Nvci5vbmF1ZGlvcHJvY2VzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAocmVjb3JkZXIuc3RhdGUgPT09ICdyZWNvcmRpbmcnKSB7XG4gICAgICAgIHJlY29yZGVyLmVuY29kZXIucG9zdE1lc3NhZ2UoW1xuICAgICAgICAgICdlbmNvZGUnLFxuICAgICAgICAgIGUuaW5wdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcbiAgICAgICAgXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlucHV0LmNvbm5lY3QocHJvY2Vzc29yKVxuICAgIHByb2Nlc3Nvci5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pXG5cbiAgICB0aGlzLmVtLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzdGFydCcpKVxuXG4gICAgaWYgKHRpbWVzbGljZSkge1xuICAgICAgdGhpcy5zbGljaW5nID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAocmVjb3JkZXIuc3RhdGUgPT09ICdyZWNvcmRpbmcnKSByZWNvcmRlci5yZXF1ZXN0RGF0YSgpXG4gICAgICB9LCB0aW1lc2xpY2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgbWVkaWEgY2FwdHVyZSBhbmQgcmFpc2UgYGRhdGFhdmFpbGFibGVgIGV2ZW50IHdpdGggcmVjb3JkZWQgZGF0YS5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBmaW5pc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIuc3RvcCgpXG4gICAqIH0pXG4gICAqL1xuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2luYWN0aXZlJykge1xuICAgICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChlcnJvcignc3RvcCcpKVxuICAgIH1cblxuICAgIHRoaXMucmVxdWVzdERhdGEoKVxuICAgIHRoaXMuc3RhdGUgPSAnaW5hY3RpdmUnXG4gICAgdGhpcy5jbG9uZS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHtcbiAgICAgIHRyYWNrLnN0b3AoKVxuICAgIH0pXG4gICAgdGhpcy5pbnB1dC5kaXNjb25uZWN0KClcbiAgICByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aGlzLnNsaWNpbmcpXG4gIH1cblxuICAvKipcbiAgICogUGF1c2VzIHJlY29yZGluZyBvZiBtZWRpYSBzdHJlYW1zLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHBhdXNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgKiAgIHJlY29yZGVyLnBhdXNlKClcbiAgICogfSlcbiAgICovXG4gIHBhdXNlICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ3JlY29yZGluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQoZXJyb3IoJ3BhdXNlJykpXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9ICdwYXVzZWQnXG4gICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3BhdXNlJykpXG4gIH1cblxuICAvKipcbiAgICogUmVzdW1lcyBtZWRpYSByZWNvcmRpbmcgd2hlbiBpdCBoYXMgYmVlbiBwcmV2aW91c2x5IHBhdXNlZC5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByZXN1bWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIucmVzdW1lKClcbiAgICogfSlcbiAgICovXG4gIHJlc3VtZSAoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgIT09ICdwYXVzZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdyZXN1bWUnKSlcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0gJ3JlY29yZGluZydcbiAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVzdW1lJykpXG4gIH1cblxuICAvKipcbiAgICogUmFpc2UgYSBgZGF0YWF2YWlsYWJsZWAgZXZlbnQgY29udGFpbmluZyB0aGUgY2FwdHVyZWQgbWVkaWEuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdGhpcy5vbignbmV4dERhdGEnLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIucmVxdWVzdERhdGEoKVxuICAgKiB9KVxuICAgKi9cbiAgcmVxdWVzdERhdGEgKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAnaW5hY3RpdmUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdyZXF1ZXN0RGF0YScpKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVuY29kZXIucG9zdE1lc3NhZ2UoWydkdW1wJywgY29udGV4dC5zYW1wbGVSYXRlXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbGlzdGVuZXIgZm9yIHNwZWNpZmllZCBldmVudCB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge1wic3RhcnRcInxcInN0b3BcInxcInBhdXNlXCJ8XCJyZXN1bWVcInxcImRhdGFhdmFpbGFibGVcInxcImVycm9yXCJ9XG4gICAqIHR5cGUgRXZlbnQgdHlwZS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJlY29yZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RhdGFhdmFpbGFibGUnLCBlID0+IHtcbiAgICogICBhdWRpby5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGUuZGF0YSlcbiAgICogfSlcbiAgICovXG4gIGFkZEV2ZW50TGlzdGVuZXIgKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmVtLmFkZEV2ZW50TGlzdGVuZXIoLi4uYXJncylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7XCJzdGFydFwifFwic3RvcFwifFwicGF1c2VcInxcInJlc3VtZVwifFwiZGF0YWF2YWlsYWJsZVwifFwiZXJyb3JcIn1cbiAgICogdHlwZSBFdmVudCB0eXBlLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgc2FtZSBmdW5jdGlvbiB1c2VkIGluIGBhZGRFdmVudExpc3RlbmVyYC5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAoLi4uYXJncykge1xuICAgIHRoaXMuZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgZXZlbnQgb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBldmVudCB3YXMgbm8gY2FuY2VsZWQgYnkgYW55IGxpc3RlbmVyLlxuICAgKi9cbiAgZGlzcGF0Y2hFdmVudCAoLi4uYXJncykge1xuICAgIHRoaXMuZW0uZGlzcGF0Y2hFdmVudCguLi5hcmdzKVxuICB9XG59XG5cbi8qKlxuICogVGhlIE1JTUUgdHlwZSB0aGF0IGlzIGJlaW5nIHVzZWQgZm9yIHJlY29yZGluZy5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbk1lZGlhUmVjb3JkZXIucHJvdG90eXBlLm1pbWVUeXBlID0gJ2F1ZGlvL3dhdidcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgTUlNRSB0eXBlIHNwZWNpZmllZCBpcyBvbmUgdGhlIHBvbHlmaWxsIGNhbiByZWNvcmQuXG4gKlxuICogVGhpcyBwb2x5ZmlsbCBzdXBwb3J0cyBgYXVkaW8vd2F2YCBhbmQgYGF1ZGlvL21wZWdgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtaW1lVHlwZSBUaGUgbWltZVR5cGUgdG8gY2hlY2suXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gYHRydWVgIG9uIGBhdWRpby93YXZgIGFuZCBgYXVkaW8vbXBlZ2AgTUlNRSB0eXBlLlxuICovXG5NZWRpYVJlY29yZGVyLmlzVHlwZVN1cHBvcnRlZCA9IG1pbWVUeXBlID0+IHtcbiAgcmV0dXJuIE1lZGlhUmVjb3JkZXIucHJvdG90eXBlLm1pbWVUeXBlID09PSBtaW1lVHlwZVxufVxuXG4vKipcbiAqIGB0cnVlYCBpZiBNZWRpYVJlY29yZGVyIGNhbiBub3QgYmUgcG9seWZpbGxlZCBpbiB0aGUgY3VycmVudCBicm93c2VyLlxuICogQHR5cGUge2Jvb2xlYW59XG4gKlxuICogQGV4YW1wbGVcbiAqIGlmIChNZWRpYVJlY29yZGVyLm5vdFN1cHBvcnRlZCkge1xuICogICBzaG93V2FybmluZygnQXVkaW8gcmVjb3JkaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAqIH1cbiAqL1xuTWVkaWFSZWNvcmRlci5ub3RTdXBwb3J0ZWQgPSAhbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyB8fCAhQXVkaW9Db250ZXh0XG5cbi8qKlxuICogQ29udmVydHMgUkFXIGF1ZGlvIGJ1ZmZlciB0byBjb21wcmVzc2VkIGF1ZGlvIGZpbGVzLlxuICogSXQgd2lsbCBiZSBsb2FkZWQgdG8gV2ViIFdvcmtlci5cbiAqIEJ5IGRlZmF1bHQsIFdBVkUgZW5jb2RlciB3aWxsIGJlIHVzZWQuXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKlxuICogQGV4YW1wbGVcbiAqIE1lZGlhUmVjb3JkZXIucHJvdG90eXBlLm1pbWVUeXBlID0gJ2F1ZGlvL29nZydcbiAqIE1lZGlhUmVjb3JkZXIuZW5jb2RlciA9IG9nZ0VuY29kZXJcbiAqL1xuTWVkaWFSZWNvcmRlci5lbmNvZGVyID0gd2F2ZUVuY29kZXJcblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFSZWNvcmRlclxuIiwiLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NocmlzLXJ1ZG1pbi9SZWNvcmRlcmpzXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgbGV0IEJZVEVTX1BFUl9TQU1QTEUgPSAyXG5cbiAgbGV0IHJlY29yZGVkID0gW11cblxuICBmdW5jdGlvbiBlbmNvZGUgKGJ1ZmZlcikge1xuICAgIGxldCBsZW5ndGggPSBidWZmZXIubGVuZ3RoXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGggKiBCWVRFU19QRVJfU0FNUExFKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBpbmRleCA9IGkgKiBCWVRFU19QRVJfU0FNUExFXG4gICAgICBsZXQgc2FtcGxlID0gYnVmZmVyW2ldXG4gICAgICBpZiAoc2FtcGxlID4gMSkge1xuICAgICAgICBzYW1wbGUgPSAxXG4gICAgICB9IGVsc2UgaWYgKHNhbXBsZSA8IC0xKSB7XG4gICAgICAgIHNhbXBsZSA9IC0xXG4gICAgICB9XG4gICAgICBzYW1wbGUgPSBzYW1wbGUgKiAzMjc2OFxuICAgICAgZGF0YVtpbmRleF0gPSBzYW1wbGVcbiAgICAgIGRhdGFbaW5kZXggKyAxXSA9IHNhbXBsZSA+PiA4XG4gICAgfVxuICAgIHJlY29yZGVkLnB1c2goZGF0YSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGR1bXAgKHNhbXBsZVJhdGUpIHtcbiAgICBsZXQgYnVmZmVyTGVuZ3RoID0gcmVjb3JkZWQubGVuZ3RoID8gcmVjb3JkZWRbMF0ubGVuZ3RoIDogMFxuICAgIGxldCBsZW5ndGggPSByZWNvcmRlZC5sZW5ndGggKiBidWZmZXJMZW5ndGhcbiAgICBsZXQgd2F2ID0gbmV3IFVpbnQ4QXJyYXkoNDQgKyBsZW5ndGgpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcod2F2LmJ1ZmZlcilcblxuICAgIC8vIFJJRkYgaWRlbnRpZmllciAnUklGRidcbiAgICB2aWV3LnNldFVpbnQzMigwLCAxMzgwNTMzODMwLCBmYWxzZSlcbiAgICAvLyBmaWxlIGxlbmd0aCBtaW51cyBSSUZGIGlkZW50aWZpZXIgbGVuZ3RoIGFuZCBmaWxlIGRlc2NyaXB0aW9uIGxlbmd0aFxuICAgIHZpZXcuc2V0VWludDMyKDQsIDM2ICsgbGVuZ3RoLCB0cnVlKVxuICAgIC8vIFJJRkYgdHlwZSAnV0FWRSdcbiAgICB2aWV3LnNldFVpbnQzMig4LCAxNDYzODk5NzE3LCBmYWxzZSlcbiAgICAvLyBmb3JtYXQgY2h1bmsgaWRlbnRpZmllciAnZm10ICdcbiAgICB2aWV3LnNldFVpbnQzMigxMiwgMTcxODQ0OTE4NCwgZmFsc2UpXG4gICAgLy8gZm9ybWF0IGNodW5rIGxlbmd0aFxuICAgIHZpZXcuc2V0VWludDMyKDE2LCAxNiwgdHJ1ZSlcbiAgICAvLyBzYW1wbGUgZm9ybWF0IChyYXcpXG4gICAgdmlldy5zZXRVaW50MTYoMjAsIDEsIHRydWUpXG4gICAgLy8gY2hhbm5lbCBjb3VudFxuICAgIHZpZXcuc2V0VWludDE2KDIyLCAxLCB0cnVlKVxuICAgIC8vIHNhbXBsZSByYXRlXG4gICAgdmlldy5zZXRVaW50MzIoMjQsIHNhbXBsZVJhdGUsIHRydWUpXG4gICAgLy8gYnl0ZSByYXRlIChzYW1wbGUgcmF0ZSAqIGJsb2NrIGFsaWduKVxuICAgIHZpZXcuc2V0VWludDMyKDI4LCBzYW1wbGVSYXRlICogQllURVNfUEVSX1NBTVBMRSwgdHJ1ZSlcbiAgICAvLyBibG9jayBhbGlnbiAoY2hhbm5lbCBjb3VudCAqIGJ5dGVzIHBlciBzYW1wbGUpXG4gICAgdmlldy5zZXRVaW50MTYoMzIsIEJZVEVTX1BFUl9TQU1QTEUsIHRydWUpXG4gICAgLy8gYml0cyBwZXIgc2FtcGxlXG4gICAgdmlldy5zZXRVaW50MTYoMzQsIDggKiBCWVRFU19QRVJfU0FNUExFLCB0cnVlKVxuICAgIC8vIGRhdGEgY2h1bmsgaWRlbnRpZmllciAnZGF0YSdcbiAgICB2aWV3LnNldFVpbnQzMigzNiwgMTY4NDEwODM4NSwgZmFsc2UpXG4gICAgLy8gZGF0YSBjaHVuayBsZW5ndGhcbiAgICB2aWV3LnNldFVpbnQzMig0MCwgbGVuZ3RoLCB0cnVlKVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vbm8tZm9yLWxvb3BcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICB3YXYuc2V0KHJlY29yZGVkW2ldLCBpICogYnVmZmVyTGVuZ3RoICsgNDQpXG4gICAgfVxuXG4gICAgcmVjb3JkZWQgPSBbXVxuICAgIHBvc3RNZXNzYWdlKHdhdi5idWZmZXIsIFt3YXYuYnVmZmVyXSlcbiAgfVxuXG4gIG9ubWVzc2FnZSA9IGUgPT4ge1xuICAgIGlmIChlLmRhdGFbMF0gPT09ICdlbmNvZGUnKSB7XG4gICAgICBlbmNvZGUoZS5kYXRhWzFdKVxuICAgIH0gZWxzZSBpZiAoZS5kYXRhWzBdID09PSAnZHVtcCcpIHtcbiAgICAgIGR1bXAoZS5kYXRhWzFdKVxuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhpcyBmaWxlIGlzIG5vdCBzYXZlZCBpbiBHaXRIdWIgc28gdGhhdCBpdCB3aWxsIG5vdCBiZSBwdWJsaWNhbGx5IHZpc2libGVcclxuXHJcbi8vIEJsYXpvckFwcDEgZGF0YWJhc2Vcclxud2luZG93LmZpcmViYXNlQ29uZmlnID0ge1xyXG4gIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXBpS2V5OiBcIkFJemFTeUMzWTNRYzVoWEZpSXlMNWhLZzNXREt1X1dBZVI3RHVwd1wiLFxyXG4gICAgICBhdXRoRG9tYWluOiBcImJsYXpvcmFwcDEtNTBjNTMuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vYmxhem9yYXBwMS01MGM1My5maXJlYmFzZWlvLmNvbVwiLFxyXG4gICAgICBwcm9qZWN0SWQ6IFwiYmxhem9yYXBwMS01MGM1M1wiLFxyXG4gICAgICBzdG9yYWdlQnVja2V0OiBcImJsYXpvcmFwcDEtNTBjNTMuYXBwc3BvdC5jb21cIixcclxuICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiNzkwNzU2NjM0ODhcIixcclxuICAgICAgYXBwSWQ6IFwiMTo3OTA3NTY2MzQ4ODp3ZWI6NzM3NjFkNDA0OTQ0ZTg3MzQyNTA2NVwiXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuLy8gZmxhc2hkZXYgZGF0YWJhc2VcclxuLy93aW5kb3cuZmlyZWJhc2VDb25maWcgPSB7XHJcbi8vICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgcmV0dXJuIHtcclxuLy8gICAgICBhcGlLZXk6IFwiQUl6YVN5QkxIRmZXVzRuWUxjc01EaHF1bkZjbnN1cnowU2NSeGZrXCIsXHJcbi8vICAgICAgYXV0aERvbWFpbjogXCJmbGFzaGRldi02OTM5OS5maXJlYmFzZWFwcC5jb21cIixcclxuLy8gICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2ZsYXNoZGV2LTY5Mzk5LmZpcmViYXNlaW8uY29tXCIsXHJcbi8vICAgICAgcHJvamVjdElkOiBcImZsYXNoZGV2LTY5Mzk5XCIsXHJcbi8vICAgICAgc3RvcmFnZUJ1Y2tldDogXCJmbGFzaGRldi02OTM5OS5hcHBzcG90LmNvbVwiLFxyXG4vLyAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjI5NzgyNTI3MDEzOFwiLFxyXG4vLyAgICAgIGFwcElkOiBcIjE6NzkwNzU2NjM0ODg6d2ViOjczNzYxZDQwNDk0NGU4NzM0MjUwNjVcIlxyXG4vLyAgICB9O1xyXG4vLyAgfVxyXG4vL31cclxuXHJcblxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZWNyZXQuanMubWFwIiwi77u/XHJcbndpbmRvdy5mbGFzaCA9IHtcclxuICAvLyBNYXRJY29uQnV0dG9uIHZpc3VhbCBmZWVkYmFjayBkb2Vzbid0IHJldHVybiB0byBhIG5vcm1hbCBzdHlsZSwgc28gdGhpcyBmaXhlcyB0aGUgcHJvYmxlbS4gXHJcbiAgbG9zZUZvY3VzOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcclxuICB9LFxyXG5cclxuICAvLyBTaWduIGluIHVzaW5nIHRoZSBGaXJlYmFzZVVJIHdpZGdldCBhbmQgcmV0dXJuIHRoZSB1c2VyJ3MgaWQuXHJcbiAgZmlyZWJhc2VMb2dpbjogKHN1YmplY3QpID0+IHtcclxuICAgIGlmICghZmxhc2guZmJBcHApIHtcclxuICAgICAgZmxhc2guZmJBcHAgPSBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHdpbmRvdy5maXJlYmFzZUNvbmZpZy5nZXQoKSk7XHJcbiAgICAgIGZsYXNoLmZiVWkgPSBuZXcgZmlyZWJhc2V1aS5hdXRoLkF1dGhVSShmaXJlYmFzZS5hdXRoKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZsYXNoLmZiVWkuc3RhcnQoJyNmaXJlYmFzZXVpLWF1dGgtY29udGFpbmVyJywge1xyXG4gICAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICBzaWduSW5TdWNjZXNzV2l0aEF1dGhSZXN1bHQ6IGZ1bmN0aW9uIChhdXRoUmVzdWx0LCByZWRpcmVjdFVybCkge1xyXG4gICAgICAgICAgLy8gVXNlciBzdWNjZXNzZnVsbHkgc2lnbmVkIGluLiBOb3RpZnkgdGhlIEJsYXpvciBjb2RlLlxyXG4gICAgICAgICAgc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25OZXh0JywgSlNPTi5zdHJpbmdpZnkoYXV0aFJlc3VsdC51c2VyKSk7XHJcbiAgICAgICAgICBzdWJqZWN0Lmludm9rZU1ldGhvZEFzeW5jKCdPbkNvbXBsZXRlZCcpO1xyXG5cclxuICAgICAgICAgIC8vIFJldHVybiBmYWxzZSBhbmQgbGV0IHRoZSBCbGF6b3IgY29kZSB0YWtlIGNhcmUgb2YgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBzaWduSW5PcHRpb25zOiBbXHJcbiAgICAgICAgICBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlci5QUk9WSURFUl9JRCxcclxuICAgICAgICAgIGZpcmViYXNlLmF1dGguRW1haWxBdXRoUHJvdmlkZXIuUFJPVklERVJfSURcclxuICAgICAgXSxcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGZpcmViYXNlTG9nb3V0OiAoc3ViamVjdCkgPT4ge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgLy9mbGFzaC5mYkFwcCA9IHVuZGVmaW5lZDtcclxuICAgICAgLy9mbGFzaC5mYlVpID0gdW5kZWZpbmVkO1xyXG4gICAgICBzdWJqZWN0Lmludm9rZU1ldGhvZEFzeW5jKCdPbk5leHQnLCBudWxsKTtcclxuICAgICAgc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25Db21wbGV0ZWQnKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIHJlbG9hZDogKCkgPT4ge1xyXG4gICAgbG9jYXRpb24uaHJlZiA9ICcvJztcclxuICB9LFxyXG5cclxuICB1dGNPZmZzZXQ6ICgpID0+IHtcclxuICAgIHJldHVybiAobmV3IERhdGUoRGF0ZS5ub3coKSkpLmdldFRpbWV6b25lT2Zmc2V0KCk7XHJcbiAgfSxcclxuXHJcbiAgd3JpdGU6ICh0ZXh0KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyh0ZXh0KTtcclxuICB9LFxyXG5cclxufVxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9