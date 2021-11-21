import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAbYAOasM8WUH7q7EwvcE6lWnB1EsPTNgo",
    authDomain: "batata-f6911.firebaseapp.com",
    projectId: "batata-f6911",
    storageBucket: "batata-f6911.appspot.com",
    messagingSenderId: "1097701572624",
    appId: "1:1097701572624:web:a6e97de87c464b03b60a95",
    measurementId: "G-1JV5DJGYM1"
  };
  
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };