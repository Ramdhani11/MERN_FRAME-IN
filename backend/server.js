const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const { register } = require("./controllers/auth");
const { createPost } = require("./controllers/post");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

// init app express
const app = express();
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// lets upload
app.post("/auth/register", upload.single("photo"), register);
app.post("/create/post", upload.single("photo"), createPost);

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

// connection
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;
mongoose.set("strictQuery", false);

mongoose
  .connect(URI, {
    dbName: "Developer",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("listen to port : " + PORT);
    })
  )
  .catch((error) => console.log(error));
