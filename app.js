
const express  = require("express");
const ejs      = require("ejs");
const mongoose = require('mongoose');
const ShortUrl  = require("./model/db")
const app = express();
const dotenv          = require("dotenv");
dotenv.config({path: 'config.env'});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("db connected"))
.catch((err) => console.log(err));

app.set("view engine", 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.get("/", async(req,res) => {
  try{
    const shortUrls = await ShortUrl.find({});
    res.render("index", {shortUrls: shortUrls})
  }catch(err) {
    console.log(err)
  }
});

app.post('/', async(req,res) => {
  try{
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect("/")
  } catch(err) {
     console.log(err)
  }
});

app.get("/:shortUrl", async(req,res) => {
  try{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

      shortUrl.clicks++
      shortUrl.save()
      res.redirect(shortUrl.full)
  }catch(err) {
    console.log(err);
  }
});


app.listen(3000, () => {
  console.log('works');
});
