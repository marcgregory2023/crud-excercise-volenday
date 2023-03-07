import mongoose from "mongoose";

const url = process.env.MONGO_URL;
const connection = {};
export const connectDb = async () => {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database");
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New connection to the database");
  connection.isConnected = db.connections[0].readyState;
};

export const disconnectDb = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnecting from the database");
    }
  }
};
