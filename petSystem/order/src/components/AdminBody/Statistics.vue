<template>
  <div class="statistics">
    <div id="goodmain" style="width: 600px;height:400px;"></div>
    <div id="servemain" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    drawChartGood() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("goodmain"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "同类型商品数量统计",
          subtext: "按商品种类区分",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "plain",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: this.goodList.legendData,

          selected: this.goodList.selected
        },
        series: [
          {
            name: "种类",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: this.goodList.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawChartServe() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("servemain"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "同类型服务数量统计",
          subtext: "按服务种类区分",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "plain",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: this.serviceList.legendData,

          selected: this.serviceList.selected
        },
        series: [
          {
            name: "种类",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: this.serviceList.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    GoodList() {
      $.ajax({
        type: "post",
        url:
          "http://localhost:9999/petSystemServer/adminBody/showStatisticsBeanGood",
        data: {},
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          this.goodList.seriesData = res.statisticsBeanGoodList;
          this.serviceList.seriesData = res.statisticsBeanServiceList;
          this.drawChartGood();
          this.drawChartServe();
        }
      });
    },
    ServiceList() {}
  },
  mounted() {
    this.GoodList();
  },
  data() {
    return {
      goodList: {
        legendData: ["主粮", "零食", "日常用品", "药品"],
        selected: { 主粮: true, 零食: true, 日常用品: true, 药品: true }
      },
      serviceList: {
        legendData: ["宠物寄养", "宠物美容", "宠物医疗", "宠物摄影"],
        selected: {
          宠物寄养: true,
          宠物美容: true,
          宠物医疗: true,
          宠物摄影: true
        }
      }

      // seriesData: []
    };
  }
};
</script>

<style scoped>
.statistics{
  display: flex;
}
</style>