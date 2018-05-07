const T = require('./Twit.js');
const my_user_name = require('../config').userName;

const timeOut = 1000 * 60 * 1;

const AutoDM = () => {
    const stream = T.stream('user');
    console.log('Start Sending Msgs...');
    stream.on('follow', SendMessage);
};

const SendMessage = user => {
    const { screen_name, name } = user.source;

    const obj = {
        screen_name,
        text: GenerateMessage(name)
    };
    // the follow stream track if I follow author person too.
    if (screen_name != my_user_name) {
        console.log(`We have a new follower! Name is ${screen_name}!`);
        setTimeout(() => {
            T.post("direct_messages/new", obj)
                .catch(err => {
                    console.error("error", err.stack);
                })
                .then(result => {
                    console.log(`Message sent successfully To  ${screen_name}`);
                });
        }, timeout);
    }
};


const GenerateMessage = name => {
    return `Hi ${name}! Thanks for being a part of my network! I am Koleen and feel free to send me a DM, anytime ;)`;
};

module.exports = AutoDM;    