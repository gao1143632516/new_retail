import fetch from '@/utils/fetch'
import qs from 'qs'
export function getAttachmentList(query) {
    return fetch({
        url: "/attachmentFile/getAttachmentList",
        method: 'get',
        params:{
            page_index:query.pageNumber,
            page_size:query.pageSize,
        }
    })
}
export function delAttachment(attachment_id){
    return fetch({
        url:"/attachmentFile/delAttachment",
        method:'get',
        params:{
            attachment_id :attachment_id
        }
    })
}

