# S3 Personal Project RDF Website
In this project, I've built a website for my gaming clan "RDF". Using the styleguide created in an earlier project, I've been able to stick to a consistent style all the way through.

[Styleguide](https://drive.google.com/file/d/1XVy6rx1y1riDMH6ZM-U4eCrJcttXw_y4/view?usp=sharing)

The website's primary goal is getting more people to join our clan. To this end, there's a call to action on the landing / hero and multiple links to the Discord on the website itself.

## Installation

To run this project, you'll need [Node.js](https://nodejs.org/en) and it's package manager NPM.

Once node js is downloaded, clone the project and run `npm install` in the terminal to download all the required packages.

You will also need to create an `.env` file in the root with a URL to your MongoDB and a port you wish to host the website on.

The app expects 2 global `.env` variables:

- `MONGODB_URI`, the URI for your database (including password!).
- `PORT`, the port you want the website to run on.

## Usage

Once the project has been installed, to start the website simply run `npm run app` to start the website. The websites' local adress will then be logged in the console.

Once the website is loaded, it'll send a request to the server to retrieve events from the database. This is done verbose in the console, and you can see the request being received. After which it'll connect to MongoDB _(if your .env file has been set up!)_ to retrieve the events.

The website can also be opened without running the Node.js server. It will, however, never load the events.

## Contributing
Feel free to contribute! If you suggest new pages or extra elements to the website; I do ask that they ofcourse be in line with the styleguide.

## License
[CC BY-NC](https://creativecommons.org/licenses/by-nc/4.0/deed.en)
