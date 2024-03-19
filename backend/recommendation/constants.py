WEB_SCRAPE_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.google.com/'
}

WEB_PAGES_TO_SCRAPE = {
    'tripadvisor-restaurants': {
        'url': 'https://www.tripadvisor.ca/Restaurants-g155019-Toronto_Ontario.html',
        'type': 'Restaurant',
    },
    'tripadvisor-hotel': {
        'url': 'https://www.tripadvisor.ca/Hotels-g155019-Toronto_Ontario-Hotels.html',
        'type': 'Hotel'
    },
    'tripadvisor-activity': {
        'url': 'https://www.tripadvisor.ca/Attractions-g155019-Activities-c56-Toronto_Ontario.html',
        'type': 'Activity'
    },
}

MODEL_PATH = 'model/model.pkl'

NUM_RECOMMENDATIONS = 5

TYPE_MAP = {
    'Restaurant': 0,
    'Hotel': 1,
    'Activity': 2
}
