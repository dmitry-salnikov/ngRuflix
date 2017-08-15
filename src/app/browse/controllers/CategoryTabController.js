/**
* Created by tcd on 25.01.17.
*/
/**
 *
 * @param {!angular.Scope} $scope
 * @param {*} $stateParams
 * @param {Loki} Loki
 * @constructor
 * @export
 */
module.exports = function ($scope, $stateParams, Loki) {
    'use strict';

    /**
     * Contains queries to database.
     * Every controller that uses Loki should contain that function
     *
     * @return {LokiQueries}
     * @constructor
     */
    function LokiQueries() {
        return {
            /**
             * @param {number} id category
             * @return {*} Category Object
             */
            getCategoryById: function(id) {
                return Loki.getCategoriesDTO().find({id: id})[0];
            },
            /**
             * @param {number} id of category
             * @return {array} Array of children forums
             */
            getCategoryChildrenById: function(id) {
                return Loki.getForumsDTO().where(function(obj) {
                    return obj.category === id && obj.type === 'forum';
                });
            },
            /**
             * @param {number} id of forum
             * @return {*} Forum Object
             */
            getForumById: function(id) {
                return Loki.getForumsDTO().find({id: id})[0];
            },
            /**
             * @param {number} id of forum
             * @return {array} Array of its subforums
             */
            getSubforumsByForumId: function(id) {
                return Loki.getForumsDTO().find({parent: id});
            }
        };
    }

    /**
     * Id of displayed category
     * @type {number}
     */
    $scope.id = 0;

    /**
     * Visible category objects. Could be different than tree structure
     * @type {Array}
     */
    $scope.categoryViewObjects = [];

    function init() {
        $scope.id = $stateParams.id;
        var subCategories = $stateParams.subCategories;
        var forums = $stateParams.forums;
        if (subCategories) {
            subCategories.forEach(function(subCategory) {
                $scope.categoryViewObjects.push(
                    getCategoryViewObject(
                        new LokiQueries().getCategoryById(subCategory),
                        new LokiQueries().getCategoryChildrenById(subCategory)
                    )
                );
            });
        }
        if (forums) {
            forums.forEach(function(forum) {
                $scope.categoryViewObjects.push(
                    getCategoryViewObject(
                        new LokiQueries().getForumById(forum),
                        new LokiQueries().getSubforumsByForumId(forum)
                    ));
            });
        }
    }

    /**
     * Gets object that directive CategoryView requires
     *
     * @param {{category: *, children: array}} categoryObj
     * @param {array} children
     * @return {{category: *, children: array}}
     */
    function getCategoryViewObject(categoryObj, children) {
        return {
            category: categoryObj,
            children: children
        };
    }

    init();
}
