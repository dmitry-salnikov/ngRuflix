/**
 * Created by tcd on 15.08.17.
 */
import TweenLite from "gsap";

export default function() {
    return {
        enter: function (element, done) {
            TweenLite.fromTo(element, 0.2, {scale: 0}, {scale:1, ease: Power2.easeIn, onComplete: done});
        }
    }
}