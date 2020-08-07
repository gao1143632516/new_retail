<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span><i class="el-icon-search"></i>筛选搜索</span>
            <el-button style="float: right;" size="mini" @click="reset" >重置</el-button>
            <el-button style="float: right;" type="primary" size="mini" @click="serch" >查询结果</el-button>
            <el-form :inline="true" :model="listQuery" class="demo-form-inline">
                <el-form-item label="接龙标题">
                    <el-input v-model="listQuery.group_name" placeholder=""></el-input>
                </el-form-item>
            </el-form>
        </div>
         </el-card>
        <div class="handle-box">
            <!--<Blockquote>-->
                <!--<el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="addContent">添加商品</el-button>-->
            <!--</Blockquote>-->
        </div>
        <div class="container">
            <el-table :data="tableData" align="center" Checkbox border style="width: 100%" fit ref="multipleTable" v-loading="loading" >
              <el-table-column prop="group_id"  label="接龙id" width="50">
              </el-table-column>
                <el-table-column   label="缩略图" width="70">
                    <template slot-scope="scope">
                        <img class="thumbnail" :src="scope.row.group_pic">
                    </template>
                </el-table-column>
                <el-table-column prop="group_name"  label="接龙名称" width="100">
                </el-table-column>
                <el-table-column prop="owner_user_id"  label="发起人id" width="80">
                </el-table-column>
                <el-table-column prop="start_time"  label="开始时间" width="180">
                </el-table-column>
                <el-table-column prop="expire_time"  label="结束时间"  width="180">
                </el-table-column>



                <el-table-column label="操作" min-width="150" align="center">
                    <template slot-scope="scope">
                        <router-link  :to="{ path: '/page/marketing/detail?group_id='+scope.row.group_id}"><i class="el-icon-edit-outline"></i>编辑 </router-link>
                        <el-button @click="getDiscountRule(scope.row)">配置规则</el-button>

                    </template>
                </el-table-column>
            </el-table>
             <div class="pagination-container">
            <el-pagination background @size-change="pageSizeChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length"
            v-if="length!=0">
            </el-pagination>
        </div>
          <el-dialog title="配置规则" :visible.sync="dialogFormVisible">
              <div>
                <template>
               满 <el-input-number v-model="rule_condition" :min="1" :max="1000" label="描述文字"></el-input-number> 人
                </template>
                <template>
                  <el-input-number v-model="default_rate" :precision="2" :step="0.1" :max="1"></el-input-number> 比例
                </template>
                <el-button type="primary" @click="add">添加</el-button>

              </div>
              <el-table :data="ruleList">
                <el-table-column property="rule_condition" label="接龙到达人数" width="150"></el-table-column>
                <el-table-column property="default_rate" label="打折" width="200"></el-table-column>
                <el-table-column label="操作" min-width="150" align="center">
                  <template slot-scope="scope">

                    <el-button @click="del(scope.row)">删除</el-button>

                  </template>
                </el-table-column>
              </el-table>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>


        </div>
    </div>
</template>


<script>


  import {getSequenceStrategyList,getSequenceStrategyDiscountRule,addSequenceStrategyDiscountRule,delSequenceStrategyDiscountRuleItem} from '@/api/marketing';
    export default {
        data: function(){
            return {
                tableData:[],
                productPage:{},
                selectedGoods:{},
                listQuery: {
                    page: 1,
                    limit: 10,
                    group_id:0,
                    group_name:''
                },
                loading : false,
              dialogFormVisible:false,
              ruleList:[],
              discount:{},
              default_rate:0,
              rule_condition:0,

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
                this.getData()
            },
            addContent(){
                this.$router.push({path:'/page/goods/goodsEdit'});
            },
            getData(){
              this.loading = true;
              getSequenceStrategyList(this.listQuery).then((res)=>{
                    if(res.code == 0){
                        this.length = res.data.count;
                        this.tableData = res.data.list;

                    }
                    this.loading = false;
               })
            },
          getDiscountRule(row){
              this.dialogFormVisible = true;
             getSequenceStrategyDiscountRule(row.group_id).then(res=>{
                if(res.code == 0){
                  this.ruleList = res.data.ruleList;
                  this.discount = res.data.discount;
                }
            })
          },
          add(){
              var json = {'default_rate':this.default_rate,
              'rule_condition':this.rule_condition,'rule_id':this.discount.rule_id,};
              addSequenceStrategyDiscountRule(json).then(res=>{
                  if(res.code==0){
                    var rule_item_id = res.data;
                    json.rule_item_id = rule_item_id;
                    this.ruleList.push(json);
                    this.$message.success("操作成功");
                  }

              })


          },
          del(row){
            delSequenceStrategyDiscountRuleItem(row.rule_item_id).then(res=>{
              if(res.code == 0){
                   for(var i=0;i<this.ruleList.length;i++){
                     if(row.rule_item_id == this.ruleList[i].rule_item_id){
                          this.ruleList.splice(i,1);
                          break;
                     }
                   }

              }
              this.$message.success("操作成功");
            })
          },

            serch(){
              this.getData();
            },
            reset(){
                this.listQuery = {
                    page: 1,
                    limit: 10,
                    group_id:0
                }
            }
        },
        created:function(){
          this.getData();

        }
    }
</script>

<style scoped>
    .el-table .cell .thumbnail{
        width: 60px;
    }
</style>
