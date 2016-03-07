# task1
User `npm install` and `bower install` to install 

To run Develop is `gulp serve`
and to compile to production is `gulp build`

To use this application you have to register google API and Openweathermap first
Then create file name `config.js` under /app/scripts/ 

this is the format 

```
var config = {
    "map" : {
        "key" : "---- google api key ----"
    },
    "weather" : {
        "appid" : "---- Openweathermap appid ----"
    }
}
```
