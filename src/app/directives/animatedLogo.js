/**
 * Created by tcd on 15.08.17.
 */
import {TimelineMax} from 'gsap';
import 'gsap/EasePack';
export default function() {
    return {
        template: '<img src="/public/img/logo.png" class="logo">',
        restrict: 'E',
        transclude: true,
        link: function (scope, element) {
            let image = element[0].querySelector('img');
            let tl = new TimelineMax({repeat: -1});
            tl
                .to(image, 0.5, {css: {
                    rotation: 360,
                    transformOrigin: 'center center'
                }, ease: Power0.easeNone, force3D: true, repeat: -1}, 0)
                .to(image, 1, {scale:1.4, ease: Elastic.easeOut.config(1, 0.5), repeat: -1}, 2);

        }
    }
}