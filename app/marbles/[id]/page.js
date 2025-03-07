import Image from 'next/image';
import { getBlueMarble } from '@/app/actions';
import OnThisDay from './on-this-day';

export const dynamicParams = true;

export default async function BlueMarble({ params }) {
    const { id } = await params;
	const blueMarble = await getBlueMarble(id);

    // image intentionally scaled down to 400x400 for now...
	return (
		<section>
			<h1>Our Blue Marble on {blueMarble.date}</h1>
			<p><Image src={blueMarble.image} alt={blueMarble.caption} width="400" height="400" /></p>
			<OnThisDay otdID={blueMarble.otdID} />
		</section>
	);
}