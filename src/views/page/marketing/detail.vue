<template>
    <div class="app-container">
        <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="add">添加</el-button>

      <template>
        <el-table
          :data="list"
          style="width: 100%"
         >
          <el-table-column
            prop="nickname"
            label="昵称"
            width="180">
          </el-table-column>
          <el-table-column
            label="图像"
            width="180">
            <template slot-scope="scope">
              <img class="thumb" :src="scope.row.head_img_url">
            </template>
          </el-table-column>
          <el-table-column
            prop="order_desc"
            label="购买信息">
            <template slot-scope="scope">
                 <div v-for="(item,index) in scope.row.order_desc" :key="index">{{item.goods_name}}x{{item.sku_num}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150" align="center">
            <template slot-scope="scope">
              <el-button type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="添加" :visible.sync="dialogFormVisible">
        <template>


          <el-radio v-for="(item,i) in virtualUser " :key="i" v-model="user_id" :label="item.id">
            <img :src="item.head_img_url" style="width:30px;height:30px;" alt="">
            <span style="width: 30px">{{item.nickname}}</span>
          </el-radio>
        </template>
        <br/>
        <el-button size="mini" @click="refresh">刷新</el-button>

        <el-table :data="goodsList"  @selection-change="handleSelectionChange"> <el-table-column
          type="selection"
          width="55">
        </el-table-column>

          <el-table-column property="goods_name" label="商品" width="150"></el-table-column>
          <el-table-column label="购买数量" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.set_num" placeholder="请输入内容"></el-input>
</template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="toGenerateVirtualData">确 定</el-button>
        </div>
      </el-dialog>


    </div>
</template>

<script>
    import { addVirtualSequenceStrategyData,getSequenceStrategyDetail,getSequenceStrategyGoodsList,generateVirtualSequenceStrategyData,getVirtualUser} from '@/api/marketing';
    export default {
        data() {
            return {
              add_number:1,
              list:[],
              goodsList:[],
              user_id:0,
              multipleSelection:[],
              dialogFormVisible:false,
              virtualUser:[]
            }
        },
        created(){
            this.getSequenceStrategyDetail();
            this.getSequenceStrategyGoodsList();
        },
        methods: {
          addVirtualSequenceStrategyData(){
            addVirtualSequenceStrategyData(this.add_number,this.$route.query.group_id).then(res=>{
              if(res.code == 0){
                this.$message.success('添加成功');
              }
          })
          },
          getSequenceStrategyDetail(){
            getSequenceStrategyDetail(this.$route.query.group_id).then(res=>{
              if(res.code == 0){
                res.datalist.map(item=>{
                  item.order_desc = JSON.parse(item.order_desc);
                })

                  this.list = res.datalist;
              }
            })
          },
          getSequenceStrategyGoodsList(){

            getSequenceStrategyGoodsList(this.$route.query.group_id).then(res=>{
                  res.datalist.map(item=>{
                    item.set_num = 1;
                    console.log(item);

                   // item.order_desc_s = JSON.parse(item.order_desc);
                  })
                  this.goodsList = res.datalist;
            })
          },
          getVirtualUser(){
            getVirtualUser().then(res=>{
                this.virtualUser = res.datalist;
            })
          },


          add(){
              this.getVirtualUser();
              this.dialogFormVisible = true;
          },
          refresh(){
            this.getVirtualUser();
          },
          toGenerateVirtualData(){
            var group_id = this.$route.query.group_id;
            var sku_ids_arr = [];
            var sku_nums_arr = [];
            var sku_ids = [];
            var sku_nums = [];
            this.multipleSelection.map(item=>{
                 sku_ids_arr.push(item.sku_id);
                 sku_nums_arr.push(item.set_num);
            })
            var sku_ids = sku_ids_arr.join(",");
            var sku_nums = sku_nums_arr.join(",");
            generateVirtualSequenceStrategyData(group_id,sku_ids,sku_nums,this.user_id).then(res=>{
                 if(res.code == 0){
                      this.getSequenceStrategyDetail();
                 }
                 this.$message.success("添加成功");
              this.dialogFormVisible = false;
            })
          },
          handleDelete(){

          },
          handleSelectionChange(val) {
            this.multipleSelection = val;
          }

            },


    }
</script>
<style scoped="">
  .thumb{
    width:50px;
    height: 50px;
  }
</style>
