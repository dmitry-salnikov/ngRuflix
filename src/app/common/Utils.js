/**
* TCD Software
* Created by Dmitrij Rysanow on 29.12.16.
*/
/**
 * Utils for ui services
 *
 * @return {{optimizeTopicData: optimizeTopicData, extractIdFromFeedEntry: extractIdFromFeedEntry}}
 * @export
 * @constructor
 */
module.exports = function () {
    'use strict';
    /**
     * @enum {{Music: string[], Video: string[]}}
     */
    var supportedTypesMap = {
        'Music': ['MP3', 'FLAC', 'OGG'],
        'Video': ['DVD', 'HD', 'Rip']
    };

    /**
     * @param {Array} substrings
     * @param {string} predicate
     * @return {number} number of index of 1st occurency,
     * -1 if not found
     */
    function containsAny(substrings, predicate) {
        var length = substrings.length;
        while (length--) {
            if (predicate.indexOf(substrings[length]) !== -1) {
                return length;
            }
        }
        return -1;
    }

    /**
     * @param {torrentItem} entry
     * @return {torrentItem}
     */
    function determineType(entry) {
        entry.type = 'unknown';
        for (var i in supportedTypesMap) {
            if (supportedTypesMap.hasOwnProperty(i)) {
                var testedType = supportedTypesMap[i];
                if (containsAny(testedType, entry.topic_title) > -1) {
                    entry.type = i.toLowerCase();
                    return entry;
                }
            }
        }
        return entry;
    }
    return {
        /**
         *
         * @param {$http.response} response
         * @return {Array}
         */
        optimizeTopicData: function(response) {
            var arr = [];
            for (var i in response.data.result) {
                if (response.data.result.hasOwnProperty(i)) {
                    var res = response.data.result[i];
                    if (res) {
                        res.id = i;
                        arr.push(res);
                    }
                }
            }
            arr.map(determineType);
            return arr;
        },
        /**
         *
         * @param {*} entry
         * @return {*}
         */
        extractIdFromFeedEntry: function(entry) {
            return entry.link.match(/\d+$/)[0];
        },
        containsAny: containsAny,
        supportedTypesMap: supportedTypesMap
    };
}

