import Mock from 'mockjs';
import {
  param2Obj
} from 'utils';
import xconst from './xconst';

export default {
  getData: config => {
    const { page_id } = param2Obj(config.url);
    let componentList=xconst.getComponentListByPageId(page_id);
    let datalist=[];
    for(let component of componentList){
      datalist.push({page_cid:component.id});
    }
    return {
      datalist,
      status: {
        code: 0,
        success: true,
        message: '',
      }
    }
  },
};
