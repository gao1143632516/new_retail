<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span><i class="el-icon-search"></i>筛选搜索</span>
            <el-button style="float: right;" size="mini" @click="reset" >重置</el-button>
            <el-button style="float: right;" type="primary" size="mini" @click="serch" >查询结果</el-button>
            <el-form :inline="true" :model="listQuery" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="listQuery.order_number" placeholder="订单号"></el-input>
                </el-form-item>
                 <el-form-item label="订单状态">
                  <el-select v-model="listQuery.status_id" placeholder="请选择">
                    <el-option
                      v-for="item in orderStatusData"
                      :key="item.status_id"
                      :label="item.status_name"
                      :value="item.status_id">
                    </el-option>
                  </el-select>
              </el-form-item>
                <el-form-item label="配送类型">
                    <el-select v-model="listQuery.delivery_type_id" placeholder="请选择">
                    <el-option
                      v-for="item in deliveryTypeData"
                      :key="item.delivery_type_id"
                      :label="item.delivery_type_name"
                      :value="item.delivery_type_id">
                    </el-option>
                  </el-select>

              </el-form-item>
              <el-form-item label="支付方式">
                <el-select v-model="listQuery.paymentTypeData" placeholder="请选择">
                  <el-option
                    v-for="item in paymentTypeData"
                    :key="item.payment_type_id"
                    :label="item.payment_provider_name"
                    :value="item.payment_type_id">
                  </el-option>
                </el-select>

              </el-form-item>
         </el-form>

        </div>
         </el-card>

        <div class="container">
            <el-table :data="tableData"  Checkbox border style="width: 100%" fit ref="multipleTable" v-loading="loading" >

                <el-table-column prop="order_id"  label="id" width="60">
                </el-table-column>
                <el-table-column   label=订单号 width="300">
                    <template slot-scope="scope">
                          {{scope.row.order_number}}
                    </template>
                </el-table-column>
                <el-table-column prop="status_name"  label="订单状态" width="150">
                </el-table-column>
                <el-table-column prop="fee"  label="总额" width="100">
                </el-table-column>
                <el-table-column prop="delivery_type_name"  label="订单类型">
            </el-table-column>
              <el-table-column prop="payment_provider_name"  label="支付方式">
              </el-table-column>


                <el-table-column prop="create_ts"  label="创建时间">
                    <template slot-scope="scope">
                        {{scope.row.create_ts }}
                    </template>
                </el-table-column>
                    <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <router-link  :to="{ path: '/page/order/detail?order_id='+scope.row.order_id}"><i class="el-icon-edit-outline"></i>查看</router-link>

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

  import {getOrderList,getOrderStatusList,getPaymentTypeList} from '@/api/order';
    export default {
        data: function(){
            return {
                tableData:[],
                orderStatusData:[],
                paymentTypeData:[],
                deliveryTypeData:[{delivery_type_id:0,delivery_type_name:'全部'},{delivery_type_id:1,delivery_type_name:'到店自提'},{delivery_type_id:2,delivery_type_name:'门店配送（即时）'},{delivery_type_id:3,delivery_type_name:'门店配送（定时）'}],
                listQuery: {
                    page: 1,
                    limit: 10,
                    order_number:'',
                    status_id:-1,
                    delivery_type_id:0,
                     payment_type_id:0
                },
                loading : false,
                length:0
            }
        },
        methods: {
            pageSizeChange(size){
                 this.listQuery.limit = size;
                this.getData()
            },

            getData(){
              this.loading = true;
               getOrderList(this.listQuery).then((res)=>{
                    if(res.code == 0){
                        this.length = res.data.count;
                        this.tableData = res.data.list;

                    }
                    this.loading = false;
               })
            },
            getPaymentTypeList(){
                getPaymentTypeList().then(res=>{
                  res.datalist.push({payment_type_id:0,payment_provider_name:'全部'});
                  this.paymentTypeData = res.datalist;
                })
            },

             handleCurrentChange(val){

                this.listQuery.page = val;
                var bak = Object.assign({},this.listQuery)
                this.$store.dispatch("setCurrentPageInfo",bak);
                this.getData()
            },

           getOrderStatusList(){

            getOrderStatusList().then((res)=>{
                res.datalist.push({status_id:-1,status_name:'全部'});
                this.orderStatusData = res.datalist;

                })


            },
            serch(){
              this.getData();
            },
            reset(){
                this.listQuery = {
                    page: 1,
                    limit: 10,
                    order_number:'',
                    status_id:-1,
                    delivery_type_id:0,
                    payment_type_id:0
                }
            }

        },
        created:function(){
             this.getData();
             this.getOrderStatusList();
             this.getPaymentTypeList();
        }
    }
</script>

<style scoped>
    .el-table .cell .thumbnail{
        width: 60px;
    }
</style>
