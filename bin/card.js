/// <reference path="../typings/tsd.d.ts"/>
var pokerapp;
(function (pokerapp) {
    var Card = (function () {
        function Card() {
            this._swip = null;
        }
        Card.prototype.create = function (targetContainer) {
            var target = this.getDocument().getElementById(targetContainer);
            target.className = targetContainer;
            this._bgColor = this.randomColor();
            this._fontColor = this.createComplementaryColor(this._bgColor);
            this.createCardsDom(target);
            this.createSwiper('.' + targetContainer);
            this.getDocument().bgColor = this._bgColor;
            return this._swip;
        };
        Card.prototype.getDocument = function () {
            return document;
        };
        Card.prototype.randomColor = function () {
            var color = Math.floor(Math.random() * 16777251).toString(16);
            color = '#' + ('000000' + color).slice(-6);
            return color;
        };
        Card.prototype.createComplementaryColor = function (baseColor) {
            var r, g, b;
            var rComp, gComp, bComp;
            r = parseInt(baseColor.substr(-6, 2), 16);
            g = parseInt(baseColor.substr(-4, 2), 16);
            b = parseInt(baseColor.substr(-2, 2), 16);
            var compBase = Math.min.apply(null, [r, g, b]) + Math.max.apply(null, [r, g, b]);
            rComp = compBase - r;
            gComp = compBase - g;
            bComp = compBase - b;
            var complementaryColor = '#' + ('00' + rComp.toString(16)).slice(-2) + ('00' + gComp.toString(16)).slice(-2) + ('00' + bComp.toString(16)).slice(-2);
            return complementaryColor;
        };
        Card.prototype.createCardsDom = function (parent) {
            if (!parent)
                throw Error('target container is null');
            var swiperWrapperElement = document.createElement('div');
            swiperWrapperElement.className = 'swiper-wrapper';
            for (var num in Card.CARD_NUMBER) {
                this.createCardDom(swiperWrapperElement, Card.CARD_NUMBER[num]);
            }
            var paginationElement = document.createElement('div');
            paginationElement.className = 'swiper-pagination';
            parent.appendChild(swiperWrapperElement);
            parent.appendChild(paginationElement);
        };
        Card.prototype.createCardDom = function (parent, cardNumber) {
            var swiperSlide = document.createElement('div');
            swiperSlide.className = 'swiper-slide';
            swiperSlide.textContent = cardNumber;
            swiperSlide.style.cssText = 'color : ' + this._fontColor + ';';
            parent.appendChild(swiperSlide);
        };
        Card.prototype.createSwiper = function (targetContainer) {
            this._swip = new Swiper(targetContainer, Card.SWIPER_OPTION);
        };
        Card.CARD_NUMBER = ['?', '0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '∞'];
        Card.SWIPER_OPTION = {
            loop: true,
            pagination: '.swiper-pagination',
        };
        return Card;
    })();
    pokerapp.Card = Card;
})(pokerapp || (pokerapp = {}));
//# sourceMappingURL=card.js.map