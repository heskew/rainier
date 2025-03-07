'use server';

import('harperdb');

export async function listBlueMarbles() {
	const blueMarbles = [];
	for await (const blueMarble of tables.BlueMarble.search()) {
		blueMarbles.push(blueMarble);
	}
	return blueMarbles;
}

export async function getBlueMarble(id) {
	return tables.BlueMarble.get(id);
}