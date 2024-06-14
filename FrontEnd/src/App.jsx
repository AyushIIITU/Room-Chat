import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import API from './Utils/APIS.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const socket = io(API);

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
      } catch (err) {
        console.log('Error', err.response?.status);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/Login');
        }
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', message);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
