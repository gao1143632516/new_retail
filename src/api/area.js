import fetch from '@/utils/fetch'

export function getProvinceList(country_id=1) {
  return fetch({
    url:"/area/getProvinces",
    method:'get',
    params: {
    country_id:country_id,
    sessionkey:'02d08c914bc7018cc5fe1fdbc2474f3e'
    }
  })
}
export function getCityList(province_id) {
  return fetch({
    url:"/area/getCities",
    method:'get',
    params: {
      province_id:province_id,
      sessionkey:'02d08c914bc7018cc5fe1fdbc2474f3e'
    }
  })
}
export function getCountyList(city_id) {
  return fetch({
    url:"/area/getCounty",
    method:'get',
    params: {
      city_id:city_id,
      sessionkey:'02d08c914bc7018cc5fe1fdbc2474f3e'
    }
  })
}

