/**
 * @interface
 * @export
 */

export default function IAbstractPlayerListener() {}
/**
 * Calls when Player activates
 */
IAbstractPlayerListener.prototype.activate = function() {};
/**
 * Calls every PlayerService.UPDATE_INTERVAL, returning status object
 * (see PlayerService.getStatusObject)
 * @param {*} status
 */
IAbstractPlayerListener.prototype.updateStatus = function(status) {};
