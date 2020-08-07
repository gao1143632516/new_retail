import Mock from 'mockjs';
import login from './login';

import xpage from './xpage';
import xtable from './xtable';
import xform from './xform';

// 登录相关
Mock.mock(/\/api\/promoter\/loginByUserId/, 'post', login.loginByUserId);
Mock.mock(/\/api\/promoter\/getprofile/,'get', login.getProfile);

Mock.mock(/\/api\/test\/getNavgationByPortalId/,'get', login.getMenuList);
// Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// xpage
Mock.mock(/\/api\/test\/getPageComponentIdByPageId/,'get', xpage.getData);

// // xcomponent
// Mock.mock('/test/getComponentMetaByPageCid', 'get', xcomponent.getMetaData);
// Mock.mock('/test/getComponentData', 'get', xcomponent.getData);
// xtable
Mock.mock(/\/api\/test\/getTableMetadata/, 'get', xtable.getMetadata);
Mock.mock(/\/api\/test\/getTableData/, 'get', xtable.getData);
Mock.mock(/\/api\/test\/postTableData/, 'post', xtable.postData);

// xtree
// Mock.mock('getComponentMetaByPageCid', 'get', xtable.getList);
// Mock.mock('getComponentMetaByPageCid', 'get', xtable.getList);

// xform
Mock.mock(/\/api\/test\/getFormMetadata/, 'get', xform.getMetadata);
Mock.mock(/\/api\/test\/getFormData/, 'get', xform.getData);
Mock.mock(/\/api\/test\/postFormData/, 'post', xform.postData);


export default Mock;
