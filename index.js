

const debug = false;
const Twit = require('twit');
require('dotenv').config();

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

function followed(event) {
    let name = event.source.name;
    let screenName = event.source.screen_name;
    let response = `Thanks for following me ${name} @${screenName}! Let's support @CIBAC_PartyList`
    //Posting the thank you tweet:
    T.post('statuses/update', {status: response}, tweeted);

    //System logging:
    console.log(`I was followed by ${name}${screenName}`);
}

function reTweetLatest() {
    T.get('search/tweets', hashTag, (error, data) => {
        let tweets = data.status;
        for(var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text)
        }

        if(!error) { //Run this code if there is no error
            let reTweetId = data.statuses[0].id_str;
            //Grab and re-tweet it!
            T.post('statuses/retweet/' + `${reTweetId}`, {}, tweeted)
        } else { //If there is an error, run the code below
            console.log(`There was na error with your search!`, error)
        }
    })
}

function tweeted(err, reply) {
    if(err !== undefined) {
        console.log(err)
    } else {
        console.log(`Tweeted: ` + reply)
    }
}


//Re-tweet something as soon as the program runs:
reTweetLatest()


//Re-tweet something after every minute
setInterval(reTweetLatest(), 1000 * 60 * 12);