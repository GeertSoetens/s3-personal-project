const { MongoClient } = require("mongodb");
const express = require("express");
const path = require("path");

// Get .env variables
require('dotenv').config();

// Get port 
const port = process.env.PORT;

// Create web app using Express
const app = express();

// Serve HTML file
app.use(express.static(path.join(__dirname, "../")));

// Mongo URI
const uri = process.env.MONGODB_URI;

// Prepare mongoDB
const mongo = new MongoClient(uri);

// Get Events
app.post("/get_events", async (req, res) => {
    try {
        let event;
        let result = [];

        // Debug, to see if the request is receiveed
        console.log("Request '/get_events' received!");

        // Open connection
        await mongo.connect();

        // Get database
        console.log("Connecting to database...");
        const database = mongo.db('rdf_website');

        // Get collection
        console.log("Retrieving collection...");
        const collection = database.collection('events');

        // Get Events

        // -- The query below finds ONE item in the collection that is tagged with "Co-op"
        // const events = await collection.findOne({ tags: "Co-op"});

        // -- The query below finds ALL items in the collection
        // -- It places a cursor, using that cursor we can retrieve the items below.
        const events = collection.find({}).sort({
            unix_timestamp: 1,
        });

        // -- Using a for loop, we can get all the events from events.
        for await (event of events) {
            console.log(event);

            // We then put this in an array
            result.push(event);
        }

        // console.log(events);

        console.log("Sending data back to client.");
        res.send(result);

    } catch(err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Site URL: http://localhost:${port}`);
})