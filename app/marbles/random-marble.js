'use client';

import { useEffect, useState } from 'react';

// takes otdID as a prop
export default function OnThisDay({ otdID }) {
	const [otd, setOtd] = useState([]);

	useEffect(async () => {
        console.log('OnThisDay', { otdID });
        // use MM-DD format to fetch selected events for the day via /onthisday/MM-DD using the current blue marble otdID
        const response = await fetch(`/onthisday/${otdID}`);
        console.log(response);
        const data = await response.json();
        setOtd(data);
	}, []);

	return (
    <>
    <h2>On this day...</h2>
    <aside>First 'selected' event from wikipedia - hopefully nothing offensive.</aside>
    <p>{otd.text}</p>
    </>
	);
}