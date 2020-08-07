<template>

  <div class="app-container">
    <el-tabs value="first">
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="form" :model="goods" :rules="rules" label-width="100px">
          <el-form-item label="商品标题" prop="goods_name">
            <el-input v-model="goods.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="英文标题">
          <el-input v-model="goods.goods_english_name"></el-input>
        </el-form-item>
          <el-form-item label="是否跨域购买">
            <el-switch v-model="goods.can_cross_domain_buy" active-color="#009688" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item v-if="goods.can_cross_domain_buy == true" label="原产国代码">
            <el-select v-model="goods.product_origin" placeholder="请选择">
              <el-option
                v-for="item in product_origin_options"
                :key="item.product_origin_id"
                :label="item.product_origin_name"
                :value="item.product_origin_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品品牌" prop="goods_brand">
            <el-input v-model="goods.goods_brand"></el-input>
          </el-form-item>
          <el-form-item label="商品产地" prop="production_place">
            <el-input v-model="goods.production_place"></el-input>
          </el-form-item>
          <el-form-item label="商品编号" prop="goods_code">
            <el-input v-model.trim="goods.goods_code" placeholder="不填将自动生成"></el-input>
          </el-form-item>
          <el-form-item label="商品类目">
            <el-cascader
              expand-trigger="hover"
              :options="categoryOption"
              :props="props"
              v-model="goods.goods_type_ids"
            >
            </el-cascader>

          </el-form-item>
          <el-form-item label="封面图">
            <div class="el-flex">
              <pictureview
                type="upload"
                picNum="1"
                :selectedImg="goods.goods_images"
                @selectChange="selectChange"
              ></pictureview>
            </div>
          </el-form-item>
          <el-form-item label="图片集">
            <div class="el-flex">
              <pictureview type="upload" picNum="3" selectedImg @selectChange="selectChangeMany"></pictureview>
              <img
                v-for=" (item,index) in goods.goods_image_list"
                :key="index"
                :src="item.url"
                alt
                style="witdh:80px;height:80px"
              />
            </div>
          </el-form-item>

          <el-form-item label="商品介绍">
            <el-input type="text" v-model="goods.description"></el-input>
          </el-form-item>

          <el-form-item label="最小价" prop="min_price">
            <el-input type="number" v-model.number="goods.min_price"></el-input>
          </el-form-item>
          <el-form-item label="最大价" prop="max_price">
            <el-input type="number" v-model.number="goods.max_price"></el-input>
          </el-form-item>
          <el-form-item label="包装费" prop="packing_expense" >
            <el-input type="number" v-model.number="goods.packing_expense" style="width:100px"></el-input>
          </el-form-item>

          <el-form-item label="起订量">
            <el-input type="text" v-model="goods.minimum_order_quantity_value"></el-input>
          </el-form-item>
          <el-form-item label="起订量描述">
            <el-input type="text" v-model="goods.minimum_order_quantity"  placeholder="如5箱起订"></el-input>
          </el-form-item>
          <el-form-item label="箱规">
            <el-input type="text" v-model="goods.carton_size" placeholder="如8套/箱"></el-input>
          </el-form-item>
          <el-form-item label="建议零售价">
            <el-input type="text" v-model="goods.suggested_retail_price" placeholder="如90.00 元/包"></el-input>
          </el-form-item>
          <el-form-item label="供货商">
            <el-input type="text" v-model="goods.supplier" placeholder="供货商"></el-input>
          </el-form-item>
          <el-form-item label="是否虚拟产品">
            <el-switch v-model="goods.is_virtual" active-color="#009688" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="是否限制购买">
            <el-switch v-model="goods.is_limit" active-color="#009688" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item v-if="goods.is_limit == true" label="限制数量">
            <el-input type="text" v-model="goods.limit_num"></el-input>
          </el-form-item>

          <el-form-item label="是否有折扣">
            <el-switch v-model="goods.is_discount" active-color="#009688" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item v-if="goods.is_discount == true" label="折扣时间">
            <el-date-picker
              v-model="timeRange"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              :default-time="['12:00:00']">
            </el-date-picker>
          </el-form-item>
          <!--<el-form-item v-if="goods.is_discount == true" label="折扣比例%">-->
            <!--<template>-->
              <!--<el-input-number v-model="discount_rate" @change="discountRateChange" :min="1" :max="100" label="折扣比例"></el-input-number>-->
            <!--</template>-->
          <!--</el-form-item>-->

          <el-form-item label="排序" prop="sort_num" >
            <el-input type="number" v-model.number="goods.sort_num" style="width:100px"></el-input>
          </el-form-item>

          <el-form-item label="是否上架">
            <el-switch v-model="goods.isMarketable" active-color="#009688" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <div class="editor-container" style="width: 800px">
            <tinymce :height="400" ref="editor" v-model="goods.goods_text"></tinymce>
          </div>
          <!-- <div class="editor-container">
           <tinymce :height="200" ref="editor" v-model="goods.goods_images_text"></tinymce>
         </div> -->

        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-tabs value="second">
      <el-tab-pane label="sku" name="second">
        <el-row class="attribute_group">
          <el-col :span="3" class="attribute_title">选择规格项目</el-col>
          <el-col  :span="20">
            <template>
              <el-checkbox-group v-model="checkedAttributesStr" :min="1" :max="3">
                <el-checkbox  :disabled="isEdit"
                              v-for="attribute in attributesStr"
                              :label="attribute"
                              :key="attribute"
                >{{attribute}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in checkedAttributes" class="attribute_group" :key="index">
          <el-col :span="3" class="attribute_title">{{item.spec_name}}</el-col>
          <el-col  :span="20">
            <template v-for="(attributeValue,index) in item.attributeValues">
              <el-checkbox   :disabled="isEdit"
                             :key="index"
                             v-model="attributeValue.checked"
                             @change="changeChecked"
              >{{attributeValue.spec_detail_name}}</el-checkbox>
            </template>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <!--<el-col :span="3" style="font-size: 14px">-->
          <!--<div class="specifications_title">设置价格，库存</div>-->
          <!--<div class="specifications_button">-->
          <!--<el-button size="mini" type="success" @click="recovery">恢复</el-button>-->
          <!--</div>-->
          <!--</el-col>-->
          <el-col  :span="24">
            <el-table
              size="mini"
              :data="specificationsTableData"
              style="width: 100%"
              @cell-click="selectSpecification"
            >
              <!--<el-table-column prop="sku_name" label="SKU" width="80"></el-table-column>-->
              <el-table-column label="规格" width="100">
                <template slot-scope="scope">
                  <el-tag
                    v-for="(item,index) in scope.row.attributeValues"
                    :key="index"
                    size="small"
                  >{{item.spec_detail_name}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="sku_code" label="商品sku码" width="100">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sku_code" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="sku_cost_price" label="成本价格"  width="90">
                <template slot-scope="scope">
                  <el-input type="number" min="0" v-model="scope.row.sku_cost_price" size="small" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="sku_original_price" label="原价" width="90">
                <template slot-scope="scope">
                  <el-input type="number" min="0" v-model="scope.row.sku_original_price" size="small"></el-input>
                </template>
              </el-table-column>
          <!--     <el-table-column prop="tax_rate" label="税率(%)" width="90">
              <template slot-scope="scope">
                <el-input type="number" min="0" max="100" v-model.trim.number="scope.row.tax_rate" size="small"></el-input>
              </template>
            </el-table-column> -->
              <el-table-column prop="sku_discount_price" label="折扣价" width="90">
                <template slot-scope="scope">
                  <el-input type="number" min="0" v-model="scope.row.sku_discount_price" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="重量(g)" width="90">
                <template slot-scope="scope">
                  <el-input type="number" min="0" v-model="scope.row.weight" size="small"></el-input>
                </template>
              </el-table-column>
              <!--<el-table-column prop="reference_price_one" label="参考价1" width="100">-->
              <!--<template slot-scope="scope">-->
              <!--<el-input type="number" min="0" v-model="scope.row.reference_price_one" size="small"></el-input>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="reference_price_two" label="参考价2" width="100">-->
              <!--<template slot-scope="scope">-->
              <!--<el-input type="number" min="0" v-model="scope.row.reference_price_two" size="small"></el-input>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column prop="sku_num" label="库存" width="90"style="display: none;">
                <template slot-scope="scope">
                  <el-input type="number" min="0"   v-model="scope.row.sku_num" size="small" disabled></el-input>
                </template>
              </el-table-column>
              <!--<el-table-column prop="sku_num_upper_limit_value" label="库存上限值" width="90">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-input type="number" min="0" v-model="scope.row.sku_num_upper_limit_value" size="small"></el-input>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="sku_num_lower_limit_value" label="库存下限值" width="90">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-input type="number" min="0" v-model="scope.row.sku_num_lower_limit_value" size="small"></el-input>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="sku_reward" label="返现" width="90">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-input type="number" min="0" v-model="scope.row.sku_reward" size="small"></el-input>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column  label="超量购买" width="90">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.no_stock_can_sell"
                             active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="图片" width="100">
                <template slot-scope="scope">
                  <div class="el-flex specificationsImg">
                    <pictureview
                      type="upload"
                      :selectedImg="scope.row.sku_banner_image"
                      @selectChange="handlespecificationsImgSuccess"
                    ></pictureview>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="deleteSpecifications(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- <el-button>取消</el-button> -->
    </el-tabs>
    <el-tabs value="third">
      <el-tab-pane label="关联商品" name="third">
        <el-autocomplete
          style="width:400px"
          class="inline-input self-auto"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入要关联的商品"
          @select="handleSelect"
        >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick">
          </i>
          <template slot-scope="props">
            <span class="goods_name">{{ props.item.goods_name }}</span>
          </template>


        </el-autocomplete>  <el-button type="primary" size="mini" @click="addassociatedGoods" plain>添加</el-button>
        <template>
          <el-table
            size="mini"
            :data="associatedList"
            style="width: 50%">
            <el-table-column
              prop="goods_name"
              label="名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goods_images"
              label="图片"
              width="180">
              <template slot-scope="scope">
                <img :src="scope.row.goods_images" style="width: 40%" alt="">
              </template>
            </el-table-column>
            <el-table-column
              prop="goods_code"
              label="条码">
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="deleteAssociated(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-button v-if="this.goods.goods_id!=null" type="primary" @click="saveForm('update')" :loading="button_loading">修改</el-button>
    <el-button v-else type="primary" @click="saveForm('add')" :loading="button_loading">添加</el-button>
  </div>
</template>

<script>
  import Tinymce from "@/components/Tinymce";
  import pictureview from "@/components/pictureview/index";
  import {yuanTofen,fenToyuan,deepClone} from "@/utils/index";
  import { mapGetters } from 'vuex';
  import {
    addProduct,
    getCategorys,
    getAttribute,
    getGoodsById,
    updateProduct,
    getCategorysByCid,
    getGoodsCategory,
    queryGoodsByMerchantId,
    getGoodsAssociatedList,
    getProductOriginList
  } from "@/api/goods";

  export default {
    data: function() {
      return {
        state1:'',
        associatedList:[],
        currentAssociate:{},
        categoryOption:[],
        timeRange:'',
        discount_rate:0,
        product_origin_options:[

        ],
        props:{
          value:'goods_type_id',
          label:'goods_type_name',
          children:'childCategory'
        },
        pickerOptions: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
        },
        goods: {
          sku_num: 0,
          sort_num:0,
          isMarketable: true,
          description: "",
          goods_type_ids: [],
          goods_text: "",
          goods_image_list: [],
          goods_brand:"",
          minimum_order_quantity_value:1,
          is_limit:0,
          limit_num:0,
          supplier:"",
          is_virtual:0,
          production_place:"",
          packing_expense:0
        },
        isEdit:false,
        categorys: [],
        caregorysChild: [],
        editorSetting: {
          height: 400
        },
//        parameterValue: [],
        attributes: [],
        attributesStr: [],
        checkedAttributes: [],
        checkedAttributesStr: [],
        checkedAttributesArr: [],
        specifications: [],
        specificationsTableData: [],
        selectedSpecification: {},
        button_loading:false,
        rules: {
          goods_name: [
            { required: true, message: "请输入商品名字", trigger: "blur" }
          ],
//          goods_english_name:[
//            { required: true, message: "请输入商品英文名字", trigger: "blur" }
//          ]
          // goods_brand: [
          //   { required: true, message: "请输入商品品牌", trigger: "blur" }
          // ],
//          goods_code: [
//            { required: true, message: "请输入商品码", trigger: "blur" }
//          ],
          // goods_images: [
          //   { required: true, message: "请上传商品封面图", trigger: "blur" }
          // ],
//          min_price: [
//            {
//              type: "number",
//              required: true,
//              message: "请输入最小价格",
//              trigger: "blur"
//            }
//          ],
//          max_price: [
//            {
//              type: "number",
//              required: true,
//              message: "请输入最大价格",
//              trigger: "blur"
//            }
//          ]
        }
      };
    },
    computed: {
      ...mapGetters([
       'merchant_id'
      ])
    },
    methods: {
      getData() {
        getGoodsById(this.goods.goods_id).then(res => {
          if (res.code == 0) {
            res.data.goods.goods_type_ids = res.data.goods.goods_type_ids.split(
              ","
            );
            res.data.goods.goods_type_ids[0] = Number(
              res.data.goods.goods_type_ids[0]
            );
            // getCategorysByCid(res.data.goods.goods_type_ids[0]).then(res => {
            //   this.caregorysChild = res.datalist;
            // });
            if (res.data.goods.goods_type_ids[1] != "")
              res.data.goods.goods_type_ids[1] = Number(
                res.data.goods.goods_type_ids[1]
              );
            res.data.goods.goods_image_list = JSON.parse(
              res.data.goods.goods_image_list
            );

            res.data.goods.min_price = fenToyuan(res.data.goods.min_price);
            res.data.goods.max_price = fenToyuan(res.data.goods.max_price);
            res.data.goods.packing_expense = fenToyuan(res.data.goods.packing_expense);
            if(res.data.goods.discount_end_time == '2000-01-01 00:00:00'){//未设置默认
              this.timeRange = [];
            }else{
              this.timeRange = [res.data.goods.discount_start_time,res.data.goods.discount_end_time];
            }
            if(res.data.goods.associated_goods_id != '' ){//获得关联商品
              this.getGoodsAssociatedList(res.data.goods.goods_id)
            }




            this.goods = res.data.goods;

            // res.data.specification.sku_spec_list = res.data.specification.specifications;//更改变量的名字

            for(let value of res.data.specification.specifications) {
              value.sku_cost_price = fenToyuan(value.sku_cost_price);
              value.sku_retail_price = fenToyuan(value.sku_retail_price);
              value.sku_original_price = fenToyuan(value.sku_original_price);
              value.sku_discount_price = fenToyuan(value.sku_discount_price);
              value.reference_price_one = fenToyuan(value.reference_price_one);
              value.reference_price_two = fenToyuan(value.reference_price_two);
              value.sku_reward = fenToyuan(value.sku_reward);
              value.tax_rate = yuanTofen(value.tax_rate);

            };
            this.specifications = res.data.specification.specifications;
            this.specificationsTableData = res.data.specification.specifications;
            this.checkedAttributes = res.data.specification.checkedAttributes;

            for (let o of this.checkedAttributes) {
              this.checkedAttributesStr.push(o.spec_name);
            }
          }
        });

        // this.$axios.get(this.HOST+'product/getProduct',
        //     {
        //         params:{"id":this.goods.id}
        //     }
        // ).then((res) => {
        //     this.goods=res.data.data;
        //     this.parameterValue=JSON.parse(res.data.data.parameterValue)
        // })
      },
      getProductOriginList(){
        getProductOriginList().then(res=>{
          this.product_origin_options = res.datalist;
        })
      },
      no_stock_can_sell(val){
        this.specificationsTableData[0].no_stock_can_sell = true
        console.log(this.specificationsTableData[0].no_stock_can_sell);
        console.log(val)
      },
     getAssociatedGoodsListByIds(){

     },
      init: function() {
        if (this.$route.query.goods_id != null) {
          this.goods.goods_id = this.$route.query.goods_id;
          this.isEdit = true;
          this.getData();
        }else{
          this.specificationsTableData = [{
            attributeValues:[{
              spec_detail_id: 1,
              spec_detail_name: "默认",
              spec_id: 1,
            }],
            no_stock_can_sell: false,
            reference_price_one: 0,
            reference_price_two: 0,
            sku_banner_image: "",
            sku_code: "",
            sku_cost_price:0,
            sku_id: 0,
            sku_name: "SKU1",
            sku_num: 0,
            sku_num_lower_limit_value: 0,
            sku_num_upper_limit_value: 0,
            sku_original_price: 0,
            sku_retail_price: 0,
            sku_discount_price:0,
            sku_reward: 0,
            tax_rate: 0,
            weight:0,
          }
        ]

        }
      },
      saveForm(formName) {

        var goods_bak = Object.assign({}, this.goods);
        goods_bak.goods_type_ids = goods_bak.goods_type_ids.join(",");

        if(goods_bak.goods_type_ids.length == 0){
           this.$message.error("请选择商品类目！");
           return false;
        }
        console.log("timeRange:"+this.timeRange);
        if(this.timeRange == null){
          this.$message.error("请选择折扣时间！");
          return  false;
        }
        goods_bak.discount_start_time = this.timeRange[0];
        goods_bak.discount_end_time = this.timeRange[1];

        goods_bak.goods_image_list = JSON.stringify(goods_bak.goods_image_list);
        goods_bak.packing_expense = yuanTofen(goods_bak.packing_expense);
        goods_bak.specifications = deepClone(this.specificationsTableData);
        var associated_goods_id_arr = [];
        this.associatedList.map((item,index)=>{
          associated_goods_id_arr.push(item.goods_id);
        })
        goods_bak.associated_goods_id = associated_goods_id_arr.join(",");




        if (goods_bak.specifications.length==0) {
          this.$message.error("请选择商品规格，如果没有请选择默认！");
          return false;
        }
        // if (
        //   goods_bak.specifications.sku_num == "" ||
        //   goods_bak.specifications.sku_retail_price == ""
        // ) {
        //   this.$message.error("商品规格数量和价格不能为空！");
        //   return false;
        // }
        for(let spec of goods_bak.specifications){
          console.log(spec.sku_num,spec.sku_cost_price,spec.sku_original_price)
          if(spec.sku_num === "" || spec.sku_cost_price === "" || spec.sku_original_price === ""){
            this.$message.error("商品规格数量和价格不能为空！");
            return false;
          }

          spec.sku_cost_price = yuanTofen(spec.sku_cost_price);
          spec.sku_discount_price = yuanTofen(spec.sku_discount_price);
          spec.sku_original_price = yuanTofen(spec.sku_original_price);
          spec.reference_price_two = yuanTofen(spec.reference_price_two);
          spec.reference_price_one = yuanTofen(spec.reference_price_one);
          spec.sku_reward = yuanTofen(spec.sku_reward);
          spec.tax_rate = fenToyuan(spec.tax_rate);
        }
        if(goods_bak.can_cross_domain_buy == true){//能跨域购买
              if(goods_bak.product_origin.length==0){
                this.$message.error("跨域商品必须选择国家代码");
                return false;
              }
        }

        goods_bak.max_price = goods_bak.specifications[0].sku_original_price;
        goods_bak.min_price = goods_bak.specifications[0].sku_original_price;


        goods_bak.specifications = JSON.stringify(goods_bak.specifications);


        this.$refs["form"].validate(valid => {
          if (valid) {

            this.button_loading = true;
            if (formName == "add") {
              addProduct(goods_bak).then(res => {
                if (res.code == 0) {

                  this.$router.push({ path: "/page/goods/index" });
                } else {
                  that.button_loading =false;
                  this.$message.error(res.data.msg);
                }
              });
            } else {
              updateProduct(goods_bak).then(res => {
                if (res.code == 0) {
                  this.$router.push({ path: "/page/goods/index" });
                } else {
                  that.button_loading =false;
                  this.$message.error(res.data.msg);
                }
              });
            }

          } else {
            console.log("error submit !!");
            return false;
          }
        });
      },
      getCategorys() {
        getCategorys().then(res => {
          this.categorys = res.datalist;
        });
      },
      getCategorysByCid() {
        this.goods.goods_type_ids[1] = "";
        getCategorysByCid(this.goods.goods_type_ids[0]).then(res => {
          this.caregorysChild = res.datalist;
        });
      },
      getGoodsCategory(){
        getGoodsCategory().then(res=>{
          this.categoryOption = res.datalist;

        })
      },

      getAttribute() {
        getAttribute().then(res => {
          this.attributes = res.datalist;
          for (let o of this.attributes) {
            this.attributesStr.push(o.spec_name);
          }
        });
      },
      // handleImgSuccess(res, file){
      //     this.$set(this.goods,"thumbnail_temp",res.url)
      //     this.$set(this.goods,"thumbnail",res.url)
      // },
      deleteSpecifications(index, row) {
        // this.specificationsTableData.splice(index,1);
        this.specificationsTableData = this.specificationsTableData.filter(
          (item, indexitem) => {
            return index != indexitem;
          }
        );
        // this.$axios.get(this.HOST+'product/getSpecification',
        //     {
        //         params:{"productId":this.goods.id}
        //     }
        // ).then((res) => {
        //     this.specifications=res.data.data.specifications;
        //     this.specificationsTableData=res.data.data.specifications;
        //     this.checkedAttributes=res.data.data.checkedAttributes;
        //     for(let o of this.checkedAttributes){
        //         this.checkedAttributesStr.push(o.name)
        //     }
        // })
      },
      handlespecificationsImgSuccess(attachments) {
        if (attachments != null) {
          console.log(attachments);
          this.selectedSpecification.sku_banner_image = attachments[0].url;
          this.selectedSpecification.sku_banner_image = attachments[0].url;
          console.log(this.selectedSpecification);
          // for(let o in this.selectedSpecification){
          //     console.log(o);
          //     if(this.selectedSpecification[o].sku_name== this.selectedSpecification.sku_name){
          //         this.selectedSpecification[o]=this.selectedSpecification;
          //         break;
          //     }
          // }
          this.$set(this.selectedSpecification, 0, this.selectedSpecification[0]);
        }
      },
      attributeChecked(item) {
        for (let o of this.checkedAttributes) {
          if (o.name == item.name) {
            return true;
          }
        }
        return false;
      },
      changeChecked() {
        this.checkedAttributes.sort(this.compare("spec_id"));
        let checkedAttributes = this.checkedAttributes;
        console.log("checkAttributes", this.checkedAttributes);
        let checkedAttributesArr = [];
        for (let o in checkedAttributes) {
          let temp = [];
          for (let attr of checkedAttributes[o].attributeValues) {
            if (attr.checked) {
              let attribute = {};
              attribute.spec_detail_id = attr.spec_detail_id;
              attribute.spec_id = attr.spec_id;
              attribute.spec_detail_name = attr.spec_detail_name;
              temp.push(attribute);
            }
          }
          if (temp.length > 0) {
            checkedAttributesArr.push(temp);
          }
        }
        this.checkedAttributesArr = checkedAttributesArr;
        console.log("checkAttributeArr:")
        console.log(+this.checkedAttributesArr);
        ;        if (checkedAttributesArr.length > 0)
          this.specificationsTableData = this.descartes(
            checkedAttributesArr,
            checkedAttributesArr.length - 1
          );
      },

      //笛卡儿积组合
      descartes(checkedAttributesArr, index) {
        if (index == 0) {
          let specifications = [];
          for (let o of checkedAttributesArr[index]) {
            let attributeValues = [];
            let specification = {};
            specification.sku_name = "SKU" + o.spec_detail_id;
            specification.sku_banner_image = "";
            specification.sku_num = 0;
            specification.sku_original_price = 0;
            specification.sku_retail_price = 0;
            specifications.sku_discount_price = 0;
            specification.sku_cost_price = 0;
            specification.sku_code = "";
            specification.no_stock_can_sell = false;
            specification.sku_num_upper_limit_value = 0;
            specification.sku_num_lower_limit_value = 0;
            specification.reference_price_one = 0;
            specification.reference_price_two = 0;
            specification.sku_reward = 0;
            specification.tax_rate = 0;
            attributeValues.push(o);
            specification.attributeValues = attributeValues.concat();
            specifications.push(specification);
          }
          return specifications;
        } else if (index >= 1) {
          let specificationsTemp = this.descartes(
            checkedAttributesArr,
            index - 1
          );
          console.log(specificationsTemp);
          let specifications = [];
          for (let o of specificationsTemp) {
            for (let b of checkedAttributesArr[index]) {
              let specification = {};
              specification.sku_name = o.sku_name;
              specification.attributeValues = o.attributeValues.concat();
              specification.attributeValues.push(b);
              specification.sku_name = o.sku_name + b.spec_detail_id;
              specification.goods_id = this.goods.goods_id;
              specification.sku_banner_image = "";
              specification.sku_num = 0;
              specification.sku_original_price = 0;
              specification.sku_retail_price = 0;
              specification.sku_discount_price = 0;
              specification.sku_cost_price = 0;
              specification.sku_code = "";
              specification.no_stock_can_sell = false;
              specification.sku_num_lower_limit_value = 0;
              specification.sku_num_upper_limit_value = 0;
              specification.reference_price_one = 0;
              specification.reference_price_two = 0;
              specification.sku_reward = 0;
              specification.tax_rate = 0;
              for (let v of this.specificationsTableData) {
                if (v.sku_name == specification.sku_name) {
                  specification.sku_num = v.sku_num;
                  specification.sku_retail_price = v.sku_retail_price;
                  specification.sku_banner_image = v.sku_banner_image;
                  specification.sku_cost_price = v.sku_cost_price;
                  specification.sku_code = v.sku_code;
                  specification.no_stock_can_sell = v.no_stock_can_sell;
                  specification.sku_num_lower_limit_value = v.sku_num_lower_limit_value;
                  specification.sku_num_upper_limit_value = v.sku_num_upper_limit_value;
                  specification.reference_price_one = v.reference_price_one;
                  specification.reference_price_two = v.reference_price_two;
                  specification.sku_reward = v.sku_reward;
                  break;
                }
              }
              specifications.push(specification);
            }
          }
          return specifications;
        } else {
        }
      },

      compare(prop) {
        return function(obj1, obj2) {
          console.log(obj1, obj2);
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }
        };
      },
      getCheckedAttributes(attributeValues) {
        let temp = [];
        for (let o of attributeValues) {
          if (o.checked) {
            temp.push(o);
          }
        }
        return temp;
      },
      selectSpecification(row, column, cell, event) {
        this.selectedSpecification = row;
      },
      saveSpecification() {
        this.$confirm("此操作将会把所有更改写入到数据库, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log(JSON.stringify(this.specificationsTableData));
            // this.$axios({
            //     method:"post",
            //     url: this.HOST+"/product/saveSpecification",
            //     data: {"specifications":JSON.stringify(this.specificationsTableData)}
            // }).then((res)=>{
            //     if(res.data.code==0) {
            //         this.$message.success('保存成功');
            //     }else{
            //         this.$message.error(res.data.msg);
            //     }
            // })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存"
            });
          });
      },

      selectChange(attachments) {
        if (attachments != null) {
          console.log(attachments);
          this.$set(this.goods, "goods_images", attachments[0].url);
        }
      },
      selectChangeMany(attachments) {
        if (attachments != null) {
          attachments.map(item => {
            delete item.attachment_id;
            delete item.checked;
          });
          console.log(attachments);
          this.$set(this.goods, "goods_image_list", attachments);
        }
      },
      recovery() {
        this.$confirm("此操作将会恢复到数据库数据状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.specificationsTableData = this.specifications;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消恢复"
            });

          });
      },
      findExtra(valArr, oldValArr) {
        valArr.sort();
        oldValArr.sort();
        let i;
        for (i = 0; i < valArr.length && i < oldValArr.length; i++) {
          if (valArr[i] != oldValArr[i]) {
            break;
          }
        }
        return valArr.length > oldValArr.length ? valArr[i] : oldValArr[i];
      },
      querySearch(queryString,cb){
        var page_index = 1;
        var page_size = 10;
        var merchant_id = this.merchant_id;
        var keywords = queryString;
//        console.log(cb);
        queryGoodsByMerchantId(page_index,page_size,merchant_id,queryString).then(res=>{
         cb(res.datalist);
        })
      },
      handleSelect(item){
//        console.log(item);
        this.state1 = item.goods_name;
        this.currentAssociate = item;


      },
      deleteAssociated(index,row){
        this.associatedList.splice(index,1);
      },
      addassociatedGoods(){
         console.log("currentAssci");
         console.log(this.currentAssociate.goods_name);
        if(this.currentAssociate.goods_name == undefined){
          return false;
        }

        var is_repeat = true;
        for(const assoc of this.associatedList){
            if(assoc.goods_name == this.currentAssociate.goods_name){
              is_repeat = false;

            }
        }
        if(is_repeat){
          this.associatedList.unshift(this.currentAssociate);
        }
        this.state1 = '';

      },
      getGoodsAssociatedList(associated_goods_id){
        getGoodsAssociatedList(associated_goods_id).then(res=> {
        this.associatedList = res.datalist;
        })
      },
      handleIconClick(ev) {
        console.log(ev);
      },
