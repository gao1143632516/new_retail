<template>
    <div class="app-container">

        <el-card class="box-card" style="width:500px;">
          <div slot="header" class="clearfix">
            <span>配送方式</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{address.delivery_type_name}}</el-button>
          </div>
         
          <div v-if="address.delivery_type_id != 1" class="text item">
            收货人信息：{{address.province_name}} {{address.city_name}}  {{address.county_name}}
          {{address.address}} {{address.receiver_phone}}
          </div>
        </el-card>

        <el-table
                :data="goodsInfo"
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
</template>

<script>
    import { getOrderDetail} from '@/api/order';
    export default {
        data() {
            return {
                goodsInfo: [],
                address:{},
                listLoading:false,
                dialogFormVisible:false,
                dialogStatus:'',
                formLabelWidth: '120px' ,
            }
        },
        created(){

            this.getOrderDetail();
        },
        methods: {
            getOrderDetail(){
                this.listLoading = true;
                getOrderDetail(this.$route.query.order_id).then(response => {
                    if(response.code==0){
                        this.goodsInfo = response.data.goodsInfo;
                        this.address = response.data.address;
                    }else{

                    }

                    this.listLoading = false
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