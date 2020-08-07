<template>
  <div class="container">
    <div style="margin:10px;">
      <el-form :inline="true">
        <el-form-item label="商品名称">
          <el-input v-model="listQuery.goods_name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品条码">
          <el-input v-model="listQuery.goods_code" placeholder="商品条码"></el-input>
        </el-form-item>
        <el-date-picker v-model="listQuery.timeRange" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
        </el-date-picker>
      </el-form>
      <el-button @click="findPrintList"> 查询 </el-button>
      <el-button @click="printBtn"> 打印 </el-button>
      <el-button @click="product"> 生成 </el-button>
    </div>
    <div id="printJS-form">
      <div class="con">
        <template v-for="(item,index) in goodsList">
          <div class="goods-card" :key="index">
            <div class="goods-retail-price">
              <svg class="barcode"  :jsbarcode-value="item.goods_code" jsbarcode-textmargin="0" jsbarcode-fontoptions="bold" :jsbarcode-text="item.goods_name" jsbarcode-width=2
              jsbarcode-height=40
              jsbarcode-fontsize=12>
              </svg>
            </div>
            <!--  <div v-if="(index!=0)&&(index%18==0)" style="page-break-after:always" :key="index"></div> -->
           </div> 
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import JsBarcode from 'jsbarcode';
import { getPrintGoodsList } from '@/api/goods';
import { fenToyuan } from "@/utils/index";
export default {
  data: function() {
    return {
      goodsList: [],
      listQuery: {
        timeRange: '',
        goods_name: '',
        goods_code: ''

      }

    }
  },

  methods: {

    printBtn() {

      printJS({
        printable: 'printJS-form',
        type: 'html',
        targetStyles: ['*'],
        style: 'html,body,div{height: auto!important;}'
      })
    },
    findPrintList() {
      if (this.listQuery.timeRange != '') {

        getPrintGoodsList(this.listQuery).then(res => {
          res.datalist.map(item => {
            item.sub = (fenToyuan(item.sku_retail_price) - fenToyuan(item.reference_price_one)).toFixed(2);
            item.sku_retail_price = (fenToyuan(item.sku_retail_price)).toFixed(2);
            item.reference_price_one = (fenToyuan(item.reference_price_one)).toFixed(2);
          })
          this.goodsList = res.datalist;
          this.$nextTick(function () {
            JsBarcode(".barcode").init();
          })
          

        })
      }


    },
    product(){
      JsBarcode(".barcode").init();
    },
    // barcode() {
    //   let barCode = "12345678"
    //   JsBarcode("#barcode", "Hi world!", {
    //     format: "CODE128", //选择要使用的条形码类型
    //     text: barCode, //显示文本
    //     displayValue: true, //是否在条形码下方显示文字
    //     textPosition: "bottom", //设置文本的垂直位置
    //     fontOptions: "bold italic", //使文字加粗体或变斜体
    //     background: "#eee", //设置条形码的背景
    //     font: "fantasy", //设置文本的字体
    //     lineColor: "#000", //设置条和文本的颜色。
    //     margin: 0, //设置条形码周围的空白边距
    //     width: 1,
    //     height: 40,
    //     fontSize: 12,

    //   })
    // },
  },
  mounted: function() {
    //this.barcode();
  },
  created: function() {


  }
}

</script>
<style scoped lang="css">
.con {
  /* height: 1170px; */
  /* background-color: yellow; */
  width: 794px;
  /* display: flex; */
  /* flex-wrap: wrap; */

}

.goods-card {

  display: inline-block;
  flex-direction: column;
  margin-left: 50px;
  margin-bottom: 60px;

}

.goods-name {  
  font-size: 14px;
  font-weight: bold;
  /* background: yellow; */
}

.goods-retail-price {



}



</style>
