import fetch from '@/utils/fetch'
import qs from 'qs'
export function getCategorys(query) {
    return fetch({
        url: "/goods/getCategorys",
        method: 'get',
    })
}

export function getReceiptDetail(query) {
    return fetch({
        url: "/portal/receipt/getReceiptDetail",
        method: 'get',
        params:{
            receipt_id:query,
        }
    })
}


export function updateProduct(query) {
    return fetch({
        url:"portal/receipt/agree",
        method:'post',
        data: qs.stringify(query)
    })

}


export function disagree(query) {
    return fetch({
        url:"portal/receipt/disagree",
        method:'post',
        data: qs.stringify(query)
    })

}
