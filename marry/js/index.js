/**
 * Created by pcfm on 2016/9/29.
 */




var time_duration = 1000;
var docuH = document.documentElement.clientHeight,
    allMoveBox = document.getElementsByClassName('swiper-slide');
document.getElementsByClassName('swiper-container').item(0).style.height = docuH + 'px';

/*默认显示page1*/
$(".swiper-wrapper").css({
  "top":-docuH
});

/*浏览器默认的下拉事件,如果不加会导致ios系统下的浏览器事件触发问题*/
document.addEventListener('touchmove', function (event) {
  event.preventDefault();
}, false);
window.onload = function(){
  function page1Hide(){
    var $slideInnerImg =$(".one-slide-inner.slide-inner > img"),
        $innerCenterImg =$(".one-slide-inner .inner-center > img");
    $slideInnerImg.removeClass();
    $innerCenterImg.removeClass();
  }
  function page1Show(){
    var $slideInnerImg =$(".one-slide-inner.slide-inner > img"),
        $innerCenterImg =$(".one-slide-inner .inner-center > img");
    var centerClassName = "one-slide-inner-center-imgShow";
    $($innerCenterImg).each(function(){
      var index = $(this).index()+1;
      $(this).addClass(centerClassName+index);
    });
  }

  function page2Hide(){
    var $innerUpImgWater = $(".two-inner-up > img[data-type='water']"),
        $innerUpImgWe = $(".two-inner-up > img[data-type='we']"),
        $innerUpFlowers = $(".two-inner-up > img[data-type='hua']"),
        $innerDownSave = $(".two-inner-down > img[data-type='save']"),
        $innerDownBird = $(".two-inner-down > img[data-type='bird']"),
        $innerDownWord = $(".two-inner-down > p"),
        $innerDownFlowers = $(".two-inner-down > img[data-type='huashu']");
    $innerUpImgWater.removeClass();
    $innerUpImgWe.removeClass();
    $innerDownSave.removeClass();
    $innerDownBird.removeClass();
    $innerDownWord.removeClass();
    $innerUpFlowers.removeClass();
    $innerDownFlowers.removeClass();
  }
  function page2Show(){
    var $innerUpImgWater = $(".two-inner-up > img[data-type='water']"),
        $innerUpImgWe = $(".two-inner-up > img[data-type='we']"),
        $innerUpFlowers = $(".two-inner-up > img[data-type='hua']"),
        $innerDownSave = $(".two-inner-down > img[data-type='save']"),
        $innerDownBird = $(".two-inner-down > img[data-type='bird']"),
        $innerDownFlowers = $(".two-inner-down > img[data-type='huashu']"),
        $innerDownWord = $(".two-inner-down > p");
    $innerUpImgWater.addClass("showWater");
    $innerUpImgWe.addClass("showWe");
    $innerUpFlowers.addClass("showFlowers");
    $innerDownSave.addClass("saveShow");
    $innerDownBird.addClass("birdShow");
    $innerDownWord.addClass("showWord");
    $innerDownFlowers.addClass("showFlowers");
    var timer1 = setTimeout(function(){
      $innerUpImgWater.removeClass().addClass("two-rotateInfinite");
      clearTimeout(timer1);
      timer1 = null;
    },3*time_duration)
  }

    function page3Show(){
      var $innerUpFlowers = $(".three-inner-up > img[data-type='huashu']"),
          $innerDownGrass = $(".three-inner-down > img[data-type='grass']"),
          $innerUpBirds = $(".three-inner-up> img[data-type='bird']"),
          $innerDownBirds = $(".three-inner-down> img[data-type='bird']"),
          $innerUpWe = $(".three-inner-up > img[data-type='photo']"),
          $innerDownWe = $(".three-inner-down > img[data-type='photo']"),
          $love = $(".three-slide-inner > img[data-type='love']");
        $innerUpWe.addClass("showPhoto");
        $innerDownWe.addClass("showPhoto");
        $innerUpBirds.addClass("showBird");
        $innerDownBirds.addClass("showBird");
        $love.addClass("showLove");
        $innerUpFlowers.addClass("showFlowers");
        $innerDownGrass.addClass("showGrass");

    }
    function page3Hide(){
      var $innerUpFlowers = $(".three-inner-up > img[data-type='huashu']"),
          $innerDownGrass = $(".three-inner-down > img[data-type='grass']"),
          $innerUpBirds = $(".three-inner-up> img[data-type='bird']"),
          $innerDownBirds = $(".three-inner-down> img[data-type='bird']"),
          $innerUpWe = $(".three-inner-up > img[data-type='photo']"),
          $innerDownWe = $(".three-inner-down > img[data-type='photo']"),
          $love = $(".three-slide-inner > img[data-type='love']");
      $innerUpWe.removeClass();
      $innerDownWe.removeClass();
      $innerUpBirds.removeClass();
      $innerDownBirds.removeClass();
      $love.removeClass();
      $innerUpFlowers.removeClass();
      $innerDownGrass.removeClass();
    }

    function page4Show(){
      var $centerFlower = $(".four-inner-up > img[data-property='hua']"),
          $innerUpFlower = $(".four-inner-up > img[data-property='huashu']"),
          $innerUpMe = $(".four-inner-up > img[data-property='me']"),
          $innerUpWe = $(".four-inner-up > img[data-property='we']"),
          $innerDownFlower = $(".four-inner-down > img[data-property='huashu']"),
          $innerDownHe = $(".four-inner-down > img[data-property='he']"),
          $innerDownWe = $(".four-inner-down > img[data-property='we']"),
          $wordHappy = $(".four-slide-inner > img[data-property='happy']"),
          $wordMoments = $(".four-slide-inner > img[data-property='moments']");
      $innerUpMe.addClass("showPeople");
      $innerDownHe.addClass("showPeople");
      $centerFlower.addClass("showFlower");
      $innerUpFlower.addClass("showFlowers");
      $innerDownFlower.addClass("showFlowers");
      $innerUpWe.addClass("showWe");
      $innerDownWe.addClass("showWe");
      $wordHappy.addClass("flyIn");
      $wordMoments.addClass("flyIn");
    }
    function page4Hide(){
      var $centerFlower = $(".four-inner-up > img[data-property='hua']"),
          $innerUpFlower = $(".four-inner-up > img[data-property='huashu']"),
          $innerUpMe = $(".four-inner-up > img[data-property='me']"),
          $innerUpWe = $(".four-inner-up > img[data-property='we']"),
          $innerDownFlower = $(".four-inner-down > img[data-property='huashu']"),
          $innerDownHe = $(".four-inner-down > img[data-property='he']"),
          $innerDownWe = $(".four-inner-down > img[data-property='we']"),
          $wordHappy = $(".four-slide-inner > img[data-property='happy']"),
          $wordMoments = $(".four-slide-inner > img[data-property='moments']");
      $innerUpMe.removeClass();
      $innerDownHe.removeClass();
      $centerFlower.removeClass();
      $innerUpFlower.removeClass();
      $innerDownFlower.removeClass();
      $innerUpWe.removeClass();
      $innerDownWe.removeClass();
      $wordHappy.removeClass();
      $wordMoments.removeClass();
    }
    function page5Show(){
      var $window = $(".five-inner > img[data-type='window']"),
          $we = $(".five-inner > img[data-type='we']"),
          $word = $(".five-inner > p[data-type='word']"),
          $innerUpLove = $(".five-inner-up > img[data-type='love']"),
          $innerUpBird = $(".five-inner-up > img[data-type='bird']"),
          $innerUpHua = $(".five-inner-up > img[data-type='hua']"),
          $innerDownFlowers = $(".five-slide-inner .two-inner-down > img[data-type='huashu']");
      $window.addClass("showWindow");
      $we.addClass("showWe");
      $word.addClass("showWord");
      $innerUpLove.addClass("showLove");
      $innerUpBird.addClass();
      $innerUpHua.addClass("showFlower");
      $innerDownFlowers.addClass("showFlower");
    }
    function page5Hide(){
      var $window = $(".five-inner > img[data-type='window']"),
          $we = $(".five-inner > img[data-type='we']"),
          $word = $(".five-inner > p[data-type='word']"),
          $innerUpLove = $(".five-inner-up > img[data-type='love']"),
          $innerUpBird = $(".five-inner-up > img[data-type='bird']"),
          $innerUpHua = $(".five-inner-up > img[data-type='hua']"),
          $innerDownFlowers = $(".five-slide-inner .two-inner-down > img[data-type='huashu']");
      $window.removeClass();
      $we.removeClass();
      $word.removeClass();
      $innerUpLove.removeClass();
      $innerUpBird.removeClass();
      $innerUpHua.removeClass();
      $innerDownFlowers.removeClass();
    }


  $(".swiper-slide").css({
    "height":docuH
  }).on("touchmove",function(e){
  }).tap(function(e){
  }).swipe(function(){
  }).swipeUp(function(e){//向上滑动
    /*实际有copy1,1,2,3,4,5,copy5共七屏。视觉呈现的就5屏。由于显示1~5屏，所以对应的索引值不需要再-1。*/
    var index = $(this).index(),
        allIndex = $('.swiper-slide').length-2;
    var $wrapper = $(".swiper-wrapper");
    if(index > allIndex)return;
    if(!$wrapper.hasClass("swiper-wrapper-duration")){
      $wrapper.addClass("swiper-wrapper-duration");
    }
    $wrapper.css({
      "top":-((index+1)*docuH)
    });
    switch(index){
      case 1:
        if(!$wrapper.hasClass("swiper-wrapper-duration")){
          $wrapper.addClass("swiper-wrapper-duration");
          $wrapper.css({
            "top":-2*docuH
          });
        }
        page2Show();
        page1Hide();
        break;
      case 2:

        page3Show();
        page2Hide();
        break;
      case 3:
        page3Hide();
        page4Show();
        break;
      case 4:

        page5Show();
        page4Hide();
        break;
      case 5:
        window.timeOut = setTimeout(function(){
          $wrapper.removeClass("swiper-wrapper-duration");
          $wrapper.css({
            "top":-docuH
          });
          window.clearTimeout(window.timeOut);
          window.timeOut = null;
        },time_duration);
        page1Show();
        page5Hide();
        break;
    }
  }).swipeDown(function(e){
    console.log("Down!!!!");
    var index = $(this).index(),
        allIndex = $('.swiper-slide').length-2;
    var $wrapper = $(".swiper-wrapper");
    if(index == 0)return;
    if(!$wrapper.hasClass("swiper-wrapper-duration")){
      $wrapper.addClass("swiper-wrapper-duration");
    }
    $wrapper.css({
      "top":-(index-1)*docuH
    });
    switch(index){
      case 1:
        window.timeOut = setTimeout(function(){
          $wrapper.removeClass("swiper-wrapper-duration");
          $wrapper.css({
            "top":-allIndex*docuH
          });
          window.clearTimeout(window.timeOut);
          window.timeOut = null;
        },time_duration);
        page5Show();
        page1Hide();
        break;
      case 2:
        page1Show();
        page2Hide();
        break;
      case 3:
        page2Show();
        page3Hide();
        break;
      case 4:
        page3Show();
        page4Hide();
        break;
      case 5:
        page4Show();
        page5Hide();
        if(!$wrapper.hasClass("swiper-wrapper-duration")){
          $wrapper.addClass("swiper-wrapper-duration");
          $wrapper.css({
            "top":-(allIndex-1)*docuH
          });
        }
        break;
    }
  });
  /*$($(".swiper-slide")).each(function(n,v){
    $(this).trigger("swipeUp");
  });*/
  //page1Show();
  //page1Hide();
  //page2Show();
  //page2Hide();
  //page3Show();
  //page3Hide();
  //page4Show();
  //page4Hide();
  //page5Show();
  //page5Hide();
  //window.setTimeout(function(){
  //  page3Show();
  //  page3Hide();
  //},1000)
  //window.setTimeout(function(){
  //  page4Show();
  //  page4Hide();
  //},1000)
  //window.setTimeout(function(){
  //  page5Show();
  //  page5Hide();
  //},1000)
  $(".loading").addClass("hide");
  page1Show();
};
