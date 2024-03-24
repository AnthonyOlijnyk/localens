Using Python version 3.11.5 and pip version 23.2.1.

The `Localens.postman_collection.json` file can be imported into Postman so that you can have the routes all setup immediately. You don't have to do this though.

Make sure you are in the backend directory before running the commands

# Install Dependencies
run `pip install -r requirements.txt` to install the required libraries.

# Setup Database
run the following command to setup the database
```
python manage.py migrate
```

# Run Server
run `python manage.py runserver` to start the server on port 8000

# Running tests
run `pytest --cov-config=.coveragerc --cov` to show console output for test coverage.

run `pytest --cov-report html --cov-config=.coveragerc --cov` to generate a web report showing test coverage. To view the generated report, go into the newly created `htmlcov` folder and open the `index.html` file in any type of browser.

run `pytest` to run all tests.

run `pytest <path/to/module>` to test specific modules.

# API Routes that are currently available

## POST api/signup
Creates a new user.

The body of the request is expected to be:
```
{
    username: string <= 255 chars, unique, not null
    email: string <= 255 chars, unique, not null
    password: string <= 255 chars, not null
}
```

Will return
```
{
    errors: object of the form:
        {
            key(s) (could be multiple): array of strings
        }
}
```

## POST api/login
Creates a JWT and validates the email and password sent.

The JWT payload has the format:
```
{
    id: the user's id
    exp: time the JWT expires (1 hour from issue time)
    iat: time the JWT was issued at
}
```

The body of the request is expected to be:
```
{
    email: string, not null
    password: string, not null
}
```

Will return
```
{
    token: string
    errors: object of the form:
        {
            key(s) (could be multiple): array of strings
        }
}
```

After getting the token in the response on the frontend, you need to set the token as a cookie locally.

[Here is an example of how to do that](https://github.com/AnthonyOlijnyk/reservify/blob/a139b31d6fa65fd2489d1d9e204263d8b26dc197/frontend/src/pages/Login.js#L29-L43) (note that the `Cookies` module from the `universal-cookies` package is first imported before this).

Then, when you are making requests that follow a user logging in, you need to include the cookie in the authorization header of the request with the format `Bearer ${cookie}`. [Here is an example of how to do that.](https://github.com/AnthonyOlijnyk/reservify/blob/a139b31d6fa65fd2489d1d9e204263d8b26dc197/frontend/src/pages/ReservePage.js#L81)

Logging out does not need a backend interaction in order to work. All you need to do is clear the cookie that was originally set using `cookie.remove('token', { path: '/' })`.

## POST api/make-recommendation
**NOTE: YOU NEED THE BEARER TOKEN HEADER SET FOR THIS ENDPOINT TO WORK**

*If you're testing this endpoint in postman, you need to set the authorization field to be bearer token, and then copy the token you get from the api/login endpoint into that field before making the request*

Lists the top 5 recommendations based on the form input submitted by the user.

The body of the request is expected to be:
```
{
    type: string (Restaurant, Hotel, Activity)

    average_rating: float (1-5)

    latitude: float

    longitude: foat

    family_friendly: 1 / 0

    cost: float

    open_time: float (based on 24h clock. If the user wants something in between 9:30am-5:30pm, the value sent here should be 9.5)

    close_time: float (based on 24h clock. If the user wants something in between 9:30am-5:30pm, the value sent here should be 17.5)

    accessibility_rating: float (1-5)

    capacity: int
}
```

Will return
```
{
    [
        location_one,
        location_two,
        location_three,
        location_four,
        location_five
    ]
}
```

each location having the attributes layed out in the Location model which is:

```
type: 'Restaurant', 'Hotel', 'Activity'
name: string
about: long string
average_rating: float
latitude: float
longitude: float
is_family_friendly: 1 / 0
average_cost: float
start_time: float
end_time: float
accessibility_rating: float
capacity: int
```

## GET api/get-recommendations-from-past-data
**NOTE: YOU NEED THE BEARER TOKEN HEADER SET FOR THIS ENDPOINT TO WORK** 

*If you're testing this endpoint in postman, you need to set the authorization field to be bearer token, and then copy the token you get from the api/login endpoint into that field before making the request*

Returns the top 5 recommendations for each location type

No body is required for this endpoint.

Will return
```
{
    Restaurant: [
        restaurant_one,
        restaurant_two,
        restaurant_three,
        restaurant_four,
        restaurant_five
    ],
    Hotel: [
        hotel_one,
        hotel_two,
        hotel_three,
        hotel_four,
        hotel_five
    ],
    Activity: [
        activity_one,
        activity_two,
        activity_three,
        activity_four,
        activity_five
    ]
}
```
each restaurant / hotel / activity having the attributes layed out in the Location model which is:

```
type: 'Restaurant', 'Hotel', 'Activity'
name: string
about: long string
average_rating: float
latitude: float
longitude: float
is_family_friendly: 1 / 0
average_cost: float
start_time: float
end_time: float
accessibility_rating: float
capacity: int
```
