<template>
    <div class="app-container">

        <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleAddData()">添加</el-button>

        <el-table
                :data="questionTableData"
                v-loading="listLoading"
                style="width: 100%">
            <el-table-column
                    label="题号"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.question_no }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="题目"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.question_stem }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="选项"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.question_option }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="答案编号"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.question_right_answer }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column-->
                    <!--label="创建时间"-->
                    <!--width="180">-->
                <!--<template slot-scope="scope">-->
                    <!--<i class="el-icon-time"></i>-->
                    <!--<span style="margin-left: 10px">{{ scope.row.createdate }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>




        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="objData" :rules="rules" ref="dataForm">
                <el-form-item label="题号" prop="question_no" :label-width="formLabelWidth">
                    <el-input v-model.trim.number="objData.question_no"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="题目" prop="question_stem" :label-width="formLabelWidth">
                    <el-input v-model.trim="objData.question_stem"   auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="选项" prop="question_option"  :label-width="formLabelWidth">
                    <el-input v-model.trim="objData.question_option" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="答案编号"  prop="question_right_answer" :label-width="formLabelWidth">
                    <el-input v-model.number.trim="objData.question_right_answer"  auto-complete="off"></el-input>
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
    import { queryQuizIssueDetail ,addQuizQuestion,editQuizQuestion, checkQuestionNum} from '@/api/question';
    export default {
        data() {
            return {
                questionTableData: [],
                listLoading:false,
                dialogFormVisible:false,
                dialogStatus:'',
                textMap: {
                    update: '修改',
                    create: '添加'
                },
                objData:{
                    question_id:'',
                    question_no: '',
                    question_stem: '',
                    question_option:'',
                    question_right_answer:''
                },
                rules:{
                    question_no:[ { required: true, message: '请输入编号'}],
                    question_stem:[ { required: true, message: '请输入名字', trigger: 'blur' }],
                    question_option:[{required:true,message:'必须为填入',trigger:'blur'}],
                    question_right_answer:[{required:true,message:'必须填入'}],

                },

                formLabelWidth: '120px' ,
            }
        },
        created(){

            this.getQuestionList();
        },
        methods: {
            getQuestionList(){
                this.listLoading = true;
                queryQuizIssueDetail(this.$route.query.issue_id).then(response => {
                    if(response.code==0){
                        this.questionTableData = response.datalist;
                    }else{

                    }

                    this.listLoading = false
                })

            },



            handleEdit(index, row) {
                console.log(index, row);
                this.objData = Object.assign({},row);
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })

            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleAddData(){

                var issue_id = this.$route.query.issue_id;
                checkQuestionNum(issue_id).then(resource =>{
                    if(resource.code == 0){
                        var issue_question_number = resource.data.issue_name.issue_question_number;
                        var question_num = resource.data.question_num.question_num;
                        if(issue_question_number>question_num){
                            this.resetTemp();
                            let length = this.questionTableData.length;
                            if(length==0){
                                this.objData.question_no = 1

                            }else{
                                this.objData.question_no = length+1;
                            }
                            this.dialogStatus = 'create'
                            this.dialogFormVisible = true
                            this.$nextTick(() => {
                                this.$refs['dataForm'].clearValidate()
                            })
                        }else{
                            this.meassageBox('已添加够了', 'warning');
                        }
                    }else{

                    }
                })

            },
            addData(){
                var issue_id = this.$route.query.issue_id;
                this.$refs['dataForm'].validate((valid) => {
                    if(valid){

                        addQuizQuestion(this.objData,issue_id).then(response => {
                            if (response.code == 0) {
                                this.meassageBox('添加成功', 'success');
                                this.objData.question_id = response.data;
                                this.dialogFormVisible = false;
                                this.questionTableData.push(this.objData);

                            } else {
                                this.meassageBox('添加失败', 'warning');
                            }

                        })
                    }else{

                    }
                })


            },
            updateData(){
                this.$refs['dataForm'].validate((valid) => {
                    if(valid){
                        editQuizQuestion(this.objData).then(response => {
                            for(const v of this.questionTableData){
                                if(v.question_id === this.objData.question_id){
                                    const index = this.questionTableData.indexOf(v);
                                    this.questionTableData.splice(index,1,this.objData);
                                    break;

                                }
                            }
                            this.meassageBox('修改成功', 'success');
                            this.dialogFormVisible = false;
                        })

                    }else{

                    }
                })

            },
            meassageBox(meassage,type){
                this.$message({
                    message:meassage,
                    type:type
                });
            },
            resetTemp() {
                this.objData={
                    question_id:'',
                        question_no: '',
                        question_stem: '',
                        question_option:'',
                        question_right_answe:''
                }
            },


        }
    }
</script>