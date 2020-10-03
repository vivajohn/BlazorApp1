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
    console.log("reload");
    location.href = '/';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYmluL0RvdE5ldFN1YmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vYmluL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vYmluL3BsYXllci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdWRpby1yZWNvcmRlci1wb2x5ZmlsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXVkaW8tcmVjb3JkZXItcG9seWZpbGwvd2F2ZS1lbmNvZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDMUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esa0M7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgiLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkRvdE5ldFN1YmplY3QgPSB2b2lkIDA7XHJcbi8vIFdyYXBzIGEgU3ViamVjdC1saWtlIG9iamVjdCByZWNlaXZlZCBmcm9tIHRoZSAuTkVUIGNvZGVcclxuY2xhc3MgRG90TmV0U3ViamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcclxuICAgIH1cclxuICAgIG5leHQob2JqKSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9ICEhb2JqID8gSlNPTi5zdHJpbmdpZnkob2JqKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0Lmludm9rZU1ldGhvZEFzeW5jKCdPbk5leHQnLCBqc29uKTtcclxuICAgIH1cclxuICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25Db21wbGV0ZWQnKTtcclxuICAgIH1cclxuICAgIGVycm9yKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLnN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ09uQ29tcGxldGVkJywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICB0ZXN0KGRhdGEpIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICB0aGlzLnN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ1Rlc3QnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Eb3ROZXRTdWJqZWN0ID0gRG90TmV0U3ViamVjdDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG90TmV0U3ViamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBwbGF5ZXJfc2VydmljZV8xID0gcmVxdWlyZShcIi4vcGxheWVyLnNlcnZpY2VcIik7XHJcbndpbmRvd1snUGxheWVyU2VydmljZSddID0gbmV3IHBsYXllcl9zZXJ2aWNlXzEuUGxheWVyU2VydmljZSgpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUGxheWVyU2VydmljZSA9IHZvaWQgMDtcclxuY29uc3QgYXVkaW9fcmVjb3JkZXJfcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiYXVkaW8tcmVjb3JkZXItcG9seWZpbGxcIikpO1xyXG5jb25zdCBEb3ROZXRTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9Eb3ROZXRTdWJqZWN0XCIpO1xyXG5jbGFzcyBQbGF5ZXJTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubWF4UmVjb3JkVGltZSA9IDIwMDAwO1xyXG4gICAgICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG51bGw7XHJcbiAgICAgICAgLy9wdWJsaWMgdXJsczogeyBba2V5OiBzdHJpbmddOiBCbG9iIH0gPSB7fTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXVkaW9FbGVtZW50ID0gbmV3IEF1ZGlvKCk7XHJcbiAgICAgICAgdGhpcy5jYW5SZWNvcmQgPSB0cnVlO1xyXG4gICAgICAgIHdpbmRvdy5NZWRpYVJlY29yZGVyID0gYXVkaW9fcmVjb3JkZXJfcG9seWZpbGxfMS5kZWZhdWx0O1xyXG4gICAgfVxyXG4gICAgZ2V0IGlzQnVzeSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1JlY29yZGluZyB8fCB0aGlzLmlzTG9hZGluZztcclxuICAgIH1cclxuICAgIHBsYXlVcmwocywgdXJsKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IG5ldyBEb3ROZXRTdWJqZWN0XzEuRG90TmV0U3ViamVjdChzKTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQgPSBuZXcgQXVkaW8odXJsKTtcclxuICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5vbmxvYWRlZGRhdGEgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYXVkaW9FbGVtZW50Lm9uZW5kZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheSBlbmRcIiwgdXJsKTtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3ViamVjdC5uZXh0KCk7XHJcbiAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5vbmVycm9yID0gKGVycikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGxheWluZzogXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKFwiRXJyb3IgcGxheWluZzogXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheVwiLCB1cmwubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5wbGF5KCk7XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XHJcbiAgICB9XHJcbiAgICBzdG9wUGxheWluZygpIHtcclxuICAgICAgICAvLyBUaGVyZSBpcyBubyAnc3RvcCcgbWV0aG9kIGluIHRoZSBBdWRpbyBvYmplY3QsIHNvIHdlIGhhdmUgdG8gZG8gaXQgdGhpcyB3YXlcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdWRpb0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9FbGVtZW50LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvRWxlbWVudC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0VsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic3RvcFBsYXlpbmdcIiwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyA6IFN1YmplY3Q8eyBibG9iOiBCbG9iOyB1cmw6IHN0cmluZyB9PlxyXG4gICAgcmVjb3JkKHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllci5yZWNvcmRpbmdcIik7XHJcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IG5ldyBEb3ROZXRTdWJqZWN0XzEuRG90TmV0U3ViamVjdChzKTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KS50aGVuKHN0cmVhbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGF1ZGlvQml0c1BlclNlY29uZDogNjQwMDAsIG1pbWVUeXBlOiAnYXVkaW8vd2VibScgfTtcclxuICAgICAgICAgICAgbGV0IHJlY29yZGVkQ2h1bmtzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG5ldyB3aW5kb3cuTWVkaWFSZWNvcmRlcihzdHJlYW0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbnN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zdG9wUmVjb3JkaW5nKCksIHRoaXMubWF4UmVjb3JkVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignZGF0YWF2YWlsYWJsZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uZGF0YWF2YWlsYWJsZVwiLCBlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YS5zaXplID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZGVkQ2h1bmtzLnB1c2goZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5hZGRFdmVudExpc3RlbmVyKCdzdG9wJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyOiBzdG9wIHJlY29yZGluZ1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgZ2V0cyBjYWxsZWQgd2hlbiB0aGUgc3RvcFJlY29yZGluZygpIG1ldGhvZCBnZXRzIGNhbGxlZCB3aGljaCBpc1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBzdG9wIGljb24uXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9uc3RvcFwiLCB0aGlzLmlzTG9hZGluZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCgodCkgPT4gdC5zdG9wKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKHJlY29yZGVkQ2h1bmtzLCB7IHR5cGU6IHJlY29yZGVkQ2h1bmtzWzBdLnR5cGUgfSk7XHJcbiAgICAgICAgICAgICAgICBibG9iLmFycmF5QnVmZmVyKCkudGhlbihidWZmZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy51cmxzW3VybF0gPSBibG9iO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc3QgZmIgPSBuZXcgRmlyZWJhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2ZiLnNhdmVCbG9iKCdhYmNkJywgYmxvYik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGJsb2IudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvYjY0OiBidG9hKFN0cmluZy5mcm9tQ2hhckNvZGUoLi4ubmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5zdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzUmVjb3JkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xyXG4gICAgfVxyXG4gICAgc3RvcFJlY29yZGluZygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllci5zdG9wUmVjb3JkaW5nXCIpO1xyXG4gICAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy50aW1lcikge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1lZGlhUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5QbGF5ZXJTZXJ2aWNlID0gUGxheWVyU2VydmljZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGxheWVyLnNlcnZpY2UuanMubWFwIiwiaW1wb3J0IHdhdmVFbmNvZGVyIGZyb20gJy4vd2F2ZS1lbmNvZGVyL2luZGV4LmpzJ1xuXG5sZXQgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0XG5cbmZ1bmN0aW9uIGNyZWF0ZVdvcmtlciAoZm4pIHtcbiAgbGV0IGpzID0gZm5cbiAgICAudG9TdHJpbmcoKVxuICAgIC5yZXBsYWNlKC9eKFxcKFxcKVxccyo9PnxmdW5jdGlvblxccypcXChcXCkpXFxzKnsvLCAnJylcbiAgICAucmVwbGFjZSgvfSQvLCAnJylcbiAgbGV0IGJsb2IgPSBuZXcgQmxvYihbanNdKVxuICByZXR1cm4gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKVxufVxuXG5mdW5jdGlvbiBlcnJvciAobWV0aG9kKSB7XG4gIGxldCBldmVudCA9IG5ldyBFdmVudCgnZXJyb3InKVxuICBldmVudC5kYXRhID0gbmV3IEVycm9yKCdXcm9uZyBzdGF0ZSBmb3IgJyArIG1ldGhvZClcbiAgcmV0dXJuIGV2ZW50XG59XG5cbmxldCBjb250ZXh0LCBwcm9jZXNzb3JcblxuLyoqXG4gKiBBdWRpbyBSZWNvcmRlciB3aXRoIE1lZGlhUmVjb3JkZXIgQVBJLlxuICpcbiAqIEBleGFtcGxlXG4gKiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pLnRoZW4oc3RyZWFtID0+IHtcbiAqICAgbGV0IHJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIoc3RyZWFtKVxuICogfSlcbiAqL1xuY2xhc3MgTWVkaWFSZWNvcmRlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBzdHJlYW0gVGhlIGF1ZGlvIHN0cmVhbSB0byByZWNvcmQuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoc3RyZWFtKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGBNZWRpYVN0cmVhbWAgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAqIEB0eXBlIHtNZWRpYVN0cmVhbX1cbiAgICAgKi9cbiAgICB0aGlzLnN0cmVhbSA9IHN0cmVhbVxuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc3RhdGUgb2YgcmVjb3JkaW5nIHByb2Nlc3MuXG4gICAgICogQHR5cGUge1wiaW5hY3RpdmVcInxcInJlY29yZGluZ1wifFwicGF1c2VkXCJ9XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZSA9ICdpbmFjdGl2ZSdcblxuICAgIHRoaXMuZW0gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICB0aGlzLmVuY29kZXIgPSBjcmVhdGVXb3JrZXIoTWVkaWFSZWNvcmRlci5lbmNvZGVyKVxuXG4gICAgbGV0IHJlY29yZGVyID0gdGhpc1xuICAgIHRoaXMuZW5jb2Rlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZSA9PiB7XG4gICAgICBsZXQgZXZlbnQgPSBuZXcgRXZlbnQoJ2RhdGFhdmFpbGFibGUnKVxuICAgICAgZXZlbnQuZGF0YSA9IG5ldyBCbG9iKFtlLmRhdGFdLCB7IHR5cGU6IHJlY29yZGVyLm1pbWVUeXBlIH0pXG4gICAgICByZWNvcmRlci5lbS5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICAgICAgaWYgKHJlY29yZGVyLnN0YXRlID09PSAnaW5hY3RpdmUnKSB7XG4gICAgICAgIHJlY29yZGVyLmVtLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzdG9wJykpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBCZWdpbnMgcmVjb3JkaW5nIG1lZGlhLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVzbGljZV0gVGhlIG1pbGxpc2Vjb25kcyB0byByZWNvcmQgaW50byBlYWNoIGBCbG9iYC5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIHRoaXMgcGFyYW1ldGVyIGlzbuKAmXQgaW5jbHVkZWQsIHNpbmdsZSBgQmxvYmBcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGwgYmUgcmVjb3JkZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcmVjb3JkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgKiAgIHJlY29yZGVyLnN0YXJ0KClcbiAgICogfSlcbiAgICovXG4gIHN0YXJ0ICh0aW1lc2xpY2UpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ2luYWN0aXZlJykge1xuICAgICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChlcnJvcignc3RhcnQnKSlcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0gJ3JlY29yZGluZydcblxuICAgIGlmICghY29udGV4dCkge1xuICAgICAgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKVxuICAgIH1cbiAgICB0aGlzLmNsb25lID0gdGhpcy5zdHJlYW0uY2xvbmUoKVxuICAgIHRoaXMuaW5wdXQgPSBjb250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHRoaXMuY2xvbmUpXG5cbiAgICBpZiAoIXByb2Nlc3Nvcikge1xuICAgICAgcHJvY2Vzc29yID0gY29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoMjA0OCwgMSwgMSlcbiAgICB9XG5cbiAgICBsZXQgcmVjb3JkZXIgPSB0aGlzXG5cbiAgICByZWNvcmRlci5lbmNvZGVyLnBvc3RNZXNzYWdlKFsnaW5pdCcsIGNvbnRleHQuc2FtcGxlUmF0ZV0pXG5cbiAgICBwcm9jZXNzb3Iub25hdWRpb3Byb2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKHJlY29yZGVyLnN0YXRlID09PSAncmVjb3JkaW5nJykge1xuICAgICAgICByZWNvcmRlci5lbmNvZGVyLnBvc3RNZXNzYWdlKFtcbiAgICAgICAgICAnZW5jb2RlJyxcbiAgICAgICAgICBlLmlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKDApXG4gICAgICAgIF0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pbnB1dC5jb25uZWN0KHByb2Nlc3NvcilcbiAgICBwcm9jZXNzb3IuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKVxuXG4gICAgdGhpcy5lbS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnc3RhcnQnKSlcblxuICAgIGlmICh0aW1lc2xpY2UpIHtcbiAgICAgIHRoaXMuc2xpY2luZyA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHJlY29yZGVyLnN0YXRlID09PSAncmVjb3JkaW5nJykgcmVjb3JkZXIucmVxdWVzdERhdGEoKVxuICAgICAgfSwgdGltZXNsaWNlKVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIG1lZGlhIGNhcHR1cmUgYW5kIHJhaXNlIGBkYXRhYXZhaWxhYmxlYCBldmVudCB3aXRoIHJlY29yZGVkIGRhdGEuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogZmluaXNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgKiAgIHJlY29yZGVyLnN0b3AoKVxuICAgKiB9KVxuICAgKi9cbiAgc3RvcCAoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdpbmFjdGl2ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQoZXJyb3IoJ3N0b3AnKSlcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3REYXRhKClcbiAgICB0aGlzLnN0YXRlID0gJ2luYWN0aXZlJ1xuICAgIHRoaXMuY2xvbmUuZ2V0VHJhY2tzKCkuZm9yRWFjaCh0cmFjayA9PiB7XG4gICAgICB0cmFjay5zdG9wKClcbiAgICB9KVxuICAgIHRoaXMuaW5wdXQuZGlzY29ubmVjdCgpXG4gICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwodGhpcy5zbGljaW5nKVxuICB9XG5cbiAgLyoqXG4gICAqIFBhdXNlcyByZWNvcmRpbmcgb2YgbWVkaWEgc3RyZWFtcy5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwYXVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICogICByZWNvcmRlci5wYXVzZSgpXG4gICAqIH0pXG4gICAqL1xuICBwYXVzZSAoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgIT09ICdyZWNvcmRpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdwYXVzZScpKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSAncGF1c2VkJ1xuICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdwYXVzZScpKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc3VtZXMgbWVkaWEgcmVjb3JkaW5nIHdoZW4gaXQgaGFzIGJlZW4gcHJldmlvdXNseSBwYXVzZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcmVzdW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgKiAgIHJlY29yZGVyLnJlc3VtZSgpXG4gICAqIH0pXG4gICAqL1xuICByZXN1bWUgKCkge1xuICAgIGlmICh0aGlzLnN0YXRlICE9PSAncGF1c2VkJykge1xuICAgICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChlcnJvcigncmVzdW1lJykpXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9ICdyZWNvcmRpbmcnXG4gICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc3VtZScpKVxuICB9XG5cbiAgLyoqXG4gICAqIFJhaXNlIGEgYGRhdGFhdmFpbGFibGVgIGV2ZW50IGNvbnRhaW5pbmcgdGhlIGNhcHR1cmVkIG1lZGlhLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHRoaXMub24oJ25leHREYXRhJywgKCkgPT4ge1xuICAgKiAgIHJlY29yZGVyLnJlcXVlc3REYXRhKClcbiAgICogfSlcbiAgICovXG4gIHJlcXVlc3REYXRhICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2luYWN0aXZlJykge1xuICAgICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChlcnJvcigncmVxdWVzdERhdGEnKSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbmNvZGVyLnBvc3RNZXNzYWdlKFsnZHVtcCcsIGNvbnRleHQuc2FtcGxlUmF0ZV0pXG4gIH1cblxuICAvKipcbiAgICogQWRkIGxpc3RlbmVyIGZvciBzcGVjaWZpZWQgZXZlbnQgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtcInN0YXJ0XCJ8XCJzdG9wXCJ8XCJwYXVzZVwifFwicmVzdW1lXCJ8XCJkYXRhYXZhaWxhYmxlXCJ8XCJlcnJvclwifVxuICAgKiB0eXBlIEV2ZW50IHR5cGUuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByZWNvcmRlci5hZGRFdmVudExpc3RlbmVyKCdkYXRhYXZhaWxhYmxlJywgZSA9PiB7XG4gICAqICAgYXVkaW8uc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChlLmRhdGEpXG4gICAqIH0pXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyICguLi5hcmdzKSB7XG4gICAgdGhpcy5lbS5hZGRFdmVudExpc3RlbmVyKC4uLmFyZ3MpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1wic3RhcnRcInxcInN0b3BcInxcInBhdXNlXCJ8XCJyZXN1bWVcInxcImRhdGFhdmFpbGFibGVcInxcImVycm9yXCJ9XG4gICAqIHR5cGUgRXZlbnQgdHlwZS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgVGhlIHNhbWUgZnVuY3Rpb24gdXNlZCBpbiBgYWRkRXZlbnRMaXN0ZW5lcmAuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIgKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoLi4uYXJncylcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gSXMgZXZlbnQgd2FzIG5vIGNhbmNlbGVkIGJ5IGFueSBsaXN0ZW5lci5cbiAgICovXG4gIGRpc3BhdGNoRXZlbnQgKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmVtLmRpc3BhdGNoRXZlbnQoLi4uYXJncylcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBNSU1FIHR5cGUgdGhhdCBpcyBiZWluZyB1c2VkIGZvciByZWNvcmRpbmcuXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5NZWRpYVJlY29yZGVyLnByb3RvdHlwZS5taW1lVHlwZSA9ICdhdWRpby93YXYnXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIE1JTUUgdHlwZSBzcGVjaWZpZWQgaXMgb25lIHRoZSBwb2x5ZmlsbCBjYW4gcmVjb3JkLlxuICpcbiAqIFRoaXMgcG9seWZpbGwgc3VwcG9ydHMgYGF1ZGlvL3dhdmAgYW5kIGBhdWRpby9tcGVnYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWltZVR5cGUgVGhlIG1pbWVUeXBlIHRvIGNoZWNrLlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGB0cnVlYCBvbiBgYXVkaW8vd2F2YCBhbmQgYGF1ZGlvL21wZWdgIE1JTUUgdHlwZS5cbiAqL1xuTWVkaWFSZWNvcmRlci5pc1R5cGVTdXBwb3J0ZWQgPSBtaW1lVHlwZSA9PiB7XG4gIHJldHVybiBNZWRpYVJlY29yZGVyLnByb3RvdHlwZS5taW1lVHlwZSA9PT0gbWltZVR5cGVcbn1cblxuLyoqXG4gKiBgdHJ1ZWAgaWYgTWVkaWFSZWNvcmRlciBjYW4gbm90IGJlIHBvbHlmaWxsZWQgaW4gdGhlIGN1cnJlbnQgYnJvd3Nlci5cbiAqIEB0eXBlIHtib29sZWFufVxuICpcbiAqIEBleGFtcGxlXG4gKiBpZiAoTWVkaWFSZWNvcmRlci5ub3RTdXBwb3J0ZWQpIHtcbiAqICAgc2hvd1dhcm5pbmcoJ0F1ZGlvIHJlY29yZGluZyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gKiB9XG4gKi9cbk1lZGlhUmVjb3JkZXIubm90U3VwcG9ydGVkID0gIW5hdmlnYXRvci5tZWRpYURldmljZXMgfHwgIUF1ZGlvQ29udGV4dFxuXG4vKipcbiAqIENvbnZlcnRzIFJBVyBhdWRpbyBidWZmZXIgdG8gY29tcHJlc3NlZCBhdWRpbyBmaWxlcy5cbiAqIEl0IHdpbGwgYmUgbG9hZGVkIHRvIFdlYiBXb3JrZXIuXG4gKiBCeSBkZWZhdWx0LCBXQVZFIGVuY29kZXIgd2lsbCBiZSB1c2VkLlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICpcbiAqIEBleGFtcGxlXG4gKiBNZWRpYVJlY29yZGVyLnByb3RvdHlwZS5taW1lVHlwZSA9ICdhdWRpby9vZ2cnXG4gKiBNZWRpYVJlY29yZGVyLmVuY29kZXIgPSBvZ2dFbmNvZGVyXG4gKi9cbk1lZGlhUmVjb3JkZXIuZW5jb2RlciA9IHdhdmVFbmNvZGVyXG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhUmVjb3JkZXJcbiIsIi8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9jaHJpcy1ydWRtaW4vUmVjb3JkZXJqc1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGxldCBCWVRFU19QRVJfU0FNUExFID0gMlxuXG4gIGxldCByZWNvcmRlZCA9IFtdXG5cbiAgZnVuY3Rpb24gZW5jb2RlIChidWZmZXIpIHtcbiAgICBsZXQgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aFxuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoICogQllURVNfUEVSX1NBTVBMRSlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgaW5kZXggPSBpICogQllURVNfUEVSX1NBTVBMRVxuICAgICAgbGV0IHNhbXBsZSA9IGJ1ZmZlcltpXVxuICAgICAgaWYgKHNhbXBsZSA+IDEpIHtcbiAgICAgICAgc2FtcGxlID0gMVxuICAgICAgfSBlbHNlIGlmIChzYW1wbGUgPCAtMSkge1xuICAgICAgICBzYW1wbGUgPSAtMVxuICAgICAgfVxuICAgICAgc2FtcGxlID0gc2FtcGxlICogMzI3NjhcbiAgICAgIGRhdGFbaW5kZXhdID0gc2FtcGxlXG4gICAgICBkYXRhW2luZGV4ICsgMV0gPSBzYW1wbGUgPj4gOFxuICAgIH1cbiAgICByZWNvcmRlZC5wdXNoKGRhdGEpXG4gIH1cblxuICBmdW5jdGlvbiBkdW1wIChzYW1wbGVSYXRlKSB7XG4gICAgbGV0IGJ1ZmZlckxlbmd0aCA9IHJlY29yZGVkLmxlbmd0aCA/IHJlY29yZGVkWzBdLmxlbmd0aCA6IDBcbiAgICBsZXQgbGVuZ3RoID0gcmVjb3JkZWQubGVuZ3RoICogYnVmZmVyTGVuZ3RoXG4gICAgbGV0IHdhdiA9IG5ldyBVaW50OEFycmF5KDQ0ICsgbGVuZ3RoKVxuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KHdhdi5idWZmZXIpXG5cbiAgICAvLyBSSUZGIGlkZW50aWZpZXIgJ1JJRkYnXG4gICAgdmlldy5zZXRVaW50MzIoMCwgMTM4MDUzMzgzMCwgZmFsc2UpXG4gICAgLy8gZmlsZSBsZW5ndGggbWludXMgUklGRiBpZGVudGlmaWVyIGxlbmd0aCBhbmQgZmlsZSBkZXNjcmlwdGlvbiBsZW5ndGhcbiAgICB2aWV3LnNldFVpbnQzMig0LCAzNiArIGxlbmd0aCwgdHJ1ZSlcbiAgICAvLyBSSUZGIHR5cGUgJ1dBVkUnXG4gICAgdmlldy5zZXRVaW50MzIoOCwgMTQ2Mzg5OTcxNywgZmFsc2UpXG4gICAgLy8gZm9ybWF0IGNodW5rIGlkZW50aWZpZXIgJ2ZtdCAnXG4gICAgdmlldy5zZXRVaW50MzIoMTIsIDE3MTg0NDkxODQsIGZhbHNlKVxuICAgIC8vIGZvcm1hdCBjaHVuayBsZW5ndGhcbiAgICB2aWV3LnNldFVpbnQzMigxNiwgMTYsIHRydWUpXG4gICAgLy8gc2FtcGxlIGZvcm1hdCAocmF3KVxuICAgIHZpZXcuc2V0VWludDE2KDIwLCAxLCB0cnVlKVxuICAgIC8vIGNoYW5uZWwgY291bnRcbiAgICB2aWV3LnNldFVpbnQxNigyMiwgMSwgdHJ1ZSlcbiAgICAvLyBzYW1wbGUgcmF0ZVxuICAgIHZpZXcuc2V0VWludDMyKDI0LCBzYW1wbGVSYXRlLCB0cnVlKVxuICAgIC8vIGJ5dGUgcmF0ZSAoc2FtcGxlIHJhdGUgKiBibG9jayBhbGlnbilcbiAgICB2aWV3LnNldFVpbnQzMigyOCwgc2FtcGxlUmF0ZSAqIEJZVEVTX1BFUl9TQU1QTEUsIHRydWUpXG4gICAgLy8gYmxvY2sgYWxpZ24gKGNoYW5uZWwgY291bnQgKiBieXRlcyBwZXIgc2FtcGxlKVxuICAgIHZpZXcuc2V0VWludDE2KDMyLCBCWVRFU19QRVJfU0FNUExFLCB0cnVlKVxuICAgIC8vIGJpdHMgcGVyIHNhbXBsZVxuICAgIHZpZXcuc2V0VWludDE2KDM0LCA4ICogQllURVNfUEVSX1NBTVBMRSwgdHJ1ZSlcbiAgICAvLyBkYXRhIGNodW5rIGlkZW50aWZpZXIgJ2RhdGEnXG4gICAgdmlldy5zZXRVaW50MzIoMzYsIDE2ODQxMDgzODUsIGZhbHNlKVxuICAgIC8vIGRhdGEgY2h1bmsgbGVuZ3RoXG4gICAgdmlldy5zZXRVaW50MzIoNDAsIGxlbmd0aCwgdHJ1ZSlcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL25vLWZvci1sb29wXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWNvcmRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgd2F2LnNldChyZWNvcmRlZFtpXSwgaSAqIGJ1ZmZlckxlbmd0aCArIDQ0KVxuICAgIH1cblxuICAgIHJlY29yZGVkID0gW11cbiAgICBwb3N0TWVzc2FnZSh3YXYuYnVmZmVyLCBbd2F2LmJ1ZmZlcl0pXG4gIH1cblxuICBvbm1lc3NhZ2UgPSBlID0+IHtcbiAgICBpZiAoZS5kYXRhWzBdID09PSAnZW5jb2RlJykge1xuICAgICAgZW5jb2RlKGUuZGF0YVsxXSlcbiAgICB9IGVsc2UgaWYgKGUuZGF0YVswXSA9PT0gJ2R1bXAnKSB7XG4gICAgICBkdW1wKGUuZGF0YVsxXSlcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRoaXMgZmlsZSBpcyBub3Qgc2F2ZWQgaW4gR2l0SHViIHNvIHRoYXQgaXQgd2lsbCBub3QgYmUgcHVibGljYWxseSB2aXNpYmxlXHJcblxyXG4vLyBCbGF6b3JBcHAxIGRhdGFiYXNlXHJcbndpbmRvdy5maXJlYmFzZUNvbmZpZyA9IHtcclxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFwaUtleTogXCJBSXphU3lDM1kzUWM1aFhGaUl5TDVoS2czV0RLdV9XQWVSN0R1cHdcIixcclxuICAgICAgYXV0aERvbWFpbjogXCJibGF6b3JhcHAxLTUwYzUzLmZpcmViYXNlYXBwLmNvbVwiLFxyXG4gICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2JsYXpvcmFwcDEtNTBjNTMuZmlyZWJhc2Vpby5jb21cIixcclxuICAgICAgcHJvamVjdElkOiBcImJsYXpvcmFwcDEtNTBjNTNcIixcclxuICAgICAgc3RvcmFnZUJ1Y2tldDogXCJibGF6b3JhcHAxLTUwYzUzLmFwcHNwb3QuY29tXCIsXHJcbiAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjc5MDc1NjYzNDg4XCIsXHJcbiAgICAgIGFwcElkOiBcIjE6NzkwNzU2NjM0ODg6d2ViOjczNzYxZDQwNDk0NGU4NzM0MjUwNjVcIlxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGZsYXNoZGV2IGRhdGFiYXNlXHJcbi8vd2luZG93LmZpcmViYXNlQ29uZmlnID0ge1xyXG4vLyAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgIHJldHVybiB7XHJcbi8vICAgICAgYXBpS2V5OiBcIkFJemFTeUJMSEZmV1c0bllMY3NNRGhxdW5GY25zdXJ6MFNjUnhma1wiLFxyXG4vLyAgICAgIGF1dGhEb21haW46IFwiZmxhc2hkZXYtNjkzOTkuZmlyZWJhc2VhcHAuY29tXCIsXHJcbi8vICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9mbGFzaGRldi02OTM5OS5maXJlYmFzZWlvLmNvbVwiLFxyXG4vLyAgICAgIHByb2plY3RJZDogXCJmbGFzaGRldi02OTM5OVwiLFxyXG4vLyAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiZmxhc2hkZXYtNjkzOTkuYXBwc3BvdC5jb21cIixcclxuLy8gICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIyOTc4MjUyNzAxMzhcIixcclxuLy8gICAgICBhcHBJZDogXCIxOjc5MDc1NjYzNDg4OndlYjo3Mzc2MWQ0MDQ5NDRlODczNDI1MDY1XCJcclxuLy8gICAgfTtcclxuLy8gIH1cclxuLy99XHJcblxyXG5cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VjcmV0LmpzLm1hcCIsIu+7v1xyXG53aW5kb3cuZmxhc2ggPSB7XHJcbiAgLy8gTWF0SWNvbkJ1dHRvbiB2aXN1YWwgZmVlZGJhY2sgZG9lc24ndCByZXR1cm4gdG8gYSBub3JtYWwgc3R5bGUsIHNvIHRoaXMgZml4ZXMgdGhlIHByb2JsZW0uIFxyXG4gIGxvc2VGb2N1czogKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8gU2lnbiBpbiB1c2luZyB0aGUgRmlyZWJhc2VVSSB3aWRnZXQgYW5kIHJldHVybiB0aGUgdXNlcidzIGlkLlxyXG4gIGZpcmViYXNlTG9naW46IChzdWJqZWN0KSA9PiB7XHJcbiAgICBpZiAoIWZsYXNoLmZiQXBwKSB7XHJcbiAgICAgIGZsYXNoLmZiQXBwID0gZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh3aW5kb3cuZmlyZWJhc2VDb25maWcuZ2V0KCkpO1xyXG4gICAgICBmbGFzaC5mYlVpID0gbmV3IGZpcmViYXNldWkuYXV0aC5BdXRoVUkoZmlyZWJhc2UuYXV0aCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBmbGFzaC5mYlVpLnN0YXJ0KCcjZmlyZWJhc2V1aS1hdXRoLWNvbnRhaW5lcicsIHtcclxuICAgICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgc2lnbkluU3VjY2Vzc1dpdGhBdXRoUmVzdWx0OiBmdW5jdGlvbiAoYXV0aFJlc3VsdCwgcmVkaXJlY3RVcmwpIHtcclxuICAgICAgICAgIC8vIFVzZXIgc3VjY2Vzc2Z1bGx5IHNpZ25lZCBpbi4gTm90aWZ5IHRoZSBCbGF6b3IgY29kZS5cclxuICAgICAgICAgIHN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ09uTmV4dCcsIEpTT04uc3RyaW5naWZ5KGF1dGhSZXN1bHQudXNlcikpO1xyXG4gICAgICAgICAgc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25Db21wbGV0ZWQnKTtcclxuXHJcbiAgICAgICAgICAvLyBSZXR1cm4gZmFsc2UgYW5kIGxldCB0aGUgQmxhem9yIGNvZGUgdGFrZSBjYXJlIG9mIHRoZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgc2lnbkluT3B0aW9uczogW1xyXG4gICAgICAgICAgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIuUFJPVklERVJfSUQsXHJcbiAgICAgICAgICBmaXJlYmFzZS5hdXRoLkVtYWlsQXV0aFByb3ZpZGVyLlBST1ZJREVSX0lEXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBmaXJlYmFzZUxvZ291dDogKHN1YmplY3QpID0+IHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgIC8vZmxhc2guZmJBcHAgPSB1bmRlZmluZWQ7XHJcbiAgICAgIC8vZmxhc2guZmJVaSA9IHVuZGVmaW5lZDtcclxuICAgICAgc3ViamVjdC5pbnZva2VNZXRob2RBc3luYygnT25OZXh0JywgbnVsbCk7XHJcbiAgICAgIHN1YmplY3QuaW52b2tlTWV0aG9kQXN5bmMoJ09uQ29tcGxldGVkJyk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICByZWxvYWQ6ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwicmVsb2FkXCIpO1xyXG4gICAgbG9jYXRpb24uaHJlZiA9ICcvJztcclxuICB9LFxyXG5cclxufVxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9