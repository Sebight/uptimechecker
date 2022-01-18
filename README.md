# uptimechecker
Tool used to check status of various websites, services, and endpoints generally.

Currently only available as a NodeJS server.

## Usage: 
Simply send a get request to the server with the following encapsulated parameters:
```json
{
    "endpoints": [
        {
            "url": "https://domain.com/anything",
            "method": "get"
        },
        {
            "url": "https://google.com",
            "method": "get"
        }
    ]
}
```

Use any available methods to to encapsulate the config JSON, but the example for the JSON above should look like this:

```%7B%0A%20%20%20%20%22endpoints%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22url%22%3A%20%22domain.com%2Fanything%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22method%22%3A%20%22get%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22url%22%3A%20%22google.com%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22method%22%3A%20%22get%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%7D```

To check uptime of all endpoints in the config, simply send a GET request like this:

```
GET 127.0.0.1:3000/check/encapsulatedConfig
```

The response of this request will look like this: 

```json
[
    {
        "url": "https://domain.com/anything",
        "status": 404,
        "statusMessage": "Not Found",
        "responseTime": 1575
    },
    {
        "url": "https://google.com",
        "status": 200,
        "statusMessage": "OK",
        "responseTime": 182
    }
]
```

## Limitations
The only possible limitation is that you exceed the size of url parameter. Though if you send a reasonable amount of endpoints, this should not be a problem. There is always an option to have the config on the server and use the configLoader script to load it.



## TODO
1. Expand this into a npm module.
2. Make more stuff controllable from the config.

