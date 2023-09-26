import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'


// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyA7_DcikiXcSMRuqaTmIubno9bj7baU0TA",
    authDomain: "marvel-quiz-12c75.firebaseapp.com",
    projectId: "marvel-quiz-12c75",
    storageBucket: "marvel-quiz-12c75.appspot.com",
    messagingSenderId: "42683572632",
    appId: "1:42683572632:web:298cd0fe3b8e3af46f8bed"
  };

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    // inscription

    signupUser = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

    // connexion
    loginuser = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);

    // Déconnexion
    signoutUser= () => this.auth.signOut();

    // Récupérer le mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email); 

    user = (uid) => this.db.doc(`users/${uid}`);
}


export default Firebase;