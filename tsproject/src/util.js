
window.flash = {
  // MatIconButton visual feedback doesn't return to a normal style, so this fixes the problem. 
  loseFocus: () => {
    console.log("loseFocus");
    document.activeElement.blur();
  },

  // Sign in using the FirebaseUI widget and return the user's id.
  firebaseLogin: (subject) => {
    console.log("firebaseLogin");
    firebase.initializeApp(window.firebaseConfig.get());
    console.log("after firebaseConfig");

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in. Notify the Blazor code.
            subject.invokeMethodAsync('OnNext',
                JSON.stringify({ uid: authResult.user.uid }));
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
  }
}



