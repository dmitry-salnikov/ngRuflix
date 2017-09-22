/**
* Created by tcd on 25.01.17.
*/
/**
 *
 * @param {!angular.Scope} $scope
 * @param {*} $stateParams
 * @param {CategoriesHelper} CategoriesHelper
 * @constructor
 * @export
 */
export default function ($scope, $stateParams, CategoriesHelper) {
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
        let groupId = $stateParams.groupId;
        console.log('groupId', groupId);
        let categories = CategoriesHelper.getCategoriesInGroup(groupId);
        console.log('categories', categories);
        categories.forEach((value, index) => {
            $scope.categoryViewObjects.push(
                getCategoryViewObject(
                    value,
                    value.forums
                )
            );
        })

        console.log($scope.categoryViewObjects);
    }

    function getCategoriesByGroupId(groupId) {

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
