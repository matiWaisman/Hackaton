const express = require("express");
const cors = require("cors");
const hackatonsRouter = require("../routes/hackatons");
const usersRouter = require("../routes/users");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");

const app = express();
require("../config/passport-config")(passport);
global.isLoggedIn = false; //I know this is VERY bad, but i can't connect the req.user with the express-sessions

const connectDB = require("./db/connect");
const populate = require("./populateDb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(
  cors({
    origin: ["https://deploy-mern-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/hackatons", hackatonsRouter);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on port: ${PORT}....`));
  } catch (error) {
    console.log(error);
  }
};

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "client", "build", "index.html");
    res.sendFile(indexPath);
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

const notFound = require("../middleware/notFound");
app.use(notFound);

start();
