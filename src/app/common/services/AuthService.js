/**
 * TCD Software
 * Created by Dmitrij Rysanow on 16.11.16.
 */
/**
 * Helps app authenticate itself
 *
 * @param {*} RutrackerAPI
 * @return {*}
 * @constructor
 * @ngInject
 * @export
 */
module.exports = function (RutrackerAPI) {
    /**
     * Session container
     * @typedef {{logged: boolean}}
     */
    var session = {};

    /**
     * @type {boolean}
     */
    var enabled = true;

    return {
        /**
         *
         * @return {session}
         */
        getSession: function() {
            return session;
        },
        /**
         * Login in
         *
         * @param {{username: string, password: string}} credentials
         * @return {*|Promise.<session>}
         */
        makeSession: function(credentials) {
            return RutrackerAPI.makeSession(credentials).then(function(data) {
                session = data.data;
                if (session.logged) {
                    session.username = credentials.username;
                }
                return session;
            });
        },
        /**
         * Checks session status and saves it
         * @return {*|Promise.<session>}
         */
        checkoutSession: function() {
            return RutrackerAPI.checkoutSession().then(function(data) {
                if (data.data.logged) {
                    session.username = data.data.username;
                }
                return data.data;
            });
        },
        /**
         * Check AuthService status
         * @return {boolean}
         */
        getEnabled: function() {
            return enabled;
        },
        /**
         * A way to disable Auth
         * @param {boolean} status
         */
        setEnabled: function(status) {
            enabled = status;
        }
    };
};
