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
    username: string <= 255 chars, **UNIQUE**, NOT NULL
    email: string <= 255 chars, **UNIQUE**, NOT NULL
    password: string <= 255 chars, NOT NULL
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
    email: string
    password: string
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