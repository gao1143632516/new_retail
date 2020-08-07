import Mock from 'mockjs';
import {
  createTable
} from './data_table';
let table = {};

table[1] = createTable('table1',['日期', '省份','城市','区县','邮编']);
table[2] = createTable('table2',['姓名', '身份证','时间','邮箱','金钱','guid']);
const component = {}
component[1] = {
  id: 1,
  table_id: 1
}
component[2] = {
  id: 2,
  table_id: 2
}
component[3] = {
  id: 3,
  table_id: 2
}
let page = {};
page[1] = {
  id: 2,
  page_id: 1,
  layout: 'table',
  cpn_list: [component[1]],
};
page[2] = {
  id: 3,
  page_id: 2,
  layout: 'complex',
  cpn_list: [component[2], component[3]]
};

let menuList = [{
  id: 1,
  list: [page[1],page[2]]
}];

function createPage(menu) {

  return {
    __id: menu.id,
    page_id: menu.page_id,
    navigation_id: menu.id,
    navigation_name: '页面' + menu.page_id,
    label: '页面' + menu.page_id,
    icon: 'el-icon-fa-leaf',
    url: '/page/' + menu.page_id,
    // hide: layout.hidden,
    is_leaf: true,
    layout: menu.layout,
    list: [],
  };
};

function createNavigation(pmenu) {
  let result = [];
  if (!pmenu || pmenu.length === 0) {
    return result;
  }
  for (let menu of pmenu) {
    if (menu.page_id && menu.page_id > 0) {
      result.push(createPage(menu));
    } else {
      let list = createNavigation(menu.list);
      let icon = Mock.Random.pick(
        ['el-icon-fa-grav',
          'el-icon-fa-address-book',
          'el-icon-fa-bath',
          'el-icon-fa-bandcamp'
        ]);
      let id = menu.id;
      result.push({
        __id: id,
        icon,
        // page_id: 0,
        navigation_id: id,
        navigation_name: '目录' + id,
        label: '目录' + id,
        url: '',
        hide: false,
        // is_leaf: true,
        list: list,
      });
    }

  }
  return result;

};

const navigationList = createNavigation(menuList);

export default {
  //   getUrlByPageId: pageid => {
  //     let layout= layouts[pageid % layouts.length];
  //     return '/page/'+pageid+'/'+layout.name;
  //   },
  getComponentListByPageId: page_id => {
    return page[page_id].cpn_list;
  },
  // getComponentNameByComponentId: cid => {
  //   return components[(cid % 100) % components.length].name;
  // },
  getNavigationList: () => {
    return navigationList;
  },
  getComponent: (component_id) => {
    return component[component_id];
  },
  getTable: table_id => {
    return table[table_id];
  },
  // getTableByCompoentId: component_id => {
  //   return table[component[component_id].table_id];
  // }
  // getRandomPageUrl: (layoutName) => {
  //   let list = Mock.Random.shuffle(pageList);
  //   for (let item of list) {
  //     if (item._layout.name == layoutName) {
  //       return item.url;
  //     }
  //   }
  //   return '';
  // }


}
