import Rebase from 're-base';
import firebase from 'firebase';

// Create firebase app
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDCorbfGQpVgASymZdSFcVMWKjafKJutOM',
  authDomain: 'bullet-app-ericauv.firebaseapp.com',
  databaseURL: 'https://bullet-app-ericauv.firebaseio.com'
});

// Create rebase binding
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
