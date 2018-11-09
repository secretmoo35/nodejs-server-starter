# Install project

Now: nodejs-server have a cli generate. :)

https://www.npmjs.com/package/nodejs-server-generate

#### Install project

1. npm install

------

#### Run project

1. npm start

------

#### Run test project

1. npm test

------

#### Create module

1. Copy folder "src/modules/template"

2. Change filename "src/modules/{{template}}" to a new filename.'

3. Change file "src/modules/{{template}}/models/model.js"


        let Model = "Template"; // change this to a new module

4. Enjoy!

------


#### Authentication routes


- [POST] "/api/auth/signup"

    	Input: {
			   username:String,
			   password:String,
			   firstName:String,
			   lastName:String,
			   email:String               
    	}

    	Output: {
			   status:Number,
			   token:String 
    	}

  

- [POST] "/api/auth/signin"

    	Input: {
			   username:String,
			   password:String         
    	}

    	Output: {
			   status:Number,
			   token:String 
    	}

- [GET] "/api/user" (Request header)

    	Output: {
			   status:Number,
			   data:User 
    	}

------

#### External authentication routes

- Facebook

		[GET]
		/api/auth/facebook

- Google

		[GET]
		/api/auth/google

- LinkedIn

		[GET]
		/api/auth/linkedin

- twitter

		[GET]
		/api/auth/twitter

- github

		[GET]
		/api/auth/github


		
**REMARK**  : Add key & secret key configs file "modules/**/strategy/*.js"

------

#### Reference

- **NodeJS:** https://nodejs.org/en/
- **Express:** https://expressjs.com/
- **MongoDB:** https://www.mongodb.com/

***REMARK** : This template is starter use the mongoDB express nodeJS no front-end template for server only.


------

#### Logs

- **09/11/18**  - version 2.0.1
    - FIX: bcrypt

- **06/10/18**  - version 2.0.0
    - UPDATE: Arrow function
	- REMOVE: package express-jwt

- **07/07/18**  - version 1.4.2
    - FIX: Deploy port "process.env.PORT"

- **16/05/18**  - version 1.4.1
    - FIX: Login local

- **10/05/18**  - version 1.4.0
    - ADD: Circleci config
    - FIX: TDD - Remove user model

- **30/04/18**  - version 1.3.1
    - UPDATE: include module body-parser

- **20/04/18**  - version 1.3.0
    - PACKAGE: Mocha, Supertest, should
    - ADD: Test Driven Development(TDD) for authen-local
    - ADD: Test Driven Development(TDD) for Template

- **18/04/18**  - version 1.2.0
    - UPDATE: authen facebook use passport (Login & Register)
    - UPDATE: authen google use passport (Login & Register)
    - UPDATE: authen linkedin use passport (Login & Register)
    - UPDATE: authen twitter use passport (Login & Register)
    - ADD: authen github use passport (Login & Register)

- **17/04/18**  - version 1.1.0
    - CHANGE: authen local use passport
    - ADD: authen facebook use passport (V.1 Read only)
    - ADD: authen google use passport (V.1 Read only)
    - ADD: authen linkedin use passport (V.1 Read only)
    - ADD: authen twitter use passport (V.1 Read only)

- **05/04/18**  - version 1.0.3
    - FIX: Access-Control-Allow-Origin
    - FIX: Header authorization token undefiend (cors)
    - CHANGE: Store hash in your password DB.
    - ADD: Mongoose find().lean() performance.
	
- **04/04/18**  - version 1.0.2
    - signup
    - signin
    - get user
	
- **03/04/18**  - version 1.0.1
    - Change filename
    - glob require(models & route)