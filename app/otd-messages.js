'use client';

import mqtt from 'mqtt';
import { useEffect, useState } from 'react';
import { listBlueMarbles } from '@/app/actions';

let source = new EventSource('/onthisday/');
source.addEventListener('message', console.log);
source.addEventListener('put', console.log);
source.addEventListener('delete', console.log);

export default function OTDMessages() {
	const [blueMarbles, setBlueMarbles] = useState([]);
    const [messages, setMessages] = useState([]);

	useEffect(() => {
		listBlueMarbles().then((blueMarbles) => setBlueMarbles(blueMarbles));
	}, []);

    useEffect(() => {
        // some quick hardcoding to get the MQTT connection working
        const mqttUri = 'mqtt://localhost:1883/';
        const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
        const options = {
          // begin, bad practice
          username: 'chewy',
          password: 'lulz',
          // end, bad practice
          keepalive: 60000,
          clientId: clientId,
          protocolId: 'MQTT',
          protocolVersion: 4
        };
        const client = mqtt.connect(mqttUri, options);
        client.on('connect', () => {
          client.subscribe('OnThisDay/#');
          client.subscribe('onthisday/#');
          client.on('message', (message) => { setMessages(messages.concat(message.toString())); });
        });
      
        return () => {
          if (client) {
            client.unsubscribe('onthisday/#');
            client.end(client);
          }
        };
      }, []);

	return (
        <section>
        <h4>OTD messages</h4>
        <ul>
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
        </ul>
        </section>
	);
}