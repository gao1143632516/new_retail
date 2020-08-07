<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span><i class="el-icon-search"></i>筛选搜索</span>
            <el-button style="float: right;" size="mini" @click="reset" >重置</el-button>
            <el-button style="float: right;" type="primary" size="mini" @click="serch" >查询结果</el-button>
            <el-form :inline="true" :model="listQuery" class="demo-form-inline">
                <el-form-item label="商品名称">
                    <el-input v-model="listQuery.goods_name" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品条码">
                    <el-input v-model="listQuery.goods_code" placeholder="商品条码"></el-input>
                </el-form-item>
                  <el-form-item label="商品品牌">
                    <el-input v-model="listQuery.goods_brand" placeholder="商品品牌"></el-input>
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

                <el-form-item label="上架状态">
                    <el-select v-model="listQuery.isMarketable" placeholder="状态">
                    <el-option label="上架" :value="true"></el-option>
                    <el-option label="下架" :value="false"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
         </el-card>
        <div class="handle-box">
            <Blockquote>
              <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="addContent">添加商品</el-button><div style="display:inline-block;float: right"><i class="el-icon-delete"></i></div>
            </Blockquote>
        </div>
        <div class="container">
            <el-table :data="tableData" align="center" Checkbox border style="width: 100%" fit ref="multipleTable" v-loading="loading" >
                <el-table-column prop="sort_num"  width="60" label="排序" >
                    <template slot-scope="scope">
                        <el-input @change="handleSort(scope.$index,scope.row)" class="input-sort" v-model="scope.row.sort_num"  placeholder=""></el-input>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="goods_id"  label="id" width="60">-->
                <!--</el-table-column>-->
                <el-table-column   label="缩略图" width="70">
                    <template slot-scope="scope">
                        <img class="thumbnail" :src="scope.row.goods_images">
                    </template>
                </el-table-column>
                <el-table-column prop="goods_name"  label="商品名称" width="300">
                </el-table-column>
                <el-table-column prop="goods_code"  label="商品码" width="150">
                </el-table-column>
                <el-table-column prop="goods_brand"  label="品牌" width="80">
                </el-table-column>
                <el-table-column prop="category_name"  label="商品分类"  width="100">
                </el-table-column>

                <el-table-column prop="min_price"  label="最小价" width="50">
                    <template slot-scope="scope">
                        {{scope.row.min_price}}
                    </template>
                </el-table-column>
                <el-table-column  label="最大价" width="50">
                    <template slot-scope="scope">
                        {{scope.row.max_price}}
                    </template>
                </el-table-column>
                 <el-table-column prop="is_recomment"  label="推荐" width="80">
                 <template slot-scope="scope">
                        <el-switch v-model="scope.row.is_recomment" active-color="#009688" inactive-color="#ff4949" @change="setRecommentGoods(scope.$index, scope.row)"></el-switch>
                </template>

                </el-table-column>
                <el-table-column prop="isMarketable"  label="是否上架" width="50">
                    <template slot-scope="scope">
                        {{scope.row.isMarketable ?'正常':'下架'}}
                    </template>
                </el-table-column>
                   <!--<el-table-column prop="isMarketable"  label="导入" width="50">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{scope.row.enabled==2 ?'导入':'添加'}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column label="操作" min-width="150" align="center">
                    <template slot-scope="scope">
                        <router-link  :to="{ path: '/page/goods/goodsEdit?goods_id='+scope.row.goods_id}"><i class="el-icon-edit-outline"></i>编辑 </router-link>
                        <a  href="javascript:;" v-if="scope.row.isMarketable==true" @click="setGoodsIsMarketable(scope.$index, scope.row)"> <i class="el-icon-delete"></i>下架 </a>
                        <a  href="javascript:;" v-if="scope.row.isMarketable==false" @click="setGoodsIsMarketable(scope.$index, scope.row)"> <i class="el-icon-delete"></i>上架 </a>
                      <a  href="javascript:;"  @click="delGoodsByGoodsId(scope.$index, scope.row)"> <i class="el-icon-delete"></i>删除 </a>
                    </template>
                </el-table-column>
            </el-table>
             <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" @size-change="pageSizeChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length"
            v-if="length!=0">
            </el-pagination>
        </div>


        </div>
    </div>
</template>


