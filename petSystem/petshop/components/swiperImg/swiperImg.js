// components/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type: Array
    },
    swiperHeight: {
      type: String
    },
    aspectFit: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 500,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})