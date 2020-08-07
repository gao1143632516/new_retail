import Mock from 'mockjs';
import {
  param2Obj
} from 'utils';

const layouts=['complex','table','form','tree'];

function createItem() {
  let id = Mock.Random.increment();
  let name = Mock.Random.ctitle(4, 8);
  return Mock.mock({
    __id: id,
    navigation_id: id,
    timestamp: +Mock.Random.date('T'),
    navigation_name: name,
    label:name,
    'icon|1': ['el-icon-fa-grav', 'el-icon-fa-address-book', 'el-icon-fa-bath', 'el-icon-fa-bandcamp'],
    url: '',
    hide: '@boolean(1,9,false)',
    is_leaf: true,
    list: [],
  });
};

function createList() {
  let result = [];
  let s = Mock.Random.integer(1, 5);
  for (let i = 0; i < s; i++) {
    let item = createItem();
    result.push(item);
    let isList = Mock.Random.boolean(1, 9, true);
    if (isList) {
      item.is_leaf = false
      item.list.push(createList());
    }else{
      item.icon='el-icon-fa-leaf';
      let l=layouts[item.__id%layouts.length];
      item.url= '/page/'+item.__id+/l;
    }
  }
  return result;
};

const List = createList();

export default {
  getMenuList: config => {
    return {
      datalist: List
    }
  },
};
