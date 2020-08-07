<template>
    <div class="app-container">


      <div>
        <el-divider content-position="left">退货商品</el-divider>

        <el-table
          :data="refundGoodsList"
          v-loading="listLoading"
          style="width: 100%">
          <el-table-column
            label="商品名称"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.goods_name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品码"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.goods_code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="价格"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sku_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="购买数量"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sku_num }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-card class="box-card" style="width:500px;">
        <div slot="header" class="clearfix">
          服务单信息
        </div>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">服务单号:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">{{refundDetail.refund_order_id}}</div></el-col>
        </el-row>
        <!--<el-divider></el-divider>-->
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">申请状态:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">{{refundDetail.refund_status_name}}</div></el-col>
        </el-row>
        <!--<el-divider></el-divider>-->
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">订单编号:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">{{refundDetail.refund_order_number}}</div></el-col>
        </el-row>
        <!--<el-divider></el-divider>-->
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">申请时间:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">{{refundDetail.create_ts}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">用户账号:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">{{refundDetail.refund_order_id}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">联系人:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">{{refundDetail.refund_relation_name}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">联系电话:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">{{refundDetail.refund_relation_phone}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">退款原因:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">{{refundDetail.refund_reason_desc}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">问题描述:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">{{refundDetail.description}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">凭证图片:</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light"><img style="width: 50%"  v-if="refundDetail.refund_url != ''" :src="refundDetail.refund_url" alt="" class="src"></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">操作说明:</div></el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入操作说明"
                v-model="refundDetail.handle_state">
              </el-input>

            </div>

          </el-col>
        </el-row>

      </el-card>
      <el-button-group v-if="refundDetail.status_id == 0 ">
        <el-button type="primary" :disabled="canClick" icon="el-icon-arrow-left" @click="agreeRefund">确认退款</el-button>
        <el-button type="primary" :disabled="canClick" @click="disAgreeRefund">拒绝<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>


    </div>
</template>

<script>
    import { getPaymentRefundDetail,agreeRefund,handleRefund } from '@/api/order';
    import {fenToyuan} from '@/utils/index';
    export default {
        data() {
            return {
              refundGoodsList: [],
              refundDetail:{},
                listLoading:false,
                dialogFormVisible:false,
                dialogStatus:'',
                formLabelWidth: '120px' ,
                canClick:false

            }
        },
        created(){

            this.getPaymentRefundDetail();
        },
        methods: {
          getPaymentRefundDetail(){
                this.listLoading = true;
            getPaymentRefundDetail(this.$route.query.refund_order_id).then(response => {
                    if(response.code==0){
                      response.data.refundGoodsList.map(item=>{
                        item.sku_price = fenToyuan(item.sku_price);
                      })
                        this.refundGoodsList = response.data.refundGoodsList;
                        this.refundDetail = response.data.refundDetail;
                    }else{

                    }

                    this.listLoading = false
                })

            },
          agreeRefund(){
            var refund_order_id = this.$route.query.refund_order_id;
            var handle_state = this.refundDetail.handle_state;
            var isagree = true;
//            if(handle_state.trim().length==0){
//              this.$message.error("请输入操作原因");
//              return false;
//            }
            this.canClick = true;
            handleRefund(refund_order_id,handle_state,isagree).then(res=>{

                if(res.code == 0){

                  this.$message.success("操作成功");
                  this.$router.push({path:'/page/order/refund'});
                }
            })
          },
          disAgreeRefund(){
            var refund_order_id = this.$route.query.refund_order_id;
            var handle_state = this.refundDetail.handle_state;
            var isagree = false;
            if(handle_state.trim().length==0){
              this.$message.error("请输入操作原因");
              return false;
            }
            this.canClick = true;
            handleRefund(refund_order_id,handle_state,isagree).then(res=>{
              if(res.code == 0){
                this.$message.success("操作成功");
                this.$router.push({path:'/page/order/refund'});
              }
            })
          },

            meassageBox(meassage,type){
                this.$message({
                    message:meassage,
                    type:type
                });
            },



        }
    }
</script>
<style scoped="">
  .grid-content{
    min-height: 40px;
    border-radius: 4px;
  }
</style>
