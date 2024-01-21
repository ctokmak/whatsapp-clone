import React, { useState, useEffect } from 'react';
import SidebarChat from './SidebarChat';
import './Sidebar.css';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { db } from './firebase';
import { useStateValue } from './StateProvider';

import { collection, onSnapshot } from 'firebase/firestore';

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (result) => {
      setRooms(
        result.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    // useEffect içinde temizleme işlemleri için return kullanabilirsiniz.
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Yeni bir sohbet başlat yada ara" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
