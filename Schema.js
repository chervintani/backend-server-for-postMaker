const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        people: String,
        location: { type: String, required: true },
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


const Post = mongoose.model("Post", PostSchema);
const Account = mongoose.model("Post", AccountSchema);
module.exports = { Post, Account };