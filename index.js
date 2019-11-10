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
  res.send("Hello! This is the backend server of the website EventHub");
});

app.post('/api/note/create', (req, res) => {
  console.log(req.body)
  const note = new schema.Post({
    body: req.body.body,
    title: req.body.title,
    location: req.body.location,
    filename: req.body.filename,
    image: req.body.image
  });
  note.save((err) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ note });
  });
});


app.post('/api/note/update/:id', (req, res) => {
  console.log(req.body.data)
  schema.Post.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, note) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ message: 'note updated!', note });
  });
});

app.post('/api/note/delete/:id', (req, res) => {
  console.log(req.params.id)
  schema.Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ message: 'note deleted!' });
  });
});



http.listen(port, '0.0.0.0', function () {
	console.log('listening on port ' + port);
});