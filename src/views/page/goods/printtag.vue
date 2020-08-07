<template>
    <div class="container">

         <div style="margin:10px;">
             <el-form  :inline="true">
                <el-form-item label="商品名称">
                    <el-input v-model="listQuery.goods_name" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品条码">
                    <el-input v-model="listQuery.goods_code" placeholder="商品条码"></el-input>
                </el-form-item>
               <el-form-item label="商品分类">
                 <el-cascader
                   expand-trigger="hover"
                   :options="categoryOption"
                   :props="props"
                   v-model="listQuery.goods_type_ids"
                 >
                 </el-cascader>

               </el-form-item>

              <el-date-picker
                v-model="listQuery.timeRange"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']">
                </el-date-picker>
             </el-form>

              <el-button @click="findPrintList"> 查询 </el-button>
              <el-button @click="printBtn"> 打印 </el-button>
         </div>



        <div id="printJS-form">
          <div class="con">
            <template v-for="(item,index) in goodsList" >

            <div class="goods-card" :key="index" >
                <div class="goods-card-header">
                    <div class="header_left"></div>
                    <div class="header_right">YeeMine</div>
                </div>
              <div class="goods-card-body">
                <div class="goods-name">{{item.goods_name}}</div>
                <!--<div class="element"><span class="to-bolder">成分:</span> 橘皮丁、巧克力、牛肉芝士馅</div>-->
                <!--<div class="uint"><span class="to-bolder">计价单位:</span> 个</div>-->
                <div class="grade"><span class="to-bolder">等级:</span> 合格</div>
                <div class="goods-retail-price">
                         <span style="font-size:30px;">¥</span><span style="font-size: 40px;">{{item.sku_retail_price_z}}</span><span style="font-size: 30px">.{{item.sku_retail_price_f}}</span>
                </div>
              </div>

            </div>
       <!--<div v-if="(index!=0)&&(index%18==0)" style="page-break-after:always" :key="index"></div>-->


           </template>

    </div>

        </div>




    </div>
</template>
<script>
// import JsBarcode from 'jsbarcode' ;
import {getPrintGoodsList,getGoodsCategory} from '@/api/goods';
//import full from  '@/components/Screenfull';
import {fenToyuan} from "@/utils/index";
export default {
    data:function(){
        return {
          goodsList:[],
          categoryOption:[],
            listQuery:{
                 timeRange:'',
                 goods_name:'',
                 goods_code:'',
                 goods_type_ids:[]
            },
          props:{
            value:'goods_type_id',
            label:'goods_type_name',
            children:'childCategory'
          },

        }
    },
  components:{

  },

    methods:{

        printBtn(){

         printJS({
          printable: 'printJS-form',
          type: 'html',
          targetStyles: ['*'],
          style:'html,body,div{height: auto!important;}'
        })
        },
        findPrintList(){
             let listQuery = JSON.parse(JSON.stringify(this.listQuery));

            if(listQuery.timeRange != ''|| listQuery.goods_type_ids.length != 0){
              listQuery.goods_type_ids = listQuery.goods_type_ids.join(",");
                   getPrintGoodsList(listQuery).then(res=>{
                    res.datalist.map(item=>{
                        item.sub = (fenToyuan(item.sku_retail_price) - fenToyuan(item.reference_price_one)).toFixed(2);
                        item.sku_retail_price = (fenToyuan(item.sku_retail_price)).toFixed(2);

                        [item.sku_retail_price_z,item.sku_retail_price_f]  = (item.sku_retail_price+"").split(".");
                        item.reference_price_one = (fenToyuan(item.reference_price_one)).toFixed(2);
                    })
                    this.goodsList = res.datalist;

      })
            }


        },
      getGoodsCategory(){



          getGoodsCategory().then((res)=>{

            this.categoryOption = res.datalist;


          })
        }


    //  barcode(){
    //     let barCode = "12345678"
    //     JsBarcode("#barcode", "Hi world!",{
    //       format: "CODE128",//选择要使用的条形码类型
    //       text: barCode,    //显示文本
    //       displayValue: true,//是否在条形码下方显示文字
    //       textPosition: "bottom",//设置文本的垂直位置
    //       fontOptions:"bold italic",//使文字加粗体或变斜体
    //       background:"#eee",//设置条形码的背景
    //       font:"fantasy",//设置文本的字体
    //       lineColor:"#000",//设置条和文本的颜色。
    //       margin:0,//设置条形码周围的空白边距
    //       width:1,
    //       height:40,
    //       fontSize:12,

    //     })
    //   },
    },
     mounted:function() {
       //this.barcode();
    },
    created:function(){
      this.getGoodsCategory()

    }
}
</script>
<style scoped  lang="css">


  .to-bolder{
    font-weight: bolder;
  }

.con{
    /* height: 1170px; */
    /* background-color: yellow; */
    width:794px;
    /* display: flex; */
    /* flex-wrap: wrap; */

}
.goods-card{

    /* margin:0 3 3 0;  */
    margin-bottom:16px;
    margin-right: 6px;

    /* background: orangered; */
    display:inline-block;
    flex-direction: column;
    /* width:300px; */
    width:calc(30% - 10px);
    border:black 1px solid;
    /* height: 200px; */
    /* display: flex; */
    /* flex-direction: column; */
    /* padding: 5px; */
    /* height: 200px;; */
    /* background: red;     */
    /*padding: 5px;*/
}

.goods-card-header{
  width: 100%;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  height: 40px;
  background-color: #000;
  font-weight:bolder;
}
.goods-card-header .header_left{
   margin-left: 20px;
   color: white;
}
.goods-card-header .header_right{
  margin-right: 20px;
  color: white;
}
.goods-card-body{
  padding: 10px;
  font-size: 10px;

}
.goods-card-body .goods-name{
  width: 100%;
  height: 43px;
  min-height: 43px;
  font-size: 15px;
  border-bottom:1px solid black;
  font-weight: bolder;
  padding-bottom: 2px;
  /*overflow: hidden;*/
  /*white-space: nowrap;*/
  /*text-overflow: ellipsis;*/
}
.element{
  margin-top: 2px;
}
.goods-retail-price{
    font-weight: bolder;
    float: right;
    margin-bottom: 5px;
    margin-right: 20px;
}




</style>
