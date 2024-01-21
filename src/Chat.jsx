import React, { useState, useEffect } from 'react';
import './Chat.css';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  Mic,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { useStateValue } from './StateProvider';

import {
  getFirestore,
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setSeed(roomId);
    if (roomId) {
      const roomDocRef = doc(db, 'rooms', roomId);
      const messagesQuery = query(
        collection(roomDocRef, 'messages'),
        orderBy('timestamp', 'asc')
      );

      const unsubscribeRoom = onSnapshot(roomDocRef, (snapshot) => {
        if (snapshot.exists()) {
          setRoomName(snapshot.data().name);
        } else {
          // Room bulunamadı ya da silindi
          // SetRoomName fonksiyonunu uygun bir şekilde ele alabilirsiniz.
        }
      });

      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );

      return () => {
        unsubscribeRoom();
        unsubscribeMessages();
      };
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (roomId && input.trim() !== '') {
      const roomDocRef = doc(db, 'rooms', roomId);
      const messagesCollectionRef = collection(roomDocRef, 'messages');

      await addDoc(messagesCollectionRef, {
        name: user.displayName,
        message: input,
        timestamp: serverTimestamp(),
      });

      setInput('');
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Son görülme
            {' ' +
              new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toLocaleString('tr', { timeZone: 'Europe/Istanbul' })}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && 'chat__receiver'
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleString('tr', {
                timeZone: 'Europe/Istanbul',
              })}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="Mesaj yaz"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Mesaj gönder
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
