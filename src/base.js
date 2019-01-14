import Rebase from 're-base';
import firebase from 'firebase';

// Create firebase app
const firebaseApp = firebase.initializeApp({

});

// Create rebase binding
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
