import * as firebase from "firebase";
import React, { useState } from 'react';

const config = {
  apiKey: "AIzaSyBw97BBduwdiIA-D4fpI0cVS3MsHWw540s",
  authDomain: "providenceit-16bf0.firebaseapp.com",
  databaseURL: "https://providenceit-16bf0.firebaseio.com",
  projectId: "providenceit-16bf0",
  storageBucket: "providenceit-16bf0.appspot.com",
  messagingSenderId: "774218283259",
  appId: "1:774218283259:web:a4679ca1357752b4ead85e",
  measurementId: "G-JQ3B744V6J"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();