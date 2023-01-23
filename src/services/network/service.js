import { initializeApp } from "firebase/app"
import { getDatabase, onValue, orderByChild, ref, set as _set, update as _update} from "firebase/database"

var serviceAccount = {
  "apiKey": process.env.REACT_APP_API_KEY,
  "authDomain": process.env.REACT_APP_AUTH_DOMAIN,
  "databaseURL": process.env.REACT_APP_DATABASE_URL,
  "projectId": process.env.REACT_APP_PROJECT_ID,
  "storageBucket": process.env.REACT_APP_STORAGE_BUCKET,
  "messagingSenderId": process.env.REACT_APP_MESSAGING_SENDER_ID,
  "appId": process.env.REACT_APP_APP_ID,
  "measurementId": process.env.REACT_APP_MEASUREMENT_ID
};

const firebase = initializeApp(serviceAccount);
const db = getDatabase(firebase)

export const get = (table, callback) => {
  const query = ref(db, table);
  try {
    onValue(query, (snapshot) => {
      const data = snapshot.val()
      if(snapshot.exists()) {
        callback(data);
      } else {
        callback(null);
      }
    })
  } catch (ex) {
    callback(null);
  }
  
}

export const set = (table, data, callback) => {
  try {
    _set(ref(db, table), data).then(() => {
      callback(true)
    })
    .catch((error) => {
      callback(false)
    });
  } catch (ex) {
    callback(null);
  }
}

export const update = (table, data, callback) => {
  try {
    _update(ref(db, table), data).then(() => {
      callback(true)
    })
    .catch((error) => {
      callback(false)
    });
  } catch (ex) {
    callback(null);
  }
}