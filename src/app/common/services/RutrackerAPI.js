/**
 * TCD Software
 * Created by Dmitrij Rysanow on 16.11.16.
 */
/** Rutracker API endpoints
 *
 * @param {!angular.$http} $http
 * @param {!angular.$q} $q
 * @param {Utils} Utils
 * @return {{makeSession: makeSession, checkoutSession: checkoutSession, getTopicData: getTopicData, getFeed: getFeed, getTree: getTree, search: search}}
 * @export
 * @ngInject
 */
module.exports = function ($http, $q, Utils) {
    var _endpoint = 'http://localhost:7000';
    var TORRENTS_AT_ONCE = 40;
    return {
        /**
         * Login node to your credentials.
         * Authorization is needed for searching.
         * @param {{username: string, password: string}} credentials
         * @return {Promise}
         */
        makeSession: function (credentials) {
            return $http.post(_endpoint + '/login', credentials);
        },
        /**
         * Find out logged user, if any
         * @return {Promise}
         */
        checkoutSession: function () {
            return $http.get(_endpoint + '/checklogin');
        },
        /**
         * Gets List<TorrentItem>
         * @param {Array} topicsIds
         * @return {*|Promise.<TResult>}
         */
        getTopicData: function (topicsIds) {
            return $http
                .get(_endpoint +
                    '/rutrackerapi/v1/get_tor_topic_data?by=topic_id&val=' +
                    topicsIds.join(','))
                .then(Utils.optimizeTopicData);
        },
        /**
         * Gets feed from server and transforms \
         * to List<TorrentItems>
         * @this
         * @return {Promise<Array<torrentItem>>}
         */
        getFeed: function () {
            function process(response) {
                return response.data.map(Utils.extractIdFromFeedEntry);
            }

            return $http
                .get(_endpoint + '/feed')
                .then(process)
                .then(this.getTopicData);
        },
        /**
         * Gets category tree from server.
         * There are Ids - Names hashmap and Tree with ids inside
         * @return {Promise}
         */
        getTree: function () {
            return $http
                .get(_endpoint + '/rutrackerapi/v1/static/cat_forum_tree');
        },
        /**
         * Gets torrents from subforum
         * @this
         * @param {number} subfotumId
         * @param {number=} optional number of first records to skip
         * @return {Promise}
         */
        getTorrentsInSubforum: function (subfotumId, skip) {
            var process = function (response, skip) {
                if (!skip) {
                    skip = 0;
                }
                var results = [];
                Object.keys(response.data.result).forEach(function (result) {
                    results.push({id: result, seeders: response.data.result[result][1]});
                });
                results = _.chain(results)
                    .reject(function (item) {
                        return !item.seeders;
                    })
                    .sortBy(function (item) {
                        return -item.seeders;
                    })
                    ._wrapped
                    .slice(skip, (TORRENTS_AT_ONCE + skip))
                    .map(function (item) {
                        return item.id;
                    });

                return results;
            };
            return $http
                .get(_endpoint + '/rutrackerapi/v1/static/pvc/f/' +
                    subfotumId)
                .then(function (data) {
                    return process(data, skip);
                })
                .then(this.getTopicData);
        },
        /**
         * Runs search and resolves with List<TorrentItems>
         * @param {string} query for now just string with text
         * @param {object} search options
         * @this
         * @return {Promise}
         */
        search: function (query, options) {
            var req = {
                method: 'POST',
                url: _endpoint + '/search',
                headers: {
                    'Accept': 'application/json;charset=windows-1251',
                    'Accept-Charset': 'charset=windows-1251'
                },
                data: {query: query, options: options}
            };

            function transformToIds(entries) {
                var defer = $q.defer();
                var ids = entries.data.map(function (entry) {
                    return parseInt(entry.id);
                });
                defer.resolve(ids);
                return defer.promise;
            }

            return $http(req)
                .then(transformToIds)
                .then(this.getTopicData);
        },
        getFiles: function (torrentId) {
            return $http.get(_endpoint + /getFiles/ + torrentId);
        },
        getEndpoint: function () {
            return _endpoint;
        }
    };

};
