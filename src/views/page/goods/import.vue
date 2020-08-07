<template>
 <div>   
<el-upload
        multiple
        class="upload-demo"
        ref="upload"
        name="file_name"
        :limit="1"
        :action="actionUrl"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :before-upload="beforeUpload" 
        :on-progress="onProgress"
        :on-success="onSuccess"
        :on-error="onError"
        >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

    <!--        <div style="display:inline-block;margin-right:30px;margin-bottom:20px;">
       类型 <el-select v-model="defaultTypeId" placeholder="请选择" size="mini">
            <el-option
                    v-for="item in typeOptions"
                    :key="item.type_id"
                    :label="item.type_name"
                    :value="item.type_id"
                  >
            </el-option>
        </el-select>
        </div> -->

    <el-button style="margin-left: 10px;" size="" type="success" :loading="vloading"  @click="submitUpload">上传到服务器</el-button>
    <!-- <el-button style="margin-left: 10px;" size="" type="success"  @click="runJob(36)">运行支付宝拉新v2审批job</el-button>
    <el-button style="margin-left: 10px;" size="" type="success" @click="runJob(38)">运行百度拉新job</el-button> -->
       <!-- <el-button style="margin-left: 10px;" size="" type="success" @click="runJob(48)">迪信通erp门店销量表</el-button> -->
    <div slot="tip" class="el-upload__tip">只能上传xlsx、xls或者.csv结尾的文件</div>
</el-upload>


 <div class="request-list">


 </div>   
</div>

</template>
<script>
    import { } from '@/api/goods';
   import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                fileList: [],
                typeOptions:[],
                defaultTypeId:5,
                actionUrl:'',
                requestList:[],
                vloading:false,
             

            };
        },
         created(){
          //  this.uploadUrl =  process.env.BASE_API+"/attachmentFile/uploadPath",+"?sessionkey="+this.sessionkey;
           // this.getTypeList();
            // this.getRequestList();
            // console.log(this.actionUrl)
              this.actionUrl = process.env.BASE_API + "/goods/importGoodsData?type_id=7&sessionkey="+this.sessionkey;
           
        },
        computed:{
         ...mapGetters([
            'sessionkey'
        ]),
        },
        methods: {

            // getTypeList(){
            //     getTypeList().then(response=>{
            //         this.typeOptions = response.datalist;
            //     }).catch(function(err){
            //         console.log('testerror:'+err);
            //     })
            // },


            getRequestList(){
                getRequestList().then(response=>{
                    //console.log(response);
                    this.requestList = response.datalist;
                })
            },
            runJob(job_id){
                
               // var job_id = 36
                runJob(job_id).then(response=>{
                    this.$message({
                            message:"job执行成功",
                            type:"success"
                        });
                  
         
            }).catch(function(err){
                
            })
            },

            submitUpload() {
                console.log(this.actionUrl)
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeUpload(file){
                console.log(file);
                if(/\.xlsx$/.test(file.name)||/\.xls$/.test(file.name)||/\.csv$/.test(file.name)){
                   this.vloading = true;
                    
                } else{
                      this.$message({
                            message:"只能上传xlsx、xls或者csv文件",
                            type:"error"
                        });
                return false;
                }
               if(this.defaultTypeId==''){
                  this.$message({
                            message:"请选择上传类型",
                            type:"error"
                        });
                return false;
               }


               // if(this.defaultTypeId==1){

               //        return new Promise( (resolve,reject)=>{
               //  this.$nextTick(()=>{
               //     this.actionUrl =   process.env.BASE_API + "/import/makeCode?type_id="+this.defaultTypeId;

               //  resolve();
                
               //  })
               // })

               // }
               // else{
               //            return new Promise( (resolve,reject)=>{
               //  this.$nextTick(()=>{
               //     this.actionUrl = process.env.BASE_API + "/import/importExcle?type_id="+this.defaultTypeId;

               //  resolve();
                
               //  })
               // })

               
               // }
         return new Promise( (resolve,reject)=>{
                this.$nextTick(()=>{
                 

                resolve();
                
                })
               })
               
              //this.uploadUrl = process.env.BASE_API + "/import/importExcle?type_id="+this.defaultTypeId;

              //console.log(this.uploadUrl);
            
            
            },
            onProgress(event, file, fileList){
                console.log(event,file,fileList)
            },
            // uploadUrl(){
            //     var url = process.env.BASE_API + "/import/makeCode?type_id="+this.defaultTypeId;
            //     return url;
            // },
            onSuccess(response, file, fileList){
                console.log(response);
                if(response.success==false){
                    this.$message({
                            message:response.status.message,
                            type:"error"
                        });
                }else{
                    this.$message({
                            message:'上传成功',
                            type:"success"
                        });
                //window.reload();
                this.$refs.upload.clearFiles();
                // this.getRequestList();
                this.vloading =false;

                }
            },
            onError(err, file, fileList){
                console.log(err);
                 this.vloading =false;
            }

        
        }
    }
</script>

<style>
 
</style>