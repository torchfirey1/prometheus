const firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyBTCnaYJQ6jPmJbfNgAh319Fh0pwtrU3TE",
    authDomain: "prometheusdb.firebaseapp.com",
    projectId: "prometheusdb",
    storageBucket: "prometheusdb.appspot.com",
    messagingSenderId: "134166365408",
    appId: "1:134166365408:web:b426edfc02a3e2c4e8bc85",
    measurementId: "G-1WJH17CFTR"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;