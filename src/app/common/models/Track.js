/**
 * Created by tcd on 15.08.17.
 */
export class Track {
    constructor(args) {
        this.id = 0;
        this.name = '';
        this.length = 0;
        this.mime = '';
        this.link = '';
        this.index = '';
        this.metadata = '';

        if (args) {
            var fields = Object.keys(this);
            for (var i in fields) {
                if (args.hasOwnProperty(fields[i])) {
                    this[fields[i]] = args[fields[i]];
                }
            }
        }
    }
}