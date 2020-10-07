
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



