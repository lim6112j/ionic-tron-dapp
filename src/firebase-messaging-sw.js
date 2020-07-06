importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');
firebase.initializeApp({
  'messagingSenderId': '409148924422' 
});
const messaging = firebase.messaging();