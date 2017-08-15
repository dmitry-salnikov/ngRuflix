/**
 * TCD Software
 * Created by Dmitrij Rysanow on 19.02.17.
 */
module.exports = function () {
    return function(seconds) {
        return new Date(0, 0, 0).setSeconds(Math.floor(seconds));
    };
};


