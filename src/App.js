import React, { useRef, useState } from 'react';
import './App.css';
// import {app, auth, firestore, analytics, useAuthState, useCollectionData} from './auth/Auth';
// import ChatRoom from './components/ChatRoom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBZLntCg1pT3qLqRdJ8sRguBNfJLsTICjw",
  authDomain: "superchat-f998e.firebaseapp.com",
  projectId: "superchat-f998e",
  storageBucket: "superchat-f998e.appspot.com",
  messagingSenderId: "157107663270",
  appId: "1:157107663270:web:da38822689256dc9895f67",
  measurementId: "G-YL1B7L87L7"
});
const auth = firebase.auth();
const firestore = firebase.firestore();

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button onClick={signInWithGoogle}>Sign In</button>
  );
};

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
};

const ChatRoom = () => {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(25);

  const [messages] = useCollectionData(query, {idField : 'id'});
  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        <div ref={dummy}>

        </div>
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type='submit'>🕊️</button>
      </form>
    </>
  );
};

const ChatMessage = (props) => {
  const {text, uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
};

const App = () => {

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? <> <ChatRoom/> </>: <SignIn/>}
        </section>
      </header>
    </div>
  );
}

export default App;
