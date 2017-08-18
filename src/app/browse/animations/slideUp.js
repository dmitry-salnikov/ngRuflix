/**
 * Created by tcd on 15.08.17.
 */
import TweenLite from "gsap";
export default function() {
    return {
        addClass: function (element, className, done) {
            if (className !== "ng-hide") {
                done();
                return;
            }
            TweenLite.fromTo(element, 0.5, {x: -100},
                {
                    autoAlpha:1,
                    x:0,
                    onComplete: done
                });
        }
    }
}