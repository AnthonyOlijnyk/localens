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