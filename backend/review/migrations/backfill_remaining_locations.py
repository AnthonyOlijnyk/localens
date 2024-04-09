import csv
import re

from django.db import migrations, transaction
from django.core.exceptions import ObjectDoesNotExist

TYPE_CODE_MAP = {
    '0': 'Restaurant',
    '1': 'Hotel',
    '2': 'Activity'
}

def form_reviews(row, new_location, Review):
    new_reviews = []

    review_texts = re.findall(r'(-[^\n]+)', row['Customer reviews'])
    
    for review_text in review_texts:
        new_reviews.append(
            Review(
                text=review_text,
                location=new_location
            )
        )

    return new_reviews

def form_location_and_reviews(row, Location, Review):
    try:
        Location.objects.get(name=row['Name'])
    except ObjectDoesNotExist:
        new_location = Location (
            type = TYPE_CODE_MAP[row['Type (Restaurant = 0, Hotel = 1, Activity = 2)']],
            name = row['Name'],
            about = row['About information'],
            average_rating = row['Average rating'],
            latitude = row['Latitude'],
            longitude = row['Longitude'],
            is_family_friendly = row['Family Friendly (1/0)'],
            average_cost = row['Cost (average)'],
            start_time = row['Operating hours: Opening time'],
            end_time = row['Operating hours: Closing time'],
            accessibility_rating = row['Accessibility rating (1-5)'],
            capacity = row['Capacity']
        )

        new_reviews = form_reviews(row, new_location, Review)

        return new_location, new_reviews

def collect_locations_and_reviews(Location, Review):
    formed_locations = []
    formed_reviews = []
    with open ('review/migrations/data/remaining-locations.csv', encoding='utf8') as file_data:
        reader = csv.DictReader(file_data)
        for row in reader:
            result = form_location_and_reviews(row, Location, Review)
            if result:
                location, reviews = form_location_and_reviews(row, Location, Review)
                formed_locations.append(location)
                formed_reviews = formed_reviews + reviews
    return formed_locations, formed_reviews

def backfill_initial_locations(apps, schema_editor):
    Location = apps.get_model('location', 'Location')
    Review = apps.get_model('review', 'Review')
    db_alias = schema_editor.connection.alias

    locations_to_add, reviews_to_add = collect_locations_and_reviews(Location, Review)

    with transaction.atomic():
        Location.objects.using(db_alias).bulk_create(locations_to_add)
        Review.objects.using(db_alias).bulk_create(reviews_to_add)

    

class Migration(migrations.Migration):

    dependencies = [
        ('review', 'backfill_initial_locations'),
    ]

    operations = [
        migrations.RunPython(backfill_initial_locations)
    ]