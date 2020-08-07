<template>
    <div class="app-container">

            <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleAddData()">添加</el-button>

    <el-table
            :data="tableData"
            v-loading="listLoading"
            style="width: 100%">

        <el-table-column
                label="用户id"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="名字"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEditData(scope.$index, scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleManage(scope.$index, scope.row)">管理</el-button>
            </template>
        </el-table-column>
    </el-table>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange"  :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
            </el-pagination>
        </div>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="temp_form" :rules="rules" ref="dataForm">
                <el-form-item label="期数编号"   prop="issue_no"  :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.issue_no" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="issue_name" :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.issue_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="题数" prop="issue_question_number" :label-width="formLabelWidth">
                    <el-input v-model.number.trim="temp_form.issue_question_number" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="红包" prop="issue_bonus" :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.issue_bonus" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确定</el-button>
                <el-button v-else type="primary" @click="updateData">确定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import { getUserList } from '@/api/privilege';
    export default {
        data() {
            return {
                length:0,
                tableData:[],
                listLoading:false,
                dialogFormVisible:false,
                dialogStatus:'',
                textMap: {
                    update: '修改',
                    create: '添加'
                },

                temp_form: {
                    issue_id:'',
                    issue_no:'',
                    issue_name: '',
                    issue_question_number: '',
                    issue_bonus:''
                },
                formLabelWidth: '120px' ,
                listQuery: {
                    page: 1,
                    limit: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
                rules:{
                    issue_no:[ { required: true, message: '请输入编号', trigger: 'blur' }],
                    issue_name:[ { required: true, message: '请输入名字', trigger: 'blur' }],
                    issue_question_number:[{type:'number',required:true,message:'必须为数字',trigger:'blur'}],
                    issue_bonus:[{required:true,message:'必须填入'}],

                }
            }
        },
        created(){
          this.getList();

        },
        methods: {
            getList(){
                this.listLoading = true;
                getUserList(this.listQuery).then(response => {

                    if(response.code==0){

                        this.tableData = response.data.result;
                        this.length = response.data.number
                    }else{

                    }

                   this.listLoading = false
                })

            },
            handleCurrentChange(val){
                this.listQuery.page = val
                this.getList()
            },

            handleEditData(index, row) {
                console.log(index, row);
                this.temp_form = Object.assign({},row);
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(index,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            handleManage(index,row){
                console.log(row);
                  var user_id = row.id;
              //  this.$router.push({ path: '/' });
                this.$router.push({path:`/page/privilege/detail?user_id=${user_id}`});
            },
            handleAddData(){
                this.resetTemp();
                this.dialogStatus = 'create'
                let length =
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })

            },
            addData(){

                this.$refs['dataForm'].validate((valid) => {
                    console.log(this.tableData);
                    if (valid) {
                        addQuizIssue(this.temp_form).then(response => {
                            if (response.code == 0) {
                                this.meassageBox('添加成功', 'success');
                                this.temp_form.issue_id = response.data;
                                this.dialogFormVisible = false;
                                this.tableData.unshift(this.temp_form);

                            } else {
                                this.meassageBox('添加失败', 'warning');
                            }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },


            updateData(){
                this.$refs['dataForm'].validate((valid) => {
                  if(valid){
                      console.log(this.tableData)
                      editQuizIssue(this.temp_form).then(response => {
                          if (response.code == 0) {
                              for(const v of this.tableData){
                                  if(v.issue_id === this.temp_form.issue_id){
                                      const index = this.tableData.indexOf(v);
                                      this.tableData.splice(index,1,this.temp_form);
                                      break;

                                  }
                              }
                              this.meassageBox('修改成功', 'success');
                              this.dialogFormVisible = false;



                          } else {
                              this.meassageBox('修改失败', 'warning');
                          }

                      })
                  }else{
                      console.log('error submit!!');
                      return false;
                  }
                })

            },
            resetTemp() {
                this.temp_form = {
                       issue_id:'',
                        issue_no:'',
                        issue_name: '',
                        issue_question_number: '',
                        issue_bonus:''
                }
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