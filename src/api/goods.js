import fetch from '@/utils/fetch'
import qs from 'qs'
export function getCategorys() {
    return fetch({
        url: "/goods/getCategorys?level=1",
        method: 'get',
        params:{}
    })
}

export function getCategoryList() {
    return fetch({
        url: "/goods/getCategorys",
        method: 'get',
        params:{}
    })
}
export function getCategorysByCid(cid){
    return fetch({
        url:"/goods/getCategorysChildByCid",
        method:'get',
        params:{"cid":cid}
    })
}


export function getAttribute() {
    return fetch({
        url: "/goods/getAttribute",
        method: 'get',
        params:{

        }
    })
}


export function addProduct(goods) {
    return fetch({
        url:"/goods/addProduct",
        method:'post',
        data: qs.stringify(goods)
    })

}
export function updateProduct(goods) {
    return fetch({
        url:"/goods/updateProduct",
        method:'post',
        data: qs.stringify(goods)
    })

}


export function getGoodsList(query) {
    return fetch({
        url:"/goods/getGoodsList",
        method:'get',
        params: {
            page_index:query.page,
            page_size:query.limit,
            goods_type_ids:query.goods_type_ids,
            goods_name:query.goods_name,
            isMarketable:query.isMarketable,
            goods_code:query.goods_code,
            goods_brand:query.goods_brand,
            charset:'utf-8'
        }
    })

}
export function getGoodsById(goods_id){
    return fetch({
        url:"/goods/getPortalGoodsById",
        method:'get',
        params:{
            goods_id:goods_id
        }
    })
}
export function updateAttribute(data){
    return fetch({
        url:"/goods/updateAttribute",
        method:'post',
        data:qs.stringify(data)
    })
}
export function addAttributeValue(data){
    return fetch({
        url:"/goods/addAttributeValue",
        method:'post',
        data:qs.stringify(data)
    })
}
export function delAttributeValues(spec_detail_id){
    return fetch({
        url:'/goods/delAttributeValues',
        method:'get',
        params:{
            spec_detail_id:spec_detail_id
        }
    })

}
export function updateCategory(category){
    return fetch({
        url:'/goods/updateCategory',
        method:'post',
        data:qs.stringify(category)
    })
}
export function setGoodsSortNum(goods_id,sort_num){
    return fetch({
        url:'/goods/setGoodsSortNum',
        method:'get',
        params:{
            goods_id:goods_id,
            sort_num:sort_num
        }
    })
}
export function setGoodsIsMarketable(goods_id,isMarketable){
    return fetch({
        url:'/goods/setGoodsIsMarketable',
        method:'get',
        params:{
            goods_id:goods_id,
            isMarketable:isMarketable
        }
    })
}
/**
 * 搜索分类列表
 */
export function getGoodsCategory(){
    return fetch({
        url:'/goods/getGoodsCategory',
        method:'get',
        params:{

        }
    })
}

export function getGoodsSkuList(query){
    return fetch({
        url:'/goods/getGoodsSkuList',
        method:'get',
        params:{
            page_index:query.page,
            page_size:query.limit,
            goods_name:query.goods_name,
            goods_code:query.goods_code,
            goods_type_ids:query.goods_type_ids,
            charset:'utf-8'
        }
    })
}

export function replenishGoods(query){
    return fetch({
        url:'/goods/replenishGoods',
        method:'post',
        data:qs.stringify(query)
    })
}
export function getStockHistory(query){
   return fetch({
       url:'/goods/getStockHistory',
       method:'get',
       params:{
           sku_id:query.sku_id,
           page_index:query.page,
           page_size:query.limit
       }
   })
}

export function importData(jsons){
    return fetch({
        url:'/goods/importGoodsData',
        method:'post',

         data:jsons

    })
}

export function getPrintGoodsList(query){
    return fetch({
        url:'/goods/getPrintGoodsList',
        method:'get',
        params:{
            start_time:query.timeRange[0],
            end_time:query.timeRange[1],
            goods_name:query.goods_name,
            goods_code:query.goods_code,
            goods_type_ids:query.goods_type_ids,
            charset:'utf-8'
        }
    })
}
export function deleteCategoryByTypeId(goods_type_id){
    return fetch({
        url:'/goods/deleteCategoryByTypeId',
        method:'get',
        params:{
            goods_type_id:goods_type_id
        }
    })
}

export function setRecommentGoods(goods_id,is_recomment){
    return fetch({
        url:'/goods/setRecommentGoods',
        method:'post',
         data:qs.stringify({goods_id:goods_id,is_recomment:is_recomment})

    })

}
export function transferGoodsCateGory(transferData) {
    return fetch({
      url:'/goods/transferGoodsCateGory',
      method:'post',
      data:qs.stringify(transferData)
    })
}

export function queryGoodsByMerchantId(page,limit,merchant_id,keywords) {
  return fetch({
    url:'/goods/queryGoodsByMerchantId',
    method:'get',
    params:{
      charset:'utf-8',
      page_index:page,
      page_size:limit,
      merchant_id:merchant_id,
      keywords:keywords
    }
  })
}
export function getGoodsAssociatedList(goods_ids) {
  return fetch({
    url:'/goods/getGoodsAssociatedList',
    method:'get',
    params:{
      goods_ids:goods_ids
    }
  })

}
export function delGoodsByGoodsId(goods_id) {
  return fetch({
    url:'/goods/delGoodsByGoodsId',
    method:'get',
    params:{
      goods_id:goods_id
    }
  })
}
export function getProductOriginList() {
  return fetch({
    url:'/nr_delivery/getProductOriginList',
    method:'get',
    params:{

    }
  })
}
export function reduceGoods(json) {
  return fetch({
    url:'/goods/reduceGoods',
    method:'post',
    data:qs.stringify(json)
  })

}

export function setCategoryType(goods_type_id){
  return fetch({
    url:'goods/setCategoryType',
    method:'get',
    params:{
      goods_type_id:goods_type_id
    }
  })
}
