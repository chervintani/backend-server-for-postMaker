const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        people: String,
        location: { type: String, required: true },
        creator: { type: String, required: true },
        datetime: String,
        filename: String,
        image: String,
        date_created: String,
        date_updated: String
    },
    {
        timestamps: true
    }
);

const AccountSchema = new Schema({
    username: String,
    password: String
})

var imageSchema = new Schema({
    filename: String,
    image: String
})
const Image = mongoose.model('Albumn', imageSchema);
const Post = mongoose.model("Post", PostSchema);
const Account = mongoose.model("Account", AccountSchema);
module.exports = { Post, Image, Account };