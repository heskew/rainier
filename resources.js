const { BlueMarble, OnThisDay } = tables;

// A couple simple API string formatting fuctions for th eNASA EPIC API
const epicDateApi = (dayString) => {
    // simple validation for date string
    if (!dayString.match(/^\d{4}-\d{2}-\d{2}$/)) { // still could be a totally invalid date
        throw new Error('Invalid date string');
    }
    return `https://epic.gsfc.nasa.gov/api/natural/date/${dayString}`;
};
const epicImagePath = (dayString, imageName) => {
    // simple validation for date string
    if (!dayString.match(/^\d{4}-\d{2}-\d{2}$/)) { // still could be a totally invalid date
        throw new Error('Invalid date string');
    }
    return `https://epic.gsfc.nasa.gov/archive/natural/${dayString.replace(/-/g, '/')}/png/${imageName}.png`;
};

// BlueMarbleSource is a Resource that fetches data from the NASA EPIC API, grabbing the first image for a given date
class BlueMarbleSource extends Resource {
    async get(query) {
        // default reqDate to today
        let reqDate = new Date().toISOString().split('T')[0];

        logger.info('BlueMarbleSource.get', { query });

        // using query.url for the date
        if (query?.url) {
            reqDate = query.url;
        }

        // simple validation for date string - probably goes against the graphql rest api standard
        if (!reqDate.match(/^\d{4}-\d{2}-\d{2}$/)) { // still could be a totally invalid date
            throw new Error('Invalid date string');
        }
        
        // get the data from the API
        let data = [];
        try {
            const dateApi = epicDateApi(reqDate);
            const dateResponse = await fetch(dateApi);
            data = await dateResponse.json(); // could throw if not ok
        } catch (error) {
            throw new Error('Failed to fetch EPIC data');
        }

        if (data.length === 0) {
            throw new Error('No data found');
        }

        // get some data for the first image
        const { caption, date: imageDate, image } = data[0];
        // image date is in the format '2025-03-05 21:49:33'
        // todo: generate a gif of all images from the day and store in the db
        const date = imageDate.split(' ')[0];

        // return json
        return {
            date,
            image: epicImagePath(date, image),
            caption,
            // get the MM-DD from date
            otdID: date.slice(5)
        }
    }
}

BlueMarble.sourcedFrom(BlueMarbleSource);

class OTDSource extends Resource {

    // use MM-DD format to fetch selected (holidays) events for the day via https://en.wikipedia.org/api/rest_v1/feed/onthisday/holidays/MM/DD
    async get(query) {
        // default reqDate to today
        let reqDate = new Date().toISOString().split('T')[0].slice(5);

        logger.info('OTDSource.get', { query });

        // using query.url for the date
        if (query?.url) {
            reqDate = query.url;
        }

        // simple validation for date string - probably goes against the graphql rest api standard
        if (!reqDate.match(/^\d{2}-\d{2}$/)) { // still could be a totally invalid date
            throw new Error('Invalid date string');
        }

        // get the data from the API
        let data = [];
        try {
            const otdApi = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/holidays/${reqDate.replace('-', '/')}`;
            const otdResponse = await fetch(otdApi);
            data = await otdResponse.json(); // could throw if not ok
        } catch (error) {
            throw new Error('Failed to fetch OTD data');
        }
        
        // get the first event and return an object with the date, text, from the first page, title, thumbnail (source, width and height) and desktop content url
        // just keeping it simple for this exercise
        const firstEvent = data.holidays[0];
        const { text, pages } = firstEvent;
        const { title: pageTitle, content_urls } = pages[0];
        const { page: pageUrl } = content_urls.desktop;

        return {
            date: reqDate,
            text,
            pageTitle,
            pageUrl
        }
    }
}

OnThisDay.sourcedFrom(OTDSource);