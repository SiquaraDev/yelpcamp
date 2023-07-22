const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DATABASE CONNECTED");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const r1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            location: `${cities[r1000].city}, ${cities[r1000].state}`,
            author: "64b214871fdd3632b1d0d455",
            title: `${sample(descriptors)} ${sample(places)}`,
            price: price,
            geometry: {
                type: "Point",
                coordinates: [cities[r1000].longitude, cities[r1000].latitude],
            },
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam facere nihil eligendi exercitationem sint ducimus magni corporis enim nisi esse ea dolorem libero fugit deleniti maiores rem, natus cumque unde?",
            images: [
                {
                    url: "https://res.cloudinary.com/dwxghshzb/image/upload/v1689576338/yelpcamp/gststibhtv1buvksocvn.jpg",
                    filename: "yelpcamp/gststibhtv1buvksocvn",
                },
                {
                    url: "https://res.cloudinary.com/dwxghshzb/image/upload/v1689576339/yelpcamp/gvq2el9diyd6fbryshnj.jpg",
                    filename: "yelpcamp/gvq2el9diyd6fbryshnj",
                },
                {
                    url: "https://res.cloudinary.com/dwxghshzb/image/upload/v1689576340/yelpcamp/a2dl8tnksvr0wbwnbav4.jpg",
                    filename: "yelpcamp/a2dl8tnksvr0wbwnbav4",
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
