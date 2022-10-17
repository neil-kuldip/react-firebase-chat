import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZLntCg1pT3qLqRdJ8sRguBNfJLsTICjw",
  authDomain: "superchat-f998e.firebaseapp.com",
  projectId: "superchat-f998e",
  storageBucket: "superchat-f998e.appspot.com",
  messagingSenderId: "157107663270",
  appId: "1:157107663270:web:da38822689256dc9895f67",
  measurementId: "G-YL1B7L87L7"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = getAnalytics(app);

function App() {

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? <ChatRoom/> : <SignIn/>}
        </section>
      </header>
    </div>
  );
}

export default App;
