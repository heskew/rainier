import Link from 'next/link';
import OTDMessages from './otd-messages';

export default async function Page() {
	return (
		<section>
			<p>
				Check out the <Link href="/marbles">Blue Marbles</Link> page to see what's stored or find what the Earth looked like on a specific day.
			</p>
			<OTDMessages />
		</section>
	);
}