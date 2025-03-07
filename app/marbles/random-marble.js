'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RandomMarble({ otdID }) {
	const [marbleDate, setMarbleDate] = useState(null);

	useEffect(() => {
        async function fetchData() {
            // get a random date before today and after 2015-08-02 (the first blue marble image was on 2015-08-03)
            const randomDate = new Date(Math.floor(Math.random() * (Date.now() - new Date('2015-08-02').getTime()) + new Date('2015-08-02').getTime()));
            // get in the YYYY-MM-DD format
            const randomDateStr = randomDate.toISOString().split('T')[0];
            
            // prefetch the random marble
            const response = await fetch(`/bluemarble/${randomDateStr}`);
            const data = await response.json();

            setMarbleDate(randomDateStr);
        };
        fetchData();
	}, []);

	return (
    <>
    <Link href={`/marbles/${marbleDate}`}>a random marble ({marbleDate})</Link>
    </>
	);
}