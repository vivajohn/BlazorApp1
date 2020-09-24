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
/******/ 	return __webpack_require__(__webpack_require__.s = "./typescript/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./typescript/intervals.ts":
/*!*********************************!*\
  !*** ./typescript/intervals.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Intervals = void 0;
// Manages the spaced repetition values: changes the next playback time as appropriate
class Intervals {
    constructor() {
        this.oneMinute = 60 * 1000;
        this.oneHour = 60 * this.oneMinute;
        this.oneDay = 24 * this.oneHour;
        this.intervals = [
            // Pimsleur's intervals:
            // 5 seconds, 25 seconds, 2 minutes, 10 minutes, 1 hour, 5 hours, 1 day, 5 days, 25 days, 4 months, 2 years
            // The first two are not realistic in this context, so they are modified. The last two don't give much
            // practice, so they are changed. '2 days' also added to give more practice.
            30 * 1000,
            this.oneMinute,
            2 * this.oneMinute,
            10 * this.oneMinute,
            this.oneHour,
            5 * this.oneHour,
            this.oneDay,
            2 * this.oneDay,
            5 * this.oneDay,
            25 * this.oneDay,
            60 * this.oneDay,
            120 * this.oneDay,
            180 * this.oneDay
        ];
        this.maxIndex = this.intervals.length - 1;
        this.fiveHourInterval = this.intervals.findIndex(x => x === this.oneHour * 5);
        this.oneDayInterval = this.intervals.findIndex(x => x === this.oneDay);
    }
    // Get the next intervals index and date depending on whether the user
    // successfully answered the prompt or not.
    next(currentIndex, success) {
        return success ? this.setSuccess(currentIndex) : this.setFailure(currentIndex);
    }
    setSuccess(currentIndex) {
        if (currentIndex < this.maxIndex)
            currentIndex++;
        return { index: currentIndex, date: Date.now() + this.intervals[currentIndex] };
    }
    setFailure(currentIndex) {
        if (currentIndex > 0) {
            if (currentIndex > this.oneDayInterval) {
                // If the next try is far in the future, go back to one day
                currentIndex = this.oneDayInterval;
            }
            else {
                currentIndex--;
            }
        }
        return { index: currentIndex, date: Date.now() + this.intervals[currentIndex] };
    }
}
exports.Intervals = Intervals;


/***/ }),