<script>

  import {fenToyuan,deepClone,objectIsEmpty} from "@/utils/index";
  import store from '@/store/index';
  import {getGoodsList,setGoodsSortNum,setGoodsIsMarketable,getGoodsCategory,setRecommentGoods,delGoodsByGoodsId} from '@/api/goods';
    export default {
      data: function(){
            return {
                tableData:[],
                productPage:{},
                selectedGoods:{},
                listQuery: {
                    page: 1,
                    limit: 10,
                    goods_type_ids:[],
                    goods_name:"",
                    goods_code:"",
                    goods_brand:"",
                    isMarketable:""
                },
                loading : false,
                categoryOption:[],

          selectedOptions2:[],
          props:{
              value:'goods_type_id',
              label:'goods_type_name',
              children:'childCategory'
          },
                length:0
            }
        },
        methods: {
            pageSizeChange(size){
                 this.listQuery.limit = size;
                var bak = Object.assign({},this.listQuery)
                this.$store.dispatch("setCurrentPageInfo",bak);
                this.getData()
            },
            addContent(){
                this.$router.push({path:'/page/goods/goodsEdit'});
            },
            getData(){
              this.loading = true;
            //    var listQueryBak =  deepClone(this.listQuery);
              var bak =  Object.assign({},this.listQuery);
              if(bak.isMarketable===false){
                  bak.isMarketable = 0;
              }else if(bak.isMarketable === true){
                  bak.isMarketable = 1;
              }else{
                  bak.isMarketable =3;
              }

               bak.goods_type_ids = bak.goods_type_ids.join(",");

               getGoodsList(bak).then((res)=>{
                    if(res.code == 0){
                        this.length = res.data.count;
                        res.data.list.map(item=>{
                            item.min_price = fenToyuan(item.min_price);
                            item.max_price = fenToyuan(item.max_price);
                             item.category_name = this.getGoodsCategoryById(item.goods_type_ids);
                        });



                        this.tableData = res.data.list;

                    }
                    this.loading = false;
               })
            },
            getGoodsCategoryById(goods_type_ids){
                // console.log(goods_type_ids);
                var goods_type_ids_arr = goods_type_ids.split(",");
                var category = goods_type_ids_arr[0];
                var category_child = goods_type_ids_arr[1];
                // console.log(goods_type_ids_arr);
                // console.log(this.categoryOption);

                for(var cate of this.categoryOption){

                    if(cate.goods_type_id == category){

                        for(var c of cate.childCategory){

                            if(c.goods_type_id == category_child){

                                return c.goods_type_name;
                            }
                        }
                    }
                }

            },
             handleCurrentChange(val){

                this.listQuery.page = val;
                var bak = Object.assign({},this.listQuery)
                this.$store.dispatch("setCurrentPageInfo",bak);
                this.getData()
            },
            batchDel(){

            },
            delGoodsByGoodsId(index,row){
              this.$confirm('是否确认删除该商品','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
              }).then(() =>{
                var goods_id = row.goods_id;
                delGoodsByGoodsId(goods_id).then(res=>{
                  if(res.code == 0) {
                    this.$message.success('删除成功');
                    this.getData();
                  }
                })
              }).catch(()=>{
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              })


            },
            handleSort(index,row){
                this.$set(this.tableData,0,this.tableData[0])
                this.saveGoods(row)
            },
            handleSelectCell(row, column, cell, event){
                this.selectedGoods=row;
            },
            handleXiajia(index,row){
                let goods=row
                goods.isMarketable=false;
                for(let o in  this.tableData){
                    if(this.tableData[o].id==row.id){
                      /*  this.tableData.splice(o,1)*/
                        break;
                    }
                }
                this.saveGoods(goods)
            },
            handleShangjia(index,row){
                let goods=row
                goods.isMarketable=true;
                for(let o in  this.tableData){
                    if(this.tableData[o].id==row.id){
                     /*   this.tableData.splice(o,1)*/
                        break;
                    }
                }
                this.saveGoods(goods)
            },
            saveGoods(goods){
                this.$axios({
                    method:"post",
                    url: this.HOST+"/product/updateProduct",
                    data: goods
                }).then((res)=>{
                    if(res.data.code==0) {
                        this.$message.success('保存成功');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            changeIsRecommend(val){
                let goods=this.selectedGoods
                goods.isRecommend=val
                this.saveGoods(goods)
            },
            handleSort(index,row){
                if(row.sort_num!=""){
                    setGoodsSortNum(row.goods_id,row.sort_num).then(res=>{
                        this.$message.success('修改成功');
                        this.getData();
                    })
                }
            },
            setGoodsIsMarketable(index,row){
                row.isMarketable = !row.isMarketable
                setGoodsIsMarketable(row.goods_id,row.isMarketable).then(res=>{
                     this.$message.success('修改成功');
                    //  this.getData();
                })
            },
           getGoodsCategory(){
               var that = this;
               return new Promise((resolve, reject)=>{

                    getGoodsCategory().then((res)=>{
                    that.categoryOption = res.datalist;
                     resolve(res);

                })
               })

            },
            setRecommentGoods(index,row){

                setRecommentGoods(row.goods_id,row.is_recomment).then(res=>{
                    if(res.code == 0){

                    }
                })
            },
            serch(){
              this.getData();
            },
            reset(){
                this.listQuery = {
                    page: 1,
                    limit: 10,
                    goods_type_ids:[],
                    goods_name:"",
                    isMarketable:true
                }
            }
        },
        created:function(){
            this.getGoodsCategory().then((res)=>{
                  console.log(store.getters.listQuery);
                  if(!objectIsEmpty(store.getters.listQuery)){
                          this.listQuery = store.getters.listQuery;
                  }
                  this.getData();

            });



        }
    }
</script>

<style scoped>
    .el-table .cell .thumbnail{
        width: 60px;
    }
</style>
