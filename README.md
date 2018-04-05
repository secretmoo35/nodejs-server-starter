#### Install project

1. npm install

------

#### Run project

1. node server || npm start

* Use npm install -g nodemon
* Run "nodemon server" auto reload.

------

#### Create module

1. Copy folder "src/modules/template"

2. Change filename "src/modules/{{template}}" to a new filename.'

3. Change file "src/modules/{{template}}/models/model.js"


        var Model = "Template"; // change this to a new module

------


#### Authentication route


- [POST] "/api/auth/signup"

    	Input {
			   username:String,
			   password:String,
			   firstName:String,
			   lastName:String,
			   email:String               
    	}

    	Output {
			   status:Number,
			   token:String 
    	}

  

- [POST] "/api/auth/signin"

    	Input {
			   username:String,
			   password:String         
    	}

    	Output {
			   status:Number,
			   token:String 
    	}

- [GET] "/api/getuser"

    	Output {
			   status:Number,
			   data:User 
    	}

------

#### Reference

- **NodeJS:** https://nodejs.org/en/
- **Express:** https://expressjs.com/
- **MongoDB:** https://www.mongodb.com/

***REMARK** : This template is starter use the mongoDB express nodeJS no front-end template for server only.


------

#### Logs
- **03/04/18**  - version 1.0.1
    - Change filename
    - glob require(models & route)
    - express-jwt
- **04/04/18**  - version 1.0.2
    - signup
    - signin
    - get user
- **05/04/18**  - version 1.0.3
    - FIX: Access-Control-Allow-Origin
    - FIX: Header Authorization token undefiend (cors)