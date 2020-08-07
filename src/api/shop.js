import fetch from '@/utils/fetch'
import qs from 'qs'

export function getShopList() {
  return fetch({
    url:"/merchant/getShopList",
    method:'get',
    params: {

    }
  })
}
export function getShopInfoByShopId(shop_id) {
  return fetch({
    url:"/merchant/getShopInfoByShopId",
    method:'get',
    params:{
      merchant_id:shop_id
    }
  })

}
export function updateShopInfo(goodsInfo) {
  return fetch({
    url:'merchant/updateShopInfo',
    method:'post',
    data:qs.stringify(goodsInfo)
  })
}
export function getAdList() {
   return fetch({
     url:'/merchant/getAdList',
     method:'get',
     params:{

     }
   })
}
export function updateShopAd(form) {
  return fetch({
    url:'/merchant/updateShopAd',
    method:'post',
    data:qs.stringify(form)
  })
}
export function deleteShopAd(ad_id) {
  return fetch({
    url:'/merchant/deleteShopAd',
    method:'get',
    params:{
      ad_id
    }
  })
}

export function getAdPositionList() {
  return fetch({
    url:'merchant/getAdPositionList',
    method:'get',
    params:{}
  })
}

