

const debug = false;
const Twit = require('twit');
require(dotenv).config();

const T = new Twit(require('./config.js'));

//Search parameters
const hashTag = {
    q: '', //Enter the keywords to search in Twitter
    count: 10,
    result_type: 'recent'
}

//User Stream
const stream = T.stream('user');
stream.on('follow', followed);
stream.on('tweet', tweetEvent)

//Activities to execute when someone follows this bot






