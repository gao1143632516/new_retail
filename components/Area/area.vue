<template>
  <div style="display: flex;flex-direction: column">
    <div style="display: flex;">
    <el-select  v-model="caddress.province_id" style="flex: 1;" placeholder="请选择省份" size="small" @change="provinceChange">
      <el-option
        v-for="item in provinceList"
        :key="item.province_id"
        :label="item.province_name"
        :value="item.province_id"
      >
      </el-option>
    </el-select>
    <el-select  v-model="caddress.city_id" style="flex: 1;margin-left: 10px" placeholder="请选择市区" size="small"
                @change="cityChange">
      <el-option
        v-for="item in cityList"
        :key="item.city_id"
        :label="item.city_name"
        :value="item.city_id">
      </el-option>
    </el-select>
    <el-select v-if="caddress.county_id==1"  v-model="caddress.county_id" style="flex: 1;margin-left: 10px" placeholder="请选择县" size="small">
      <el-option
        v-for="item in countyList"
        :key="item.county_id"
        :label="item.county_name"
        :value="item.county_id">
      </el-option>
    </el-select>
    </div>
    <div> <el-input type="textarea" v-model="caddress.address"></el-input></div>

  </div>
</template>
<script>
  import {getProvinceList,getCityList,getCountyList} from '@/api/area';
    export default {
      name : "area",
      props:{
        caddress:{
          type:Object
        },
        is_edit:{
          type:Boolean
        }

      },
      data(){
        return {
          provinceList:[],
          cityList:[],
          countyList:[]
        }
      },
      created(){

        if(this.is_edit){
          let that = this;
          that.getProvinceList(this.caddress.country_id);
          that.getCityData(that.caddress.province_id);
          that.getCountyData(that.caddress.city_id);

        }
          this.getProvinceList(this.caddress.country_id);
      },

      methods:{
        getProvinceList(country_id){
          getProvinceList(country_id).then(res=>{
            this.provinceList = res.datalist;
          })
        },
        provinceChange(city_id){
          this.caddress.city_id = '';
          this.caddress.county_id = '';
          this.countyList = [];
          this.getCityData(city_id);

        },
        cityChange(city_id){
          this.caddress.county_id = '';
          this.countyList = [];
          this.getCountyData(city_id);
        },
        getCountyData(province_id){
          getCountyList(province_id).then(res=>{
            this.countyList = res.datalist;
          })
        },
        getCityData(city_id){
          getCityList(city_id).then(res=>{
            this.cityList = res.datalist;
          })
        }
      }
    }


</script>
