import * as firebase from "firebase/app";
import "firebase/firebase-firestore"


const config = {
    apiKey: "AIzaSyAM5yPr3YuhwjJthCFtQs7lkT-3lG4ObXs",
    authDomain: "chatbot-escuyos.firebaseapp.com",
    databaseURL: "https://chatbot-escuyos.firebaseio.com",
    projectId: "chatbot-escuyos",
    storageBucket: "chatbot-escuyos.appspot.com",
    messagingSenderId: "150542780231",
    appId: "1:150542780231:web:66a9b2e0aee7528a"
};

firebase.initializeApp(config)

export default firebase;