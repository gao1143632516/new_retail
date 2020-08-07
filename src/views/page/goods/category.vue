<template>
    <div>
        <div class="handle-box">
            <Blockquote>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addCategory">添加类目</el-button>
            </Blockquote>
        </div>
        <div class="container">
            <el-table :data="tableData"  Checkbox border style="width: 100%" fit ref="multipleTable" :default-sort="{prop:'sort_num',order:'descending'}">
                <el-table-column prop="sort_num"  width="60" label="排序" >
                    <template slot-scope="scope">
                        <el-input @change="handleSort(scope.$index,scope.row)" class="input-sort" v-model="scope.row.sort_num"  placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column type="index"   label="#">
                </el-table-column>
                <el-table-column prop="goods_type_name"  label="类目名称">
                </el-table-column>
                <el-table-column prop="goods_type_level"  label="类目级别">
                    <template slot-scope="scope">
                        {{scope.row.goods_type_level}}级类目
                    </template>
                </el-table-column>

                <el-table-column label="图标">
                    <template slot-scope="scope">
                        <img class="icon" :src="scope.row.icon">
                    </template>
                </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                   <el-tag v-if="scope.row.enable_id == 1">正常</el-tag>
                   <el-tag v-if="scope.row.enable_id == 2" type="danger">禁用</el-tag>
                </template>
              </el-table-column>


                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <a  href="javascript:;" v-if="pcid==0" @click="findSub(scope.$index, scope.row)"> <i class="el-icon-edit-outline"></i>下一级 </a>
                        <a  href="javascript:;" v-if="pcid!=0" @click="goBack"> <i class="el-icon-edit-outline"></i>上一级 </a>
                      <a  href="javascript:;" v-if="pcid!=0" @click="transferGoodsCateGory(scope.row)"> <i class="el-icon-edit-outline"></i>转移商品 </a>
                        <a  href="javascript:;" @click="addCategory(scope.$index, scope.row)"> <i class="el-icon-edit-outline"></i>编辑 </a>
                        <a  href="javascript:;" @click="handleDelete(scope.$index, scope.row)"> <i class="el-icon-delete"></i>删除 </a>
                        <a  href="javascript:;" v-if="pcid==0 && scope.row.type_id==1" @click="setGoodsCategoryType(scope.$index, scope.row)"> <i class="el-icon-delete"></i>设为好物</a>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="类目编辑" :visible.sync="dialogFieldVisible" width="500px">
                <el-form :model="category" label-width="80px" ref="form">
                    <el-form-item label="类目名" prop="goods_type_name"  :rules="[
                                      { required: true, message: '请输入类目名', trigger: 'blur' }
                                      ]">
                        <el-input v-model="category.goods_type_name"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="类目级别" prop="goods_type_level"  :rules="[
                                      { required: true, message: '请选择类目级别', trigger: 'blur' }
                                      ]">
                        <el-select v-model="category.goods_type_level" placeholder="请选择">
                            <el-option label="一级类目" value="1"></el-option>
                            <el-option label="二级类目" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    -->
                    <el-form-item v-if="category.goods_type_level==2" label="上级类目" prop="goods_type_level"  :rules="[
                                      { required: true, message: '请选择上级类目', trigger: 'blur' }
                                      ]">
                        <el-select v-model="category.higher_type_id" placeholder="请选择">
                            <el-option v-for="(item,index) in categoryOption" :key="index" v-show="item.goods_type_level==1"  :label="item.goods_type_name" :value="item.goods_type_id+''"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图标"  prop="icon">
                        <pictureview type="upload" :selectedImg="category.icon" @selectChange="handleImgSuccess"></pictureview>
                    </el-form-item>

                    <el-form-item label="状态">
                      <el-select v-model="category.enable_id" placeholder="请选择">
                        <el-option
                          v-for="item in statusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  <el-form-item label="排序">
                    <el-input v-model.number="category.sort_num" type="number"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFieldVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveForm('form')">确 定</el-button>
                </div>
            </el-dialog>
          <el-dialog title="转移商品到指定分类" :visible.sync="dialogFormVisibleTransfer">
            <el-form v-model="transfer">
              <el-form-item label="商品分类">
                <el-input v-model="transfer.goods_type_name" auto-complete="off" disabled></el-input>
              </el-form-item>
                <el-form-item label="要转移到的商品分类">
                  <el-cascader
                    expand-trigger="hover"
                    :options="categoryOption"
                    :props="props"
                    v-model="transfer.to_goods_type_ids_arr"
                  >
                  </el-cascader>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleTransfer = false">取 消</el-button>
              <el-button type="primary" @click="transferGoodsCategory">确 定</el-button>
            </div>
          </el-dialog>

        </div>
    </div>
</template>

<script>
    import pictureview from "@/components/pictureview/index";
    import {getCategoryList,updateCategory,getCategorysByCid,deleteCategoryByTypeId,getGoodsCategory,transferGoodsCateGory,setCategoryType} from "@/api/goods";;
    export default {
        data: function(){
            return {
                json:{},
                tableData:[],
                category:{'sort_num':1,'enable_id':1},
                dialogFieldVisible:false,
                pcid:0,
                level:1,
                type_id:1,
                dialogFormVisibleTransfer:false,
                formLabelWidth:'400px',
                from_goods_type_ids:'',
                to_goods_type_ids:'',
              transfer:{},
              categoryOption:[],
              props:{
                value:'goods_type_id',
                label:'goods_type_name',
                children:'childCategory'
              },
              statusOptions:[{'value':1,'label':'正常'},{'value':2,'label':'禁用'}]
            }
        },
        methods: {
            getData(pcid) {
                // getCategoryList().then(res=>{
                //     this.tableData = res.datalist;
                // })
                getCategorysByCid(pcid).then(res=>{
                    this.tableData = res.datalist;
                })
            },
            goBack(){
                this.$router.go(-1);
            },
            addCategory(index,row){
                var row_bak = Object.assign({},row);
                var arr = Object.keys(row_bak);//判断row_bak是否是{}  取出json的keys
                if(arr.length!=0){
                    console.log(row);
                    row_bak.goods_type_level=row.goods_type_level+"";
                    row_bak.higher_type_id=row.higher_type_id+"";
                    // if(row_bak.higher_type_id=="0"){
                    //     row_bak.higher_type_id="";
                    // }
                    this.category=row_bak
                }else{//添加
                    this.category={"goods_type_level":this.level+"","higher_type_id":this.pcid+"","enable_id":1,"sort_num":1,"type_id":this.type_id}
                }

                this.dialogFieldVisible=true
            },
            handleImgSuccess(attachments){
                if(attachments.length>0) {
                    this.$set(this.category, "icon_temp", attachments[0].thumbnail_temp)
                    this.$set(this.category, "icon", attachments[0].url)
                }
            },

            saveForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFieldVisible=false

                        updateCategory(this.category).then(res=>{
                            if(res.code==0){
                                this.$message.success('保存成功');
                                this.getData(this.pcid);
                            }

                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            findSub(index,row){
               var pcid = row.goods_type_id;
               var type_id = row.type_id;
               this.$router.push({ path: "/page/goods/category",query:{pcid:pcid,type_id:type_id}});
            },
            handleDelete(index,row){
              this.$confirm('是否确认删除该分类','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
              }).then(() => {
                var goods_type_id = row.goods_type_id;
                deleteCategoryByTypeId(goods_type_id).then(res => {
                  if (res.code == 0) {
                    this.$message.success('删除成功');
                    this.getData(this.pcid);
                  }

                })
              }).catch(()=>{
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              })
            },
          getGoodsCategory() {
            getGoodsCategory().then((res) => {

              this.categoryOption = res.datalist;


            })
          },
          transferGoodsCateGory(row){
              this.transfer = {...row};
              this.transfer.from_goods_type_ids = this.transfer['higher_type_id']+","+this.transfer['goods_type_id'];
              this.transfer.to_goods_type_ids_arr = [];
              this.dialogFormVisibleTransfer = true;
          },
          transferGoodsCategory(){
             if(this.transfer.to_goods_type_ids_arr.length==0){
               this.$message.error('请选择分类');
               return false;
             }
             let transferData = JSON.parse(JSON.stringify(this.transfer));
             transferData.to_goods_type_ids = transferData.to_goods_type_ids_arr.join(",");
             transferGoodsCateGory(transferData).then(res=>{
                    if(res.code == 0){
                      this.$message.success("转移成功");
                    }

                    this.dialogFormVisibleTransfer = false;
             });
          },
          setGoodsCategoryType(index,row){
            setCategoryType(row.goods_type_id).then(res=>{
              if(res.code == 0){
                this.$message.success('设置成功');
                this.getData(0);
              }
            })
          }
        },
        created:function(){
            this.getGoodsCategory();
            var pcid = this.$route.query.pcid;
            var type_id = this.$route.query.type_id;
            if(pcid==null){
                this.pcid = 0;
                this.level = 1;
            }else{
                this.pcid = pcid;
                this.level = 2;
                this.type_id = type_id;
            }

            this.getData(pcid);

        },
        components:{
            'pictureview':pictureview
        }
    }
</script>

<style scoped>
    .icon{
        width: 50px;
        height:50px;
    }
</style>