//      discountRateChange(value){
//        if(value==0){
//          this.specifications[0].sku_discount_price = 0;
//        }else{
//          this.specifications[0].sku_discount_price = this.specifications[0].sku_original_price * value/100;
//        }
//      }
    },
    watch: {
      $route(to, from) {
        this.init();
      },
//      parameterValue: {
//        handler(val, oldVal) {
//          this.$set(this.goods, "parameterValue", JSON.stringify(oldVal));
//        },
//        deep: true
//      },
      checkedAttributesStr: {
        handler(val, oldVal) {
          if (val != oldVal) {
            var str = this.findExtra(val, oldVal);
            if (val.length > oldVal.length) {
              for (var o of this.attributes) {
                if (o.spec_name == str) {

                  //  this.checkedAttributes.push(o).sort(this.compare("spec_id"));
                  console.log("fff"+this.checkedAttributes.push(o));
                  break;
                }
              }
            } else {
              for (var o in this.checkedAttributes) {
                if (this.checkedAttributes[o].spec_name == str) {
                  this.checkedAttributes.splice(o, 1);
                  break;
                }
              }
            }
          }
          return true;
        },
        deep: true
      },


    },
    created: function() {
      this.init();
      this.getCategorys();
      this.getGoodsCategory();
      this.getAttribute();
      this.getProductOriginList();
     // this.querySearch();
    },
    components: {
      Tinymce: Tinymce,
      pictureview: pictureview
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .title-prompt {
    position: absolute;
    right: 0px;
    font-size: 12px;
    top: 10px;
    color: #ff4949;
  }

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }

      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;

        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;

          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
  .attribute_group {
    display: none;
    height: 30px;
  }
  .attribute_group .attribute_title {
    /*text-align: right;*/
  }
  .el-tag {
    margin-right: 5px;
    margin-right: 5px;
  }
  .specificationsImg .el-upload,
  .specificationsImg .el-upload .avatar-uploader-icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  .specifications_title {
    height: 30px;
  }

</style>

