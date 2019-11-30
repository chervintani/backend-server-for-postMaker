const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const http = require('http').Server(app);
//models
const schema = require('./Schema');


mongoose.connect(
  'mongodb+srv://chervintani:IamaPNscholar@theavengers-sczjp.azure.mongodb.net/event_hub?retryWrites=true&w=majority',
  { useNewUrlParser: true, useCreateIndex: true, }
);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.Promise = global.Promise;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/note/list', (req, res) => {
  schema.Post.find({}).sort({ updatedAt: 'descending' }).exec((err, notes) => {
    if (err)
      return res.status(404).send('Error while getting notes!');
    return res.send({ notes });
  });
});

app.get("/", function(req, res) {
  //when we get an http get request to the root/homepage
  res.send("Hello! This is the backend server of the website EventHub(added search)");
});

app.post('/api/account/create', (req, res) => {
  const account = new schema.Account({
    username: req.body.username,
    password: req.body.password,
  });
  
  account.save((err) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ account });
  });
});

app.post('/api/account/login', (req, res) => {
  schema.Account.findOne(req.body,(err,account)=>{
    if(account!==null){
      return res.send({login: "success"});
    }else{
      return res.send({login: "failed"});
    }
  })
});

app.post('/api/note/create', (req, res) => {
  const note = new schema.Post({
    body: req.body.body,
    title: req.body.title,
    people: req.body.people,
    location: req.body.location,
    creator: req.body.creator,
    datetime: req.body.datetime,
    filename: req.body.filename,
    image: req.body.image,
    date_created: req.body.date_created,
    date_updated: req.body.date_updated
  });
  note.save((err) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ note });
  });
});


app.post('/api/note/update/:id', (req, res) => {
  schema.Post.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, note) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ message: 'note updated!', note });
  });
});

app.get('api/note/searching',(req,res)=>{
  console.log(req)
  // schema.Post.find({title: {$regex: req.body.search, $options: "i"}},(err,docs)=>{
  //   if(err) return res.send(err)
  //   res.send(docs)
  // })
  res.send("I read it")
});

app.post('/api/note/delete/:id', (req, res) => {
  schema.Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ message: 'note deleted!' });
  });
});


http.listen(port, '0.0.0.0', function () {
	console.log('listening on port ' + port);
});