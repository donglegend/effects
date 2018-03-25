var elAudioBtn = document.querySelector('.audio_btn')
var elAudio = document.querySelector('#sceneaudio')
var elmusiceicon = document.querySelector('#musiceicon')
elAudioBtn.onclick = function() {
    if (elAudio.paused) {
        elAudio.play()
        elmusiceicon.setAttribute('src', './image/musicon.png')
    } else {
        elAudio.pause()
        elmusiceicon.setAttribute('src', './image/musicoff.png')
    }
}
var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: true,
    // initialSlide: 9,
    on: {
        init: function() {
            swiperAnimateCache(this) //隐藏动画元素
            swiperAnimate(this) //初始化完成开始动画
        },
        slideChangeTransitionEnd: function() {
            swiperAnimate(this) //每个slide切换结束时也运行当前slide动画
        }
    }
})
