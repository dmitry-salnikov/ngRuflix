/**
 * Created by tcd on 15.08.17.
 */
import TweenLite from "gsap";

export default function () {
    return {
        enter: function (element, done) {
            TweenLite.to(element, 1, {autoAlpha:0, onComplete: done});
        }
    }
};
