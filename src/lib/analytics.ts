import firebase from 'firebase';

// https://firebase.google.com/docs/analytics/events?platform=web&hl=ja
export function sendEvent(eventName: string, eventParams = {}) {
  if (process.env.VUE_APP_ENV === 'prod') {
    firebase.analytics().logEvent(eventName, eventParams);
  }
}
