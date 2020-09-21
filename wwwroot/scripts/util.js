
window.flash = {
    makeBlob: function (blobType, data) {
        let arr = Uint8Array.from(data);
        return URL.createObjectURL(new Blob([arr], { type: blobType }));
    },

    nextDate: function (currentIndex, isSuccess) {
        var intervals = new Intervals();
        var result = intervals.next(currentIndex, isSuccess);
        return [result.index, result.date];
    },

    playUrl: function (url) {
        var player = new PlayerService();
        player.playUrl(url);
    }
}

// Compiled the original typescript version and copied it here. In order to use
// a typescript file, a require statement to reference the compiled typescript
// is needed, so would have to install and setup a module loader and and and...
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
        this.oneDayIndex = this.intervals.findIndex(x => x === this.oneDay);
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
            if (currentIndex > this.oneDayIndex) {
                // If the next try is far in the future, go back to one day
                currentIndex = this.oneDayIndex;
            }
            else {
                currentIndex--;
            }
        }
        return { index: currentIndex, date: Date.now() + this.intervals[currentIndex] };
    }
}

class PlayerService {
    constructor() {
        this.isLoading = false;
        this.isPlaying = false;
        this.audioElement = new Audio();
    }
    get isBusy() {
        return this.isPlaying || this.isLoading;
    }
    playUrl(url) {
        this.isLoading = true;
        //const s = new Subject();
        this.audioElement = new Audio(url);
        this.audioElement.onloadeddata = () => {
            this.isLoading = false;
            this.isPlaying = true;
        };
        this.audioElement.onended = () => {
            this.isPlaying = false;
            this.audioElement = null;
        };
        this.audioElement.onerror = (err) => {
            this.isLoading = false;
            console.error("Error playing: " + url);
            //s.error("Error playing: " + url);
            this.isPlaying = false;
            this.audioElement = null;
        };
        // console.log("play", url);
        this.audioElement.play();
        //return s;
    }
}

// Sign in using the FirebaseUI widget and return the user's id.
function firebaseLogin(subject) {
    //var config = {
    //    apiKey: "AIzaSyBLHFfWW4nYLcsMDhqunFcnsurz0ScRxfk",
    //    authDomain: "flashdev-69399.firebaseapp.com",
    //    databaseURL: "https://flashdev-69399.firebaseio.com",
    //    projectId: "flashdev-69399",
    //    storageBucket: "flashdev-69399.appspot.com",
    //    messagingSenderId: "297825270138"
    //};
    firebase.initializeApp(firebaseConfig());

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in. Notify the Blazor code.
                subject.invokeMethodAsync('OnNext',
                    JSON.stringify({ uid: authResult.user.uid }));

                // Return false and let the Blazor code take care of the navigation
                return false;
            },
        },
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    });
};


