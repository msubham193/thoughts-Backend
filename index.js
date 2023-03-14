const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const { dbConnect } = require("./config/dbConnection");
const error = require("./middlewares/error");
const user = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const post = require("./routes/postRoutes");
const fileUpload = require("express-fileupload");

const app = express();

const corsOptions = {
  origin: "https://bucolic-basbousa-1db47b.netlify.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(fileUpload({ useTempFiles: true }));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", user);
app.use("/api/post", post);

app.use(error);

dotenv.config();

const connectServer = () => {
  dbConnect(process.env.MONGO_URL);
  app.listen(process.env.PORT, () => {
    console.log("connected to server on port " + process.env.PORT);
  });
};

connectServer();
