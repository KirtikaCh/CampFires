const mongoose=require('mongoose');
const cities = require('./cities');
const { places,descriptors }=require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp-fires',{
    useNewUrlParser:true,
  //  useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});
const sample=array=>array[Math.floor(Math.random()*array.length)];
const seedDB =async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp=new Campground({
            author:'6294599442c0d96207306a5e',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi eius totam rerum eum ducimus excepturi! Praesentium quas dolores magnam dolore enim. Fuga quae odio vitae suscipit sapiente tempora, eos facilis',
            price,
            geometry:{
            type:"Point",
            coordinates:[
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/de6q5resp/image/upload/v1654103292/Campfires/fxnwjtvkrgxof5wzto7j.jpg',
                  filename: 'Campfires/fxnwjtvkrgxof5wzto7j'
                },
                {
                  url: 'https://res.cloudinary.com/de6q5resp/image/upload/v1654103295/Campfires/gjek90tiq9p2sgj4lrft.jpg',
                  filename: 'Campfires/gjek90tiq9p2sgj4lrft'
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})