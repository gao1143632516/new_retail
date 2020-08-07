<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span><i class="el-icon-search"></i>筛选搜索</span>
            <el-button style="float: right;" size="mini" @click="reset" >重置</el-button>
            <el-button style="float: right;" type="primary" size="mini" @click="serch" >查询结果</el-button>
            <el-form :inline="true" :model="listQuery" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="listQuery.refund_order_number" placeholder="订单号"></el-input>
                </el-form-item>
                 <el-form-item label="申请状态">
                  <el-select v-model="listQuery.refund_status_id" placeholder="请选择">
                    <el-option
                      v-for="item in orderStatusData"
                      :key="item.refund_status_id"
                      :label="item.refund_status_name"
                      :value="item.refund_status_id">
                    </el-option>
                  </el-select>
              </el-form-item>

         </el-form>

        </div>
         </el-card>

        <div class="container">
            <el-table :data="tableData"  Checkbox border style="width: 100%" fit ref="multipleTable" v-loading="loading"  >
                <el-table-column   label=订单号 width="150">
                    <template slot-scope="scope">
                          {{scope.row.refund_order_number}}
                    </template>
                </el-table-column>
              <el-table-column prop="create_ts"  label="申请时间">
                <template slot-scope="scope">
                  {{scope.row.create_ts }}
                </template>
              </el-table-column>
                <el-table-column prop="refund_status_name"  label="申请状态" width="100">
                  <template slot-scope="scope">


                    <el-tag v-if="scope.row.status_id==0" type="warning"> {{scope.row.refund_status_name}}</el-tag>
                    <el-tag v-else-if="scope.row.status_id==20" type="success">{{scope.row.refund_status_name}}</el-tag>
                    <el-tag v-else-if="scope.row.status_id==18" type="danger">{{scope.row.refund_status_name}}</el-tag>
                    <el-tag v-else>{{scope.row.refund_status_name}}</el-tag>



                  </template>
                </el-table-column>
                <el-table-column prop="refund_fee"  label="总额" width="100">
                  <template slot-scope="scope">
                   ￥{{scope.row.refund_fee}}
                  </template>
                </el-table-column>
                <el-table-column prop="refund_relation_name"  label="联系人">
              </el-table-column>
              <el-table-column prop="refund_relation_phone"  label="联系人电话">
              </el-table-column>
              <el-table-column prop="create_ts"  label="处理时间">
                <template slot-scope="scope">
                  {{scope.row.handle_state_time == '2000-01-01 00:00:00' ? '未处理' : scope.row.handle_state_time }}
                </template>
              </el-table-column>

                    <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <router-link  :to="{ path: '/page/order/refundDetail?refund_order_id='+scope.row.refund_order_id}"><i class="el-icon-edit-outline"></i>查看</router-link>

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

  import {getPaymentRefundlist,getPaymentRefundStatusList} from '@/api/order';
  import {fenToyuan} from '@/utils/index';
    export default {
        data: function(){
            return {
                tableData:[],
                orderStatusData:[],
                paymentTypeData:[],
                listQuery: {
                    page: 1,
                    limit: 10,
                    refund_order_number:'',
                    refund_status_id:-2,
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
              getPaymentRefundlist(this.listQuery).then((res)=>{
                    if(res.code == 0){
                        this.length = res.data.count;
                        res.data.list.map(item=>{
                            item.refund_fee = fenToyuan(item.refund_fee);
                        })
                        this.tableData = res.data.list;

                    }
                    this.loading = false;
               })
            },
             handleCurrentChange(val){

                this.listQuery.page = val;
                //var bak = Object.assign({},this.listQuery)
                //this.$store.dispatch("setCurrentPageInfo",bak);
                this.getData()
            },

          getPaymentRefundStatusList(){

            getPaymentRefundStatusList().then((res)=>{
                res.datalist.unshift({refund_status_id:-2,refund_status_name:'全部'});
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
                    refund_order_number:'',
                    refund_status_id:-2,
                }
            },
//          tableRowClassName({row, rowIndex}) {
//            if (row.refund_status_id === 0) {
//              console.log(12);
//              return 'warning-row';
//            } else if (row.refund_status_id === 20) {
//              return 'success-row';
//            }
//            return '';
//          }

        },
        created:function(){
             this.getData();
             this.getPaymentRefundStatusList();
        }
    }
</script>

<style scoped>
    .el-table .cell .thumbnail{
        width: 60px;
    }

     .el-table .warning-row {
       background: oldlace;
     }

    .el-table .success-row {
      background: #f0f9eb;
    }


</style>
