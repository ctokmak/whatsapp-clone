import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import Avatar from '@mui/material/Avatar';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    setSeed(id);
  }, []);

  const createChat = () => {
    const roomName = prompt('Sohbet odası için bir isim girin');

    if (roomName) {
      addDoc(collection(db, 'rooms'), {
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Son mesaj...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Yeni sohbet ekle</h2>
    </div>
  );
}

export default SidebarChat;
