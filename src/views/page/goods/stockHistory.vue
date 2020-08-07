<template>
    <div>

        <div class="handle-box">

        </div>
        <div class="container">
            <el-table :data="tableData"  Checkbox border style="width: 100%" fit ref="multipleTable">
                <el-table-column type="index"  label="#" width="50">
                </el-table-column>
                <el-table-column prop="create_ts"  label="操作时间" width="300">
                </el-table-column>
                <el-table-column prop="description"  label="操作描述" width="100">
                </el-table-column>
                <!-- <el-table-column prop="nums"  label="改变量(-表示减少)" width="100"> -->
                <!-- </el-table-column> -->
                  <el-table-column prop="sku_retail_price"  label="设置销售价" width="100">
                </el-table-column>
                  <el-table-column prop="sku_cost_price"  label='设置成本价' width="100">
                </el-table-column>
                 <el-table-column prop="nums"  label="改变量(-表示减少)">
                    <template  slot-scope="scope">
                       <el-tag v-if="scope.row.nums<0" type="warning"> {{scope.row.nums}}</el-tag>
                        <el-tag v-else type="success"> {{scope.row.nums}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="type_name"  label="改变类型">
                </el-table-column>

            </el-table>
             <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange"  :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
            </el-pagination>
        </div>

        </div>
    </div>
</template>


<script>
  import {fenToyuan,yuanTofen} from "@/utils/index";
  import {getGoodsSkuList,getGoodsCategory,getStockHistory} from '@/api/goods';
    export default {
        data: function(){
            return {
                tableData:[],
                productPage:{},
                selectedGoods:{},
                listQuery: {
                    page: 1,
                    limit: 10,
                    sku_id:0,
                },

                length:0
            }
        },
        methods: {
               handleChange(value) {
                    console.log(value);
                },

            getData(){
               getStockHistory(this.listQuery).then((res)=>{
                    if(res.code == 0){
                        this.length = res.data.count;
                        res.data.list.map(item=>{
                            item.sku_retail_price = fenToyuan(item.sku_retail_price);
                            item.sku_cost_price = fenToyuan(item.sku_cost_price);
                        })
                        this.tableData = res.data.list;
                    }
               })
            },
             handleCurrentChange(val){
                this.listQuery.page = val
                this.getData()
             },

        },
        created:function(){
            this.listQuery.sku_id = this.$route.query.sku_id;
            this.getData();


        },
        computed:{

        }
    }
</script>

<style scoped>
    .el-table .cell .thumbnail{
        width: 60px;
    }
</style>
