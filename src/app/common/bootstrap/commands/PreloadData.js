/**
* TCD Software
* Created by Dmitrij Rysanow on 29.12.16.
*/
/**
 * Saving requests to loki
 *
 * @return {*|Promise.<TResult>}
 * @constructor
 * @ngInject
 */
module.exports = function (RutrackerAPI, Loki) {
    'use strict';

    /**
     * Cleans preloaded data, not syncing
     */
    function cleanData() {
        var collections = [Loki.getFeedDTO(),
            Loki.getCategoriesDTO(), Loki.getForumsDTO()];
        for (var i in collections) {
            while (Loki.getFeedDTO().data[0]) {
                collections[i].remove(Loki.getFeedDTO().data[0]);
            }
        }
    }

    /**
     * Saves categories tree in Loki and syncs DB,
     * resolves when data is synced
     *
     * @todo refactor
     * @param dataArray
     * @return {Promise}
     */
    function saveTree(dataArray) {
        var categoriesNames = dataArray.data.result.c,
            forumNames = dataArray.data.result.f,
            tree = dataArray.data.result.tree;

        if (dataArray.length === 0) {
            return Loki.saveChanges();
        }
        //saving tree
        for (var i in tree) {
            if (tree.hasOwnProperty(i)) {
                var category = {
                    id: parseInt(i),
                    name: categoriesNames[i]
                };
                Loki.getCategoriesDTO().insert(category);
                var children = tree[i];
                for (var j in children) {
                    if (children.hasOwnProperty(j)) {
                        var forum = {
                            id: parseInt(j),
                            name: forumNames[j],
                            parent: null,
                            type: 'forum',
                            category: category.id
                        };
                        Loki.getForumsDTO().insert(forum);
                        for (var k in children[j]) {
                            if (children[j].hasOwnProperty(k)) {
                                var subForum = {
                                    id: parseInt(children[j][k]),
                                    name: forumNames[children[j][k]],
                                    category: category.id,
                                    parent: forum.id,
                                    type: 'subforum'
                                };
                                Loki.getForumsDTO().insert(subForum);
                            }
                        }
                    }
                }
            }
        }

        return Loki.saveChanges();
    }

    /**
     * Saves feed in Loki and syncs DB, resolves when data is synced
     *
     * @param dataArray
     * @return {Promise}
     */
    function saveFeed(dataArray) {
        if (dataArray.length === 0) {
            return Loki.saveChanges();
        }
        console.log('Saving to db', dataArray);
        Loki.getFeedDTO().insert(dataArray);

        return Loki.saveChanges();
    }

    /**
     * Saves current date as last sync time
     */
    function saveSyncTime() {
        var lastSync = Loki.getLastSyncDTO().data[0];
        if (!lastSync) {
            Loki.getLastSyncDTO().insert(new Date());
        }
    }

    return {
        /**
         * Syncs the Feed and Category Tree if last sync was older than day
         * @return {*|Promise.<TResult>}
         */
        run: function() {
            var lastSync = Loki.getLastSyncDTO().data[0];
            if (!lastSync) {
                saveSyncTime();
                cleanData();
                console.log('Preload data command');
            } else {
                return true;
            }
            return RutrackerAPI.getTree()
                .then(saveTree)
                .then(RutrackerAPI.getFeed.bind(RutrackerAPI))
                .then(saveFeed);
        }
    };
};
