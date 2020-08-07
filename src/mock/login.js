import Mock from 'mockjs';
import {
  param2Obj
} from 'utils';

import xconst from './xconst';




export default {
  loginByUserId: config => {
    // const { email } = JSON.parse(config.body);
    return {
      data: {
        sessionkey: Mock.Random.guid()
      },
      status: {
        code: 0,
        success: true,
        message: '',
      }
    };
  },
  getProfile: config => {
    let name = Mock.Random.cname();
    let url = Mock.Random.image('100x100', '#4A7BF7', name);
    return {
      data: {
        user_id: 1,
        third_user: {
          nickname: name,
          head_img_url: url
        }
      },
      status: {
        code: 0,
        success: true,
        message: '',
      }
    };
  },
  getMenuList: () => {
    return {
      datalist: xconst.getNavigationList(),
      status: {
        code: 0,
        success: true,
        message: '',
      }
    }
  },
  logout: () => 'success'
};
