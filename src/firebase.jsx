import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB-4974dgp-ZgCwWxiIB2qxEs4HPRV2REc',
  authDomain: 'whatsapp-clone-c7ed0.firebaseapp.com',
  projectId: 'whatsapp-clone-c7ed0',
  storageBucket: 'whatsapp-clone-c7ed0.appspot.com',
  messagingSenderId: '648530474046',
  appId: '1:648530474046:web:a862292787f4812c11cd6f',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };
