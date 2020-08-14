var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
const login_register_router = require('./register_login/login_register_router.js');

const errorHandler = function(err,req,res,next) {
    console.log('err:'+err)

    if( err instanceof Object )  {
        return res.sendStatus(500,'application/json',{
            error:true,
            info:JSON.stringify(err)
        });
    }
    return res.sendStatus(500,'application/json',{
        error:true,
        info:err
    });
}

app.response.sendStatus = function (statusCode, type, message) {
    return this.contentType(type)
      .status(statusCode)
      .send(message)
}

app.use(cors());
app.use(bodyParser.json());

app.listen(4000,'0.0.0.0',function() { console.log('Example app listening on port 4000!');});

app.use('/',login_register_router);
app.use(errorHandler);