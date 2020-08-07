<template>
  <div>
    <div class="handle-box">
      <Blockquote>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-search"></i>筛选搜索</span>
            <el-button style="float: right;" size="mini">重置</el-button>
            <el-button style="float: right;" type="primary" size="mini" @click="search">查询结果</el-button>
            <el-form :inline="true" :model="listQuery" class="demo-form-inline">
              <el-form-item label="商品名称">
                <el-input v-model="listQuery.goods_name" placeholder="商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-cascader expand-trigger="hover" :options="categoryOption" :props="props" v-model="listQuery.goods_type_ids">
                </el-cascader>
              </el-form-item>
              <el-form-item label="商品条码">
                <el-input v-model="listQuery.goods_code" placeholder="商品条码"></el-input>
              </el-form-item>
              <!-- <el-form-item label="上架状态">
                    <el-select v-model="listQuery.isMarketable" placeholder="活动区域">
                    <el-option label="上架" value="true"></el-option>
                    <el-option label="下架" value="false"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
          </div>
        </el-card>
      </Blockquote>
    </div>
    <div class="container">
      <el-table :data="tableData" Checkbox border style="width: 100%" fit ref="multipleTable">
        <el-table-column type="index" label="#" width="40">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="sku_specs" label="商品规格" width="100">
        </el-table-column>
        <el-table-column prop="goods_code" label="商品码" width="100">
        </el-table-column>
        <el-table-column prop="sku_num_upper_limit_value" width="80" label="库存上限">
        </el-table-column>
        <el-table-column prop="sku_num_lower_limit_value" width="80" label="库存下限">
        </el-table-column>
        <el-table-column prop="sku_cost_price" width="80" label="成本价">
          <template slot-scope="scope">
            {{scope.row.sku_cost_price}}
          </template>
        </el-table-column>
        <el-table-column prop="sku_retail_price" width="80" label="销售价">
          <template slot-scope="scope">
            {{scope.row.sku_retail_price}}
          </template>
        </el-table-column>
        <el-table-column prop="sku_num" label="当前库存" width="80">
        </el-table-column>
        <el-table-column prop="sku_stock_status" width="80" label="库存状态">
        </el-table-column>
        <!-- <el-table-column prop="isMarketable"  label="上下架状态">
                    <template slot-scope="scope">
                        {{scope.row.isMarketable ?'正常':'下架'}}
                    </template>
                </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a  href="javascript:;" @click="toReplenishGoods(scope.$index,scope.row)">补货 </a>
            <router-link :to="{path:'/page/goods/stockHistory',query:{sku_id:scope.row.sku_id}}">入库记录</router-link>
            <a  href="javascript:;" @click="toReduction(scope.$index, scope.row)"> 减库存 </a>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="补货" :visible.sync="dialogFormVisible">
      <span>原有库存：{{replenishGoodsForm.sku_num}}</span>
      <span>原有成本价格：{{replenishGoodsForm.sku_cost_price}}</span>
      <span>原有销售价格：{{replenishGoodsForm.sku_retail_price}}</span>
      <br />
      <span>改变后库存：{{final_sku_num}}</span>
      <span>改变后平均成本价：{{final_sku_cost_price}}</span>
      <span>改变后销售价格：{{final_sku_retail_price}}</span>
      <el-form :model="replenishGoodsForm" label-width="100px">
        <el-form-item label="增加数量">
          <el-input v-model.trim="replenishGoodsForm.replenishGoodsNum" @input="toInt()"></el-input>
        </el-form-item>
        <el-form-item label="成本价格">
          <el-input v-model.trim="replenishGoodsForm.aft_sku_cost_price" type="number"></el-input>
        </el-form-item>
        <!--<el-form-item label="补货商品销售价格">-->
        <!--<el-input v-model.trim="replenishGoodsForm.aft_sku_retail_price" type="number" label-width="100px" style="width:150px;"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label='运单号'>
          <el-row>
            <el-col :span="18">
              <el-input v-model="replenishGoodsForm.waybill_num" />
            </el-col>
            <el-col :span="4" :offset="2">
              <el-button size="mini" @click=generate>自动生成</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='运单号图片'>
          <div class="el-flex">
            <pictureview type="upload" picNum="3" selectedImg @selectChange="selectChangeMany"></pictureview>
            <!-- <img
                v-for=" (item,index) in goods.goods_image_list"
                :key="index"
                :src="item.url"
                alt
                style="witdh:80px;height:80px"
              /> -->
            </div>
        </el-form-item>
        <el-form-item label='购买订单'>
          <el-row>
            <el-col :span="18">
              <el-input v-model="replenishGoodsForm.purchase_num" />
            </el-col>
            <el-col :span="4" :offset="2">
              <el-button size="mini" @click=generate>自动生成</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='订单号图片'>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" :rows="2" placeholder="输入操作原因" v-model="replenishGoodsForm.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="replenishGoods">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="减库存" :visible.sync="dialogFormVisibleReduce">
      <el-form :model="reduceGoodsForm">
        <el-form-item label="减少类型">
          <el-select v-model="reduceGoodsForm.type_id" placeholder="请选择">
            <el-option v-for="item in reduceReasonOption" :key="item.type_id" :label="item.type_name" :value="item.type_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="减少数量">
          <el-input v-model.trim="reduceGoodsForm.reduceGoodsNum" label-width="100px" style="width:150px;"></el-input>
        </el-form-item>
        <el-input type="textarea" :rows="2" placeholder="输入操作原因" v-model="reduceGoodsForm.description">
        </el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleReduce = false">取 消</el-button>
        <el-button type="primary" @click="reduceGoods">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fenToyuan, yuanTofen ,parseTime} from "@/utils/index";
