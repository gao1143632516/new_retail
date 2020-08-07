import fetch from '@/utils/fetch'
import qs from 'qs'
export function getUserList(query) {
   // console.log(query);
    return fetch({
        url: "/portal/privilege/getUserList",
        method: 'get',
        params:{
            page_index:query.page,
            page_size:query.limit
        }
    })
}

// export function queryQuizIssueDetail(query) {
//     return fetch({
//         url: "/portal/quiz/queryQuizIssueDetail",
//         method: 'get',
//         params:{
//             issue_id:query,
//         }
//     })
// }
//
// export function addQuizIssue(query) {
//     return fetch({
//         url: "/portal/quiz/addQuizIssue",
//         method: 'post',
//         data: qs.stringify(query)
//
//     })
// }
//
// export function addQuizQuestion(query,issue_id) {
//
//     return fetch({
//         url: `/portal/quiz/addQuizQuestion?issue_id=${issue_id}`,
//         method: 'post',
//         data: qs.stringify(query)
//
//     })
// }
//
//
// export function editQuizQuestion(query) {
//
//     return fetch({
//         url: '/portal/quiz/editQuizQuestion',
//         method: 'post',
//         data: qs.stringify(query)
//
//     })
// }
// export function checkQuestionNum(query) {
//
//     return fetch({
//         url: '/portal/quiz/checkQuestionNum',
//         method: 'get',
//         params:{
//             issue_id:query,
//         }
//
//     })
// }
//
// export function editQuizIssue(query) {
//
//     return fetch({
//         url: '/portal/quiz/editQuizIssue',
//         method: 'post',
//         data: qs.stringify(query)
//
//     })
// }




