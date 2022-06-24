const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    return (
      mongoose.connect(
        process.env.DB_HOST,
        // "mongodb+srv://olha:olhasvet@cluster0.tm34v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      ),
      console.log("Database connection successful")
    );
  } catch (err) {
    console.log(`Error in DB connection ${err}`);
    process.exit(1);
  }
};

module.exports = { connectMongo };
