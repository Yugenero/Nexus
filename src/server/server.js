/**
 * Node.js server that handles requests from React application
 * and interacts with MongoDB Atlas database, sends responses back to
 * react appliction
 */

const client = require('./db.js'); // import the MongoClient from db.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// connect to client then start server for more efficient connection
client.connect().then(() => {
	/**
	 * User login endpoint
	 */
	app.post('/api/login', async (req, res) => {

		const {username, email, password } = req.body;
		const collection = client.db("db").collection("users");
		const user = await collection.findOne({username, email, password});

		if (user) {
			res.send({message: 'Login successful'});
		} else {
			res.status(401).send({message: 'Invalid username or password'});
		}
	});

	/**
	 * User registraion endpoint
	 */
	app.post('/api/register', async (req, res) => {
		
		const {username, email, password} = req.body;
		const collection = client.db("db").collection("users");
		const user = await collection.findOne({username, email});

		if (user) {
			res.status(401).send({message: 'Username or email already exists'});
		} else {
			await collection.insertOne({username, email, password});
			res.send({message: 'Registration successful'});
		}
	});
	// notfiy server has successfully started
	app.listen(port, () => {
		console.log(`Server started on http://localhost:${port}`);
	});
}).catch(console.dir);