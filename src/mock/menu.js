import Mock from 'mockjs';
import {
  param2Obj
} from 'utils';

const List = [{
    is_dir: true,
    menu_id: 1,
    name: 'dir1',
    list: [{
        is_dir: true,
        menu_id: 2,
        name: 'dir2',
        list: []
      },
      {
        is_dir: false,
        menu_id: 3,
        name: 'page3',
        page_id: 3
      }
    ]
  },
  {
    is_dir: false,
    menu_id: 3,
    name: 'page2',
    page_id: 2
  }

];


export default {
  getList: () => {
    return {
      datalist: List
    }
  },
};
