/**
* TCD Software
* Created by Dmitrij Rysanow on 29.12.16.
*/
import LokiDb from 'lokijs';
import LokiIndexedAdapter from 'lokijs/build/loki-indexed-adapter.min';

/**
 * Contains database objects
 * @param {angular.$q} $q
 * @constructor
 * @ngInject
 */
module.exports = function ($q) {
    'use strict';
    var db = {};
    var feed, categories, forums, langs, lastSync, likes;


    function onDBLoaded(callback) {
        feed = db.getCollection('feed') ||
            db.addCollection('feed', {unique: ['id']});
        categories = db.getCollection('categories') ||
            db.addCollection('categories', {unique: ['id']});
        forums = db.getCollection('forums') ||
            db.addCollection('forums', {unique: ['id']});
        langs = db.getCollection('langs') ||
            db.addCollection('langs', {unique: ['id']});
        lastSync = db.getCollection('lastSync') ||
            db.addCollection('lastSync');
        likes = db.getCollection('likes') ||
            db.addCollection('likes', {unique: ['id']});
        console.log('LokiJS ready');
        callback();
    }

    return {
        init: function() {
            let defer = $q.defer();
            let configObject = {
                autosave: false,
                adapter: new LokiIndexedAdapter('Ruflix-db')
            };
            db = new LokiDb('localDB', configObject);
            onDBLoaded(() => defer.resolve());
            return defer.promise;
        },
        /**
         * Saves database to it's resource
         * @return {Promise}
         */
        saveChanges: function() {
            let defer = $q.defer();
            console.log('LokiJS saving changes');
            db.saveDatabase(defer.resolve);
            return defer.promise;
        },
        /**
         * Gets feed DataObject
         * @return {*}
         */
        getFeedDTO: function() {
            return feed;
        },
        /**
         * Gets categories DataObject
         * @return {*}
         */
        getCategoriesDTO: function() {
            return categories;
        },
        /**
         * Gets forums DataObject
         * @return {*}
         */
        getForumsDTO: function() {
            return forums;
        },
        /**
         * Gets forums DataObject
         * @return {*}
         */
        getLastSyncDTO: function() {
            return lastSync;
        },
        /**
         * Gets forums DataObject
         * @return {*}
         */
        getLangsDTO: function() {
            return langs;
        },
        /**
         * Get likes
         * @returns {*}
         */
        getLikesDTO: function() {
            return likes;
        }
    };
};
