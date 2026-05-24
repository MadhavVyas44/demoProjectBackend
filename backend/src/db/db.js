const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect("mongodb://Madhav:Air9321@ac-oe6izrd-shard-00-00.1moehtn.mongodb.net:27017,ac-oe6izrd-shard-00-01.1moehtn.mongodb.net:27017,ac-oe6izrd-shard-00-02.1moehtn.mongodb.net:27017/firstProject?ssl=true&replicaSet=atlas-13d293-shard-0&authSource=admin&appName=backend");
  console.log("connected to DB");

}
module.exports = connectDB;