import fetch from '@/utils/fetch'
import qs from 'qs'

export function getSequenceStrategyList(query) {
  return fetch({
    url:"/nrOrder/getSequenceStrategyList",
    method:'get',
    params: {
       page_index:query.page,
      page_size:query.limit,
      group_id:query.group_id,
      group_name:query.group_name,
      charset:'utf-8'
    }
  })
}
export function addVirtualSequenceStrategyData(add_number,group_id) {
  return fetch({
    url:"/nrOrder/addVirtualSequenceStrategyData",
    method:'get',
    params:{
      add_num:add_number,
      group_id:group_id
    }
  })

}
export function getSequenceStrategyDetail(group_id) {
  return fetch({
    url:'/nrOrder/getSequenceStrategyDetail',
    method:'get',
    params:{
      group_id:group_id
    }
  })
}
export function getSequenceStrategyGoodsList(group_id) {
   return fetch({
     url:'/nrOrder/getSequenceStrategyGoodsList',
     method:'get',
     params:{
       group_id:group_id
     }
   })
}
export function generateVirtualSequenceStrategyData(group_id,sku_ids,sku_nums,user_id) {
  return fetch({
    url:'/nrOrder/generateVirtualSequenceStrategyData',
    method:'get',
    params:{
      group_id:group_id,
      sku_ids:sku_ids,
      sku_nums:sku_nums,
      user_id:user_id
    }
  })
}
export function getVirtualUser() {
  return fetch({
    url:'/nrOrder/getVirtualUser',
    method:'get',
    params:{

    }
  })
}
export function getSequenceStrategyDiscountRule(group_id) {
  return fetch({
    url:'/nrOrder/getSequenceStrategyDiscountRule',
    method:'get',
    params:{
       group_id:group_id
    }
  })

}
export function addSequenceStrategyDiscountRule(json) {
   return fetch({
     url:'/nrOrder/addSequenceStrategyDiscountRuleItem',
     method:'post',
     data: qs.stringify(json)
   })
}
export function delSequenceStrategyDiscountRuleItem(rule_item_id) {
    return fetch({
      url:'/nrOrder/delSequenceStrategyDiscountRuleItem',
      method:'get',
      params:{
        rule_item_id:rule_item_id
      }
    })
}

