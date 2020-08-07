import fetch from 'utils/fetch';
import qs from 'qs'
export function loginByUserId(mobile, password) {
  const data = {
    mobile,
    password
  };
  return fetch({
    url: '/login/loginByMobile',
    method: 'post',
    data:qs.stringify(data)
  });
}

// export function logout() {
//   return fetch({
//     url: '/login/logout',
//     method: 'post'
//   });
// }

export function getProfile(sessionkey) {
  return fetch({
    url: '/login/getprofile',
    method: 'get',
    params: {
      sessionkey: sessionkey,
      third_sessionkey: sessionkey
    }
  });
}

export function getMenuList(sessionkey,portalId) {
  return fetch({
    url: '/nrPortal/getNavigationList',

    method: 'get',
    params:{
      sessionkey,
      portal_id:portalId
    }
  });
}