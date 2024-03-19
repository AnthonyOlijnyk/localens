import requests

from bs4 import BeautifulSoup

from recommendation.constants import (
    WEB_SCRAPE_HEADERS,
    WEB_PAGES_TO_SCRAPE
)

from location.models import Location

def add_bonus(location, text, bonuses):
    if location.name in text:
        bonuses[location.id - 1] += 0.1

def get_webpage_text(url):
    response = requests.get(url, headers=WEB_SCRAPE_HEADERS)

    if response.status_code != 200:
        raise Exception('Cannot fetch webpage.')
    
    return BeautifulSoup(response.text, 'html.parser').text


def scrape_web_page(url, type, bonuses):
    text = get_webpage_text(url)

    locations = Location.objects.filter(type=type)

    for location in locations:
        add_bonus(location, text, bonuses)

    

def scrape_web_pages(type):
    bonuses = [0] * Location.objects.count()

    for page in WEB_PAGES_TO_SCRAPE.values():
        if page['type'] == type:
            scrape_web_page(page['url'], type, bonuses)
    
    return bonuses
