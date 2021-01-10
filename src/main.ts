import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
/* import Firebase */
import firebase from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_GFB_APIKEY,
  authDomain: process.env.VUE_APP_GFB_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_GFB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_GFB_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_GFB_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_GFB_APP_ID,
  measurementId: process.env.VUE_APP_GFB_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
