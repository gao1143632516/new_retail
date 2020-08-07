import fetch from '@/utils/fetch'
import qs from 'qs'

export function getOrderList(query) {
    return fetch({
        url:"/nrOrder/getOrderList",
        method:'get',
        params: {
            page_index:query.page,
            page_size:query.limit,
            order_number:query.order_number,
            status_id:query.status_id,
            delivery_type_id:query.delivery_type_id,
            payment_type_id:query.payment_type_id,
            charset:'utf-8'
        }
    })

}

export function getOrderDetail(order_id) {
    return fetch({
        url:"/nrOrder/getOrderDetail",
        method:'get',
        params: {
            order_id:order_id
        }
    })

}
export function getOrderStatusList(){
	return fetch({
		url:"/nrOrder/getOrderStatusList",
		method:'get',
		params:{

		}
	})
}
export function getPaymentTypeList() {
  return fetch({
    url:'/nrOrder/getPaymentTypeList',
    method:'get',
    params:{

    }
  })
}
export function getPaymentRefundStatusList() {
  return fetch({
    url:'/nrOrder/getPaymentRefundStatusList',
    method:'get',
    params:{

    }
  })
}
export function getPaymentRefundlist(query) {
  return fetch({
    url:'/nrOrder/getPaymentRefundlist',
    method:'get',
    params:{
      refund_order_number:query.refund_order_number,
       page_index:query.page,
       page_size:query.limit,
       refund_status_id:query.refund_status_id
    }
  })
}

export function getPaymentRefundDetail(refund_order_id) {
  return fetch({
    url:'nrOrder/getPaymentRefundDetail',
    method:'get',
    params:{
      refund_order_id:refund_order_id
    }
  })

}
export function handleRefund(refund_order_id,handle_state,isAgree){
   return fetch({
     url:'/nrOrder/handleRefund',
     method:'post',
     data:qs.stringify({refund_order_id:refund_order_id,handle_state:handle_state,isAgree:isAgree})
   })
}


