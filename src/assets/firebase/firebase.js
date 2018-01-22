import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBKX3lNTuGmGGBc2kAO1cmKlGWkvLUUXgg',
  authDomain: 'image-map-vuejs.firebaseapp.com',
  databaseURL: 'https://image-map-vuejs.firebaseio.com',
  projectId: 'image-map-vuejs',
  storageBucket: '',
  messagingSenderId: '147602427574'
}

const fb = firebase.initializeApp(config)

export default fb
