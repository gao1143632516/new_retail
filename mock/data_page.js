import Mock from 'mockjs';
import {
  createTable
} from './data_table';


request
import {
  createTable
} from 'table_data';
const componentTypeList = [{
    name: 'xtable',
    id: 1
  },
  {
    name: 'xform',
    id: 2
  },
  {
    name: 'xdialgform',
    id: 3
  },
  {
    name: 'xtree',
    id: 4
  }
];
const layouts = [{
    name: 'table',
    components: [components[0]],
    hidden: false
  },
  //   {
  //     name: 'form',
  //     components: [components[1]],
  //     hidden:true
  //   },
  // {
  //   name: 'tree',
  //   components: [],
  // },
  {
    name: 'complex',
    components: [components[0], components[2]],
    hidden: false
  },
];

let page_id = 1;
let navigation_id = 1;
let component_id = 1;


const pageList = [];

function getUrlByPageId(pageid, layout) {
  return '/page/' + pageid + '/' + layout.name;
}

function createPageComponent(component_id, componentType, table) {
  //component_id++;
  return {
    component_id,
    table,
    type: componentType,
  }
}

function createPage(navigation_id, page_id, layout) {
  return {
    __id: navigation_id,
    page_id: page_id,
    navigation_id: navigation_id,
    navigation_name: '页面' + page_id,
    label: '页面' + page_id,
    icon: 'el-icon-fa-leaf',
    url: '' + page_id,
    hide: layout.hidden,
    is_leaf: true,
    layout: layout.name,
    list: [],
  };
};

// function createTree(level) {
//   let result = [];
//   if (level > 3) {
//     result;
//   }
//   let s = Mock.Random.integer(3, 6);
//   for (let i = 0; i < s; i++) {
//     let item = createItem();
//     result.push(item);
//     let isList = Mock.Random.boolean(1, 5, true);
//     if (isList) {
//       let list = createTree(level + 1);
//       if (list.length !== 0) {
//         item.is_leaf = false;
//         item.list = list;
//       }
//     } else {
//       item.icon = 'el-icon-fa-leaf';
//       item.page_id = page_id++;
//       let layout = layouts[item.page_id % layouts.length];
//       item._layout = layout;
//       item.url = getUrlByPageId(item.page_id, layout);
//       pageList.push(item);
//     }
//   }
//   return result;
// };

function createNavigation(navigation_id, pages) {
  let icon = Mock.Random.shuffle(
    ['el-icon-fa-grav',
      'el-icon-fa-address-book',
      'el-icon-fa-bath',
      'el-icon-fa-bandcamp'
    ]);
  return {
    __id: navigation_id,
    page_id: 0,
    navigation_id: navigation_id,
    navigation_name: '目录' + navigation_id,
    label: '目录' + navigation_id,
    icon,
    url: '',
    hide: false,
    is_leaf: true,
    list: pages,
  };
};



function createComponentList() {
  let result = [];
  for (let page of pageList) {
    for (let c of page._layout.components) {

    }
  }
  return result;
}

function createData() {
  let data = {};
  let pages = {};
  let components = {};

  let navigation_id = 1;

  let page_id = 1;
  let layout = layouts[0];
  let table = createTable(['日期', '省份']);
  let component = createPageComponent(layout[0].components[0], table);
  let page1 = createPage(navigation_id, page_id, layout);
  pages[page_id] = page1;
  //createTable
  let nav1 = createNavigation(navigation_id, [page1]);
  // return data;
  //   let table = createTable(['日期', '省份']);

  let data = [{
    id: 1,
    is_leaf: false,
    list: [{
        id: 2,
        page_id: 1,
        layout: 'table',
        component_list: [{
          id: 1,
          table: table
        }],
      },
      {
        id: 2,
        page_id: 1,
        layout: 'complex',
        cpn_list: [{
            cpn_id: 2,
            table_id: 2
          },
          {
            cpn_id: 3,
            table_id: 2
          },
        ]
      }
    ]
  }]
}
const menuList = createTree(0);
const componentList = createComponentList();



export default {
  getMenuList() {
    return menuList;
  },
  getPageList() {
    return pageList;
  }
}