import { getGoodsSkuList, getGoodsCategory, replenishGoods, reduceGoods } from '@/api/goods';
import pictureview from "@/components/pictureview/index";

export default {
  components:{
    pictureview
  },
  data: function() {
    return {

      replenishGoodsForm: { replenishGoodsNum: 0, sku_id: 0, sku_num: 0, sku_retail_price: 0, sku_cost_price: 0, aft_sku_retail_price: 0, aft_sku_cost_price: 0, purchase_num: 0, purchase_pics: '', waybill_num: 0, waybill_pics: '' },
      reduceGoodsForm: {},
      dialogFormVisible: false,
      dialogFormVisibleReduce: false,
      tableData: [],
      productPage: {},
      selectedGoods: {},
      reduceReasonOption: [{
          'type_id': 8,
          'type_name': '报损'
        },
        {
          'type_id': 9,
          'type_name': '自用'
        }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        goods_code: '',
        goods_name: '',
        goods_type_ids: []
      },
      categoryOption: [],

      selectedOptions2: [],
      props: {
        value: 'goods_type_id',
        label: 'goods_type_name',
        children: 'childCategory'
      },
      length: 0
    }
  },
  methods: {
    toInt() {
      this.$nextTick(() => {
        if (this.replenishGoodsForm.replenishGoodsNum == '') {
          this.replenishGoodsForm.replenishGoodsNum = 0;
        }
        this.replenishGoodsForm.replenishGoodsNum = parseInt(this.replenishGoodsForm.replenishGoodsNum.replace(/[^\d]/g, ''));
      })

    },


    handleChange(value) {
      console.log(value);
    },
    addContent() {
      this.$router.push({ path: '/page/goods/goodsEdit' });
    },
    getData() {
      var bak = Object.assign({}, this.listQuery);
      if (bak.isMarketable === false) {
        bak.isMarketable = 0;
      } else if (bak.isMarketable === true) {
        bak.isMarketable = 1;
      } else {
        bak.isMarketable = 3;
      }

      bak.goods_type_ids = bak.goods_type_ids.join(",");

      getGoodsSkuList(bak).then((res) => {
        if (res.code == 0) {
          this.length = res.data.count;
          res.data.list.map(res => {
            res.sku_cost_price = fenToyuan(res.sku_cost_price);
            res.sku_retail_price = fenToyuan(res.sku_retail_price);
            res.sku_spec_list = JSON.parse(res.sku_spec_list);
            res.sku_specs = "";
            if (res.sku_spec_list)
              res.sku_spec_list.map(r => {
                res.sku_specs += r.spec_detail_name + ","
              })
            if (res.sku_num == 0) {
              res.sku_stock_status = '售罄';
            } else if (res.sku_num_upper_limit_value <= res.sku_num) {
              res.sku_stock_status = '超量';
            } else if (res.sku_num_lower_limit_value >= res.sku_num) {
              res.sku_stock_status = '预警'
            } else {

            }

          })
          this.tableData = res.data.list;

        }
      })
    },
    toReplenishGoods(index, row) {
      this.dialogFormVisible = true;
      this.replenishGoodsForm.sku_id = row.sku_id;
      this.replenishGoodsForm.sku_num = row.sku_num;
      this.replenishGoodsForm.sku_retail_price = row.sku_retail_price;
      this.replenishGoodsForm.sku_cost_price = row.sku_cost_price;
      this.replenishGoodsForm.aft_sku_retail_price = row.sku_retail_price;
      this.replenishGoodsForm.aft_sku_cost_price = row.sku_cost_price;
    },
    replenishGoods() {
      var buck_replenishGoodsForm = { ...this.replenishGoodsForm };
      buck_replenishGoodsForm.aft_sku_retail_price = yuanTofen(buck_replenishGoodsForm.aft_sku_retail_price);
      buck_replenishGoodsForm.aft_sku_cost_price = yuanTofen(buck_replenishGoodsForm.aft_sku_cost_price);
      replenishGoods(buck_replenishGoodsForm).then(res => {

        if (this.replenishGoodsForm.replenishGoodsNum <= 0) {
          this.$message.success('增加量不能为负数或者零');
          return false;
        }
        this.$message.success('设置成功');
        this.dialogFormVisible = false;
        this.getData();
      })
    },
    toReduction(index, row) {
      this.dialogFormVisibleReduce = true;
      this.reduceGoodsForm.sku_id = row.sku_id;

    },
    reduceGoods() {

      reduceGoods(this.reduceGoodsForm).then(res => {

        if (this.reduceGoodsForm.reduceGoodsNum <= 0) {
          this.$message.success('不能为负数或者零');
          return false;
        }
        this.$message.success('设置成功');
        this.dialogFormVisibleReduce = false;
        this.getData();
      })
    },

    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getData()
    },
    batchDel() {

    },
    handleDelete(index, row) {

    },
    handleSort(index, row) {
      this.$set(this.tableData, 0, this.tableData[0])
      this.saveGoods(row)
    },
    handleSelectCell(row, column, cell, event) {
      this.selectedGoods = row;
    },

    search() {
      this.getData();
    },
    getGoodsCategory() {
      getGoodsCategory().then(res => {
        this.categoryOption = res.datalist;

      })
    },
    generate(){
     let num = parseTime(new Date(),'{y}{m}{d}');
    },
    selectChangeMany(data){

    }
  },
  created: function() {
    this.getData();
    this.getGoodsCategory();

  },
  computed: {
    final_sku_num: function() {
      return this.replenishGoodsForm.sku_num + this.replenishGoodsForm.replenishGoodsNum;
    },
    final_sku_retail_price: function() {
      return this.replenishGoodsForm.aft_sku_retail_price
    },
    final_sku_cost_price: function() {
      if ((this.replenishGoodsForm.sku_num + this.replenishGoodsForm.replenishGoodsNum) !== 0) {
        console.log("this.replenishGoodsForm.replenishGoodsNum", this.replenishGoodsForm.replenishGoodsNum);
        console.log("this.replenishGoodsForm.aft_sku_cost_price", this.replenishGoodsForm.aft_sku_cost_price);
        console.log(this.replenishGoodsForm.replenishGoodsNum * this.replenishGoodsForm.aft_sku_cost_price);
        return ((this.replenishGoodsForm.sku_num * this.replenishGoodsForm.sku_cost_price + this.replenishGoodsForm.replenishGoodsNum * this.replenishGoodsForm.aft_sku_cost_price) / (this.replenishGoodsForm.sku_num + this.replenishGoodsForm.replenishGoodsNum)).toFixed(2);

      }
      return 0;



    }
  }
}

</script>
<style scoped>
.el-table .cell .thumbnail {
  width: 60px;
}

</style>
