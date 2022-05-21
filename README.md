# REST API's

The REST API to the main app is described below.

## Get list of People (Task 1)

### Request

`GET http://localhost:3000/person-service/get-all`

### Response

```json
[
    {
        "firstname": "Hasan",
        "lastname": "Yelaldi",
        "birthday": "29.05.1993",
        "address": "İstanbul / Turkey",
        "phoneNumber": "+905533513210"
    },
    {
        "firstname": "Isabelle",
        "lastname": "Richter",
        "birthday": "29.05.1993",
        "address": "Frankfurt / Germany",
        "phoneNumber": "+905533513210"
    }
]
```

## Clear Array By Index (Task 2)

### Request

`POST http://localhost:3000/array-service/clear-array`

Body:

```json
{
    "array":  [1, 2, 3, 4, 5, 6, 7, 8],
    "permutation": 3
}
```

### Response

```json
{
    "removedItems": [3,6,1,5,2,8,4,7]
}
```

## Gateway (Task 3)

### Login Request

`POST http://localhost:3000/auth/`

Body:

```json
{
    "user": "thinksurance",
    "pwd": "Aa$12345"
}
```

### Response

```json
{
    "roles": [
        2001,
        5150
    ],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6InRoaW5rc3VyYW5jZSIsInJvbGVzIjpbMjAwMSwxOTg0LDUxNTBdfSwiaWF0IjoxNjUzMTQ1NjkyLCJleHAiOjE2NTMxNDU5OTJ9.gEF2kBmMbtcjSs1HmAEGHIbRaFy4CXMBBrDrMSd5llY"
}
```

### Refresh Token Request

`GET http://localhost:3000/refresh/`

### Response

```json
{
    "roles": [
        2001,
        5150
    ],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6InRoaW5rc3VyYW5jZSIsInJvbGVzIjpbMjAwMSwxOTg0LDUxNTBdfSwiaWF0IjoxNjUzMTQ1NjkyLCJleHAiOjE2NTMxNDU5OTJ9.gEF2kBmMbtcjSs1HmAEGHIbRaFy4CXMBBrDrMSd5llY"
}
```

### Logout Request

`GET http://localhost:3000/logout/`

### Response

```json
{
    "success": "Logged out!"
}
```

### Register Request

`POST http://localhost:3000/register/`

```json
{
    "user": "hasanyelaldi",
    "pwd": "Aa$12345"
}
```

### Response

```json
{
    "success": "New user hasanyelaldi created!"
}
```
