import express from 'express'
import bodyParser from 'body-parser'

import { Config } from '../../config'
import { connectDb, loadSeed } from '../../core'
import { router } from './api/v1'



const app = express();

// Set port
app.set("port", Config.port || 3000)

// Enabled file upload


// Limit body weight
app.use(bodyParser.json({limit: "5mb" }))
app.use(bodyParser.urlencoded({limit: "5mb", extended: true}))


// Cors and headers
app.use((req, res, next) =>{	
    res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
	res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
	next()
})

// Set express
app.use(express.json())

// Set router to express
app.use("/api", router)

// Init app
connectDb().then(async () => {	
	app.listen(app.get("port"), async () => {
		await loadSeed()
    	console.log(`App listening port ${app.get("port")}`)
	});
}).catch((e) => {
	console.log(e)
});

export { app }