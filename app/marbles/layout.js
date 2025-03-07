import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { Suspense } from 'react';
import { listBlueMarbles } from '@/app/actions';
import RandomMarble from './random-marble';

export default async function BlueMarbles({ children }) {

    noStore(); // force dynamic rendering
	const blueMarbles = await listBlueMarbles();

	return (
		<>
			<section>
				<h2>Blue Marbles</h2>
				<aside>
					This page uses the <a href="https://epic.gsfc.nasa.gov/about/api">NASA EPIC Daily “Blue Marble” API</a> to get an image of Earth on nearly any given day.
				</aside>
                <p>Cached image data (in order requested - i.e. cached) below - or take a look at <Suspense fallback="[one sec...thinking...]"><RandomMarble /></Suspense>.</p>
				<ol>
					{blueMarbles.map((blueMarble) => (
						<li key={blueMarble.id}>
							<Link href={`/marbles/${blueMarble.id}`}>{blueMarble.date}</Link>
						</li>
					))}
				</ol>
			</section>
			{children}
		</>
	);
}