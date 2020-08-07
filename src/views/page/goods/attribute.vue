<template>
    <div>
        <div class="handle-box">
            <Blockquote>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addAttribute">添加规格</el-button>
            </Blockquote>
        </div>
        <div class="container">
            <el-table :data="tableData"  Checkbox border style="width: 100%" fit ref="multipleTable">
                <!-- <el-table-column prop="id"  label="id">
                </el-table-column> -->
                <el-table-column prop="spec_name"  label="规格名称">
                </el-table-column>
                <el-table-column   label="规格值">
                    <template slot-scope="scope">
                        <el-tag v-for="item in scope.row.attributeValues" :key="item.spec_detail_id"  size="small" closable @close="handleClose(scope.$index,item.spec_detail_id)"> {{item.spec_detail_name}} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <a  href="javascript:;" @click="addAttribute(scope.$index, scope.row)"> <i class="el-icon-edit-outline"></i>编辑 </a>
                        <a  href="javascript:;" @click="addAttributeValue(scope.$index, scope.row)"> <i class="fa fa-plus"></i>添加规格值 </a>
                        <a  href="javascript:;" @click="handleDelete(scope.$index, scope.row)"> <i class="el-icon-delete"></i>删除 </a>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="规格编辑" :visible.sync="dialogFieldVisible" width="500px">
                <el-form :model="attribute" label-width="80px" ref="form">
                    <el-form-item label="规格名" prop="spec_name"  :rules="[
                                      { required: true, message: '请输入规格名', trigger: 'blur' }
                                      ]">
                        <el-input v-model="attribute.spec_name" placeholder="颜色"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFieldVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveForm('form')">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加规格值" :visible.sync="dialogField2Visible" width="500px">
                <el-form :model="attributeValue" label-width="80px" ref="form2">
                    <el-form-item label="规格值" prop="spec_detail_name"  :rules="[
                                      { required: true, message: '规格值', trigger: 'blur' }
                                      ]">
                        <el-input v-model="attributeValue.spec_detail_name" placeholder="黄色"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogField2Visible = false">取 消</el-button>
                    <el-button type="primary" @click="saveForm2('form2')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getAttribute,updateAttribute,addAttributeValue,delAttributeValues}  from '@/api/goods';
    export default {
        data: function(){
            return {
                tableData:[],
                attribute:{},
                attributeValue:{},
                dialogFieldVisible:false,
                dialogField2Visible:false
            }
        },
        methods: {
            getData() {
                getAttribute().then((res)=>{
                    this.tableData = res.datalist;
                })
                // this.$axios.get(this.HOST+'product/getAttribute',
                //     {

                //     }
                // ).then((res) => {
                //     this.tableData=res.data.data;
                // })
            },
            addAttribute(index,row){
                if(row!=null){
                    this.attribute=row
                }else{
                    this.attribute={}
                }
                this.dialogFieldVisible=true
            },
            addAttributeValue(index,row){
                this.attributeValue={}
                this.attributeValue.spec_id=row.spec_id
                this.dialogField2Visible=true
            },
            saveForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFieldVisible=false;
                        updateAttribute(this.attribute).then((res)=>{
                           if(res.code == 0){
                               this.$message.success('保存成功');
                               this.getData();
                           }
                        })

                        // this.$axios({
                        //     method:"post",
                        //     url: this.HOST+"/product/updateAttribute",
                        //     data: this.attribute
                        // }).then((res)=>{
                        //     if(res.data.code==0) {
                        //         if(this.attribute.id==null){
                        //             this.attribute.id=res.data.data.id;
                        //             this.attribute.attributeValues=[];
                        //             this.tableData.push(this.attribute)
                        //         }
                        //         this.$message.success('保存成功');
                        //     }else{
                        //         this.$message.error(res.data.msg);
                        //     }
                        // })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleClose(index,tagId) {
                console.log(index)
                let attributeValues=this.tableData[index].attributeValues
                for(var o in attributeValues){
                    if(tagId==attributeValues[o].spec_detail_id){
                        attributeValues.splice(o,1);
                    }
                }
                delAttributeValues(tagId).then((res)=>{
                    if(res.code == 0){
                        this.$message.success('删除成功');
                    }
                })
      
            },
            saveForm2(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogField2Visible=false
                        addAttributeValue(this.attributeValue).then((res)=>{
                            if(res.code==0){
                                 this.$message.success('保存成功');
                                 this.getData();
                            }
                        })
                        // this.$axios({
                        //     method:"post",
                        //     url: this.HOST+"/product/addAttributeValue",
                        //     data: this.attributeValue
                        // }).then((res)=>{
                        //     if(res.data.code==0) {
                        //         this.$set(this.attributeValue,"id",res.data.data.id)
                        //         for(var o in this.tableData){
                        //             if(this.tableData[o].id==this.attributeValue.attributeId){
                        //                 this.tableData[o].attributeValues.push(this.attributeValue)
                        //             }
                        //         }
                        //         this.$message.success('保存成功');
                        //     }else{
                        //         this.$message.error(res.data.msg);
                        //     }
                        // })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleDelete(index, row) {

                this.$axios.get(this.HOST+'/product/delAttribute',
                    {
                        params:{id: row.id}
                    }
                ).then((res) => {
                    if(res.data.code==0) {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })

            },
        },
        created:function(){
            this.getData();
        },
    }
</script>

<style scoped>
    .icon{
        width: 50px;
        height:50px;
    }
    .el-tag{
        margin: 2px  5px 2px 0;
    }
</style>
