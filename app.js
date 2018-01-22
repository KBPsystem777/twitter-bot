
var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

//Search Parameters

var params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'

}

T.get('search/tweets', params, function(err, data, response) {
    if (!err) {
        //Do Something
        //LOOP THROUGH THE RETURNED TWEETS//
        for(let i=0; i < data.statuses.lenght; i++) {
            //GET THE TWEET ID FROM THE RETURNED DATA//
            let id = { id: data.statuses[i].id_str}
            //TRYING TO FAVORITE SELECTED TWEET//
            T.post('favorites/create', id, function(err, response) {
                //IF FAVORITE FAILSM LOG THE ERROR MESSSAGE//
                if(err) {
                    console.log(err[0].message);
                } else { //IF FAVORITE IS SUCCESSFUL, LOG THE URL OF THE TWEET//
                    let username = response.user.screen_name;
                    let tweetID = response.id_str;
                    console.log('Favorited: ', `https://twiter.com/${username}/status/${tweetID}`)
                }
            });
        }
    } else {
        console.log(err);
    }
})
