'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// takes otdID as a prop
export default function OnThisDay({ otdID }) {
	const [otd, setOtd] = useState([]);

	useEffect(() => {
        async function fetchData() {
            // use MM-DD format to fetch selected events for the day via /onthisday/MM-DD using the current blue marble otdID
            const response = await fetch(`/onthisday/${otdID}`);
            const data = await response.json();
            setOtd(data);
        };
        fetchData();
	}, []);

	return (
    <>
    <h2>Holiday, on this day...</h2>
    <p>{otd.pageUrl !== undefined ? <Link href={otd.pageUrl}>{otd.text}</Link> : <>nothing(?)</>}</p>
    </>
	);
}