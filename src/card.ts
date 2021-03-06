/// <reference path="../typings/tsd.d.ts"/>

module pokerapp {
  export class Card{

    private static CARD_NUMBER : string[] = ['?','0','1/2','1','2','3','5','8','13','20','40','100','∞'];
    private static SWIPER_OPTION : SwiperOptions = {
        loop: true,
        pagination: '.swiper-pagination',
      };

    private _fontColor : string;
    private _bgColor : string;
    private _swip : Swiper = null;

    public create(targetContainer : string) : Swiper{
        var target : HTMLElement = this.getDocument().getElementById(targetContainer);
        target.className = targetContainer;

        this._bgColor = this.randomColor();
        this._fontColor = this.createComplementaryColor(this._bgColor);

        this.createCardsDom(target);
        this.createSwiper('.' + targetContainer);
        this.getDocument().bgColor = this._bgColor;

        return this._swip;
    }

    private getDocument() : Document {
      return document;
    }

    private randomColor() : string {
      var color : string = Math.floor(Math.random() * 16777251).toString(16);
      color = '#' + ('000000' + color).slice(-6);
      return color;
    }

    private createComplementaryColor(baseColor : string) : string{
      var r, g, b: number;
      var rComp, gComp, bComp: number;

      r = parseInt(baseColor.substr(-6,2),16);
      g = parseInt(baseColor.substr(-4,2),16);
      b = parseInt(baseColor.substr(-2,2),16);

      var compBase : number = Math.min.apply(null,[r,g,b]) + Math.max.apply(null,[r,g,b]);

      rComp = compBase - r;
      gComp = compBase - g;
      bComp = compBase - b;

      var complementaryColor : string = '#' + ('00' + rComp.toString(16)).slice(-2) + ('00' + gComp.toString(16)).slice(-2) + ('00' + bComp.toString(16)).slice(-2);

      return complementaryColor;
    }

    private createCardsDom(parent : HTMLElement) {
      if(!parent)
        throw Error('target container is null');

      var swiperWrapperElement : HTMLElement = document.createElement('div');
      swiperWrapperElement.className = 'swiper-wrapper';

      for(var num in Card.CARD_NUMBER){
        this.createCardDom(swiperWrapperElement, Card.CARD_NUMBER[num]);
      }

      var paginationElement : HTMLElement = document.createElement('div');
      paginationElement.className = 'swiper-pagination';

      parent.appendChild(swiperWrapperElement);
      parent.appendChild(paginationElement);
    }

    private createCardDom(parent : HTMLElement, cardNumber : string){
        var swiperSlide : HTMLElement = document.createElement('div');
        swiperSlide.className = 'swiper-slide';
        swiperSlide.textContent = cardNumber;
        swiperSlide.style.cssText = 'color : ' + this._fontColor + ';';
        parent.appendChild(swiperSlide);
    }

    private createSwiper(targetContainer : string) {
      this._swip = new Swiper(targetContainer,Card.SWIPER_OPTION);
    }
  }
}