/***/ "./typescript/main.ts":
/*!****************************!*\
  !*** ./typescript/main.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Main file for using Typescript in this project
// All relevant files are imported here and eventually compiled to wwwroot/scripts/main.js
Object.defineProperty(exports, "__esModule", { value: true });
const intervals_1 = __webpack_require__(/*! ./intervals */ "./typescript/intervals.ts");
window['Intervals'] = new intervals_1.Intervals();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vdHlwZXNjcmlwdC9pbnRlcnZhbHMudHMiLCJ3ZWJwYWNrOi8vLy4vdHlwZXNjcmlwdC9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsc0ZBQXNGO0FBQ3RGLE1BQWEsU0FBUztJQUF0QjtRQUNFLGNBQVMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLFlBQU8sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM5QixXQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsY0FBUyxHQUFHO1lBQ1Isd0JBQXdCO1lBQ3hCLDJHQUEyRztZQUMzRyxzR0FBc0c7WUFDdEcsNEVBQTRFO1lBQzVFLEVBQUUsR0FBRyxJQUFJO1lBQ1QsSUFBSSxDQUFDLFNBQVM7WUFDZCxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVM7WUFDbEIsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTO1lBQ25CLElBQUksQ0FBQyxPQUFPO1lBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPO1lBQ2hCLElBQUksQ0FBQyxNQUFNO1lBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNO1lBQ2YsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNO1lBQ2YsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNO1lBQ2hCLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUNoQixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU07WUFDakIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7UUFDRixhQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLHFCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekUsbUJBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUF3QnBFLENBQUM7SUF0QkMsc0VBQXNFO0lBQ3RFLDJDQUEyQztJQUMzQyxJQUFJLENBQUMsWUFBb0IsRUFBRSxPQUFnQjtRQUN6QyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRU8sVUFBVSxDQUFDLFlBQW9CO1FBQ3JDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRO1lBQUUsWUFBWSxFQUFFLENBQUM7UUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7SUFDbEYsQ0FBQztJQUVPLFVBQVUsQ0FBQyxZQUFvQjtRQUNyQyxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDdEMsMkRBQTJEO2dCQUMzRCxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxZQUFZLEVBQUUsQ0FBQzthQUNoQjtTQUNGO1FBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7SUFDbEYsQ0FBQztDQUNGO0FBakRELDhCQWlEQzs7Ozs7Ozs7Ozs7Ozs7QUNsREQsaURBQWlEO0FBQ2pELDBGQUEwRjs7QUFFMUYsd0ZBQXVDO0FBRXZDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi90eXBlc2NyaXB0L21haW4udHNcIik7XG4iLCIvLyBNYW5hZ2VzIHRoZSBzcGFjZWQgcmVwZXRpdGlvbiB2YWx1ZXM6IGNoYW5nZXMgdGhlIG5leHQgcGxheWJhY2sgdGltZSBhcyBhcHByb3ByaWF0ZVxyXG5leHBvcnQgY2xhc3MgSW50ZXJ2YWxzIHtcclxuICBvbmVNaW51dGUgPSA2MCAqIDEwMDA7XHJcbiAgb25lSG91ciA9IDYwICogdGhpcy5vbmVNaW51dGU7XHJcbiAgb25lRGF5ID0gMjQgKiB0aGlzLm9uZUhvdXI7XHJcbiAgaW50ZXJ2YWxzID0gW1xyXG4gICAgICAvLyBQaW1zbGV1cidzIGludGVydmFsczpcclxuICAgICAgLy8gNSBzZWNvbmRzLCAyNSBzZWNvbmRzLCAyIG1pbnV0ZXMsIDEwIG1pbnV0ZXMsIDEgaG91ciwgNSBob3VycywgMSBkYXksIDUgZGF5cywgMjUgZGF5cywgNCBtb250aHMsIDIgeWVhcnNcclxuICAgICAgLy8gVGhlIGZpcnN0IHR3byBhcmUgbm90IHJlYWxpc3RpYyBpbiB0aGlzIGNvbnRleHQsIHNvIHRoZXkgYXJlIG1vZGlmaWVkLiBUaGUgbGFzdCB0d28gZG9uJ3QgZ2l2ZSBtdWNoXHJcbiAgICAgIC8vIHByYWN0aWNlLCBzbyB0aGV5IGFyZSBjaGFuZ2VkLiAnMiBkYXlzJyBhbHNvIGFkZGVkIHRvIGdpdmUgbW9yZSBwcmFjdGljZS5cclxuICAgICAgMzAgKiAxMDAwLFxyXG4gICAgICB0aGlzLm9uZU1pbnV0ZSxcclxuICAgICAgMiAqIHRoaXMub25lTWludXRlLFxyXG4gICAgICAxMCAqIHRoaXMub25lTWludXRlLFxyXG4gICAgICB0aGlzLm9uZUhvdXIsXHJcbiAgICAgIDUgKiB0aGlzLm9uZUhvdXIsXHJcbiAgICAgIHRoaXMub25lRGF5LFxyXG4gICAgICAyICogdGhpcy5vbmVEYXksXHJcbiAgICAgIDUgKiB0aGlzLm9uZURheSxcclxuICAgICAgMjUgKiB0aGlzLm9uZURheSxcclxuICAgICAgNjAgKiB0aGlzLm9uZURheSxcclxuICAgICAgMTIwICogdGhpcy5vbmVEYXksXHJcbiAgICAgIDE4MCAqIHRoaXMub25lRGF5XHJcbiAgXTtcclxuICBtYXhJbmRleCA9IHRoaXMuaW50ZXJ2YWxzLmxlbmd0aCAtIDE7XHJcbiAgZml2ZUhvdXJJbnRlcnZhbCA9IHRoaXMuaW50ZXJ2YWxzLmZpbmRJbmRleCh4ID0+IHggPT09IHRoaXMub25lSG91ciAqIDUpO1xyXG4gIG9uZURheUludGVydmFsID0gdGhpcy5pbnRlcnZhbHMuZmluZEluZGV4KHggPT4geCA9PT0gdGhpcy5vbmVEYXkpO1xyXG5cclxuICAvLyBHZXQgdGhlIG5leHQgaW50ZXJ2YWxzIGluZGV4IGFuZCBkYXRlIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSB1c2VyXHJcbiAgLy8gc3VjY2Vzc2Z1bGx5IGFuc3dlcmVkIHRoZSBwcm9tcHQgb3Igbm90LlxyXG4gIG5leHQoY3VycmVudEluZGV4OiBudW1iZXIsIHN1Y2Nlc3M6IGJvb2xlYW4pOiB7IGluZGV4OiBudW1iZXIsIGRhdGU6IG51bWJlciB9IHtcclxuICAgIHJldHVybiBzdWNjZXNzID8gdGhpcy5zZXRTdWNjZXNzKGN1cnJlbnRJbmRleCkgOiB0aGlzLnNldEZhaWx1cmUoY3VycmVudEluZGV4KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0U3VjY2VzcyhjdXJyZW50SW5kZXg6IG51bWJlcik6IHsgaW5kZXg6IG51bWJlciwgZGF0ZTogbnVtYmVyIH0ge1xyXG4gICAgaWYgKGN1cnJlbnRJbmRleCA8IHRoaXMubWF4SW5kZXgpIGN1cnJlbnRJbmRleCsrO1xyXG4gICAgcmV0dXJuIHsgaW5kZXg6IGN1cnJlbnRJbmRleCwgZGF0ZTogRGF0ZS5ub3coKSArIHRoaXMuaW50ZXJ2YWxzW2N1cnJlbnRJbmRleF0gfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0RmFpbHVyZShjdXJyZW50SW5kZXg6IG51bWJlcik6IHsgaW5kZXg6IG51bWJlciwgZGF0ZTogbnVtYmVyIH0ge1xyXG4gICAgaWYgKGN1cnJlbnRJbmRleCA+IDApIHtcclxuICAgICAgaWYgKGN1cnJlbnRJbmRleCA+IHRoaXMub25lRGF5SW50ZXJ2YWwpIHtcclxuICAgICAgICAvLyBJZiB0aGUgbmV4dCB0cnkgaXMgZmFyIGluIHRoZSBmdXR1cmUsIGdvIGJhY2sgdG8gb25lIGRheVxyXG4gICAgICAgIGN1cnJlbnRJbmRleCA9IHRoaXMub25lRGF5SW50ZXJ2YWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3VycmVudEluZGV4LS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7IGluZGV4OiBjdXJyZW50SW5kZXgsIGRhdGU6IERhdGUubm93KCkgKyB0aGlzLmludGVydmFsc1tjdXJyZW50SW5kZXhdIH07XHJcbiAgfVxyXG59XHJcbiIsIi8vIE1haW4gZmlsZSBmb3IgdXNpbmcgVHlwZXNjcmlwdCBpbiB0aGlzIHByb2plY3RcclxuLy8gQWxsIHJlbGV2YW50IGZpbGVzIGFyZSBpbXBvcnRlZCBoZXJlIGFuZCBldmVudHVhbGx5IGNvbXBpbGVkIHRvIHd3d3Jvb3Qvc2NyaXB0cy9tYWluLmpzXHJcblxyXG5pbXBvcnQgeyBJbnRlcnZhbHMgfSBmcm9tICcuL2ludGVydmFscydcclxuXHJcbndpbmRvd1snSW50ZXJ2YWxzJ10gPSBuZXcgSW50ZXJ2YWxzKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==