'use client';

import { EventSource } from 'eventsource';
import { useEffect, useState } from 'react';



export default function OTDMessages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      let source = new EventSource('/onthisday/');

      source.onmessage = message => {
        // set messages to json parsed data
        setMessages(prev => [...prev, JSON.parse(message.data)]);
        console.log(message);
      };

      source.onerror = () => {
        console.error('EventSource failed:', source.readyState);
        source.close();
      }

      return () => source.close();
    }, []);

	return (
        <section>
        <h4>OTD messages</h4>
        {messages.length > 0
          ? <ul>
              {messages.map((message, index) => (
                  <li key={message.id}>{message.id}: {message.value.text}</li>
              ))}
          </ul>
          : <p>No messages yet</p>
        }
        </section>
	);
}