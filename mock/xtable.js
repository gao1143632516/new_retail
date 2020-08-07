import Mock from 'mockjs';
import xconst from './xconst';
import qs from 'qs';

import {
  param2Obj
} from 'utils';
import {
  createDataItem
} from './data_table';


const _components = {
  1: {
    table_id: 1,
    metadata: {
      pageable: true,
      selectable: true,
      handlers: [{
          handler_id:1,
          label: '批量调整',
          type: 'action',
          value: 'modify',
          mode: 2, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
        {
          handler_id:2,
          label: '批量删除',
          type: 'action',
          value: 'delete',
          mode: 2, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
        {
          handler_id:3,
          label: '详情',
          type: 'link',
          value: '/page/2',
          mode: 1, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
        {
          handler_id:4,
          label: '调整',
          type: 'action',
          value: 'modify',
          mode: 1, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
        {
          handler_id:5,
          label: '删除',
          type: 'action',
          value: 'delete',
          mode: 1, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
      ],
      
    }
  },
  2: {
    table_id: 2,
    metadata: {
      pageable: true,
      selectable: true,
      handlers: [{
          handler_id:1,
          label: '批量调整',
          type: 'action',
          value: 'modify',
          mode: 2, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
        {
          handler_id:2,
          label: '批量删除',
          type: 'action',
          value: 'delete',
          mode: 2, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
        {
          handler_id:3,
          label: '修改',
          type: 'event',
          value: 'before_update_table2',
          mode: 1, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
        {
          handler_id:4,
          label: '详情',
          type: 'link',
          value: '/page/2',
          mode: 1, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
        {
          handler_id:5,
          label: '调整',
          type: 'action',
          value: 'modify',
          mode: 1, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
        {
          handler_id:6,
          label: '删除',
          type: 'action',
          value: 'delete',
          mode: 1, //选择的记录数据 0,不需选择，1,当前记录，2，多选记录
        },
      ],

    }
  }
}

function createMetadata(table, _metadata) {
  let columns = table.fields
  let filters = Mock.Random.shuffle(columns)
    .slice(-Mock.Random.integer(1, columns.length))
    .map(k => {
      return {
        ...k,
      }
    });
  let selectable = Mock.Random.boolean();
  let pageable = Mock.Random.boolean();
  return {
    columns: columns,
    filters: filters,
    listeners: {
      refresh: ['after_update_' + table.name]
    },
    ..._metadata
  };
}

function createComponentData(component_id) {
  let table = xconst.getTable(_components[component_id].table_id);
  let metadata = createMetadata(table, _components[component_id].metadata);
  //metadatas[component_id] = metadata;
  //tables[component_id] = table;
  return {
    table,
    metadata,
    datalist: table.datalist
  }
}



const components = {};



export default {
  getMetadata: config => {
    let url = config.url;
    url = url.substring(url.indexOf('?') + 1);
    const params = qs.parse(url);
    const component_id = params['_cid'];
    let component = components[component_id];
    if (!component) {
      component = createComponentData(component_id);
      components[component_id] = component;
    }
    return {
      data: component.metadata,
      status: {
        code: 0,
        success: true,
        message: '',
      }
    }
  },
  getData: config => {
    let url = config.url;
    url = url.substring(url.indexOf('?') + 1);
    const params = qs.parse(url);
    const component_id = params['_cid'];

    let component = components[component_id];
    let datalist = component.datalist;
    let meta = component.metadata;

    let filterList = datalist.filter(item => {
      let filters = [...meta.filters];
      // 内部的条件
      filters.push({
        field: '_id'
      });
      filters.push({
        field: '_pid'
      });
      for (let f of filters) {
        let fv = params[f.field];
        if (!!fv) {
          if (item[f.field] != fv)
            return false;
        }
      }
      return true;
    });
    let page = {};
    if (meta.pageable) {
      let pageindex = Number(params.pageindex || 1);
      let pagesize = Number(params.pagesize || 10);
      let total = filterList.length;
      filterList = filterList.filter((item, index) =>
        index < pagesize * pageindex && index >= pagesize * (pageindex - 1)
      );
      page = {
        pageindex,
        pagesize,
        total
      };
    }
    return {
      datalist: filterList,
      status: {
        code: 0,
        success: true,
        message: '',
      },
      page: page
    }

  },
  postData: config => {

    const params = qs.parse(config.body);
    const component_id = params['_cid'];
    // const _id = params['_id'] ;
    const ids = (params['_ids'] || '').split(',').map(k => Number(k));
    const action = params['_act'];
    let component = components[component_id];
    let datalist = component.datalist;
    let meta = component.metadata;
    let table = component.table;
    // for (let i = 0; i < datalist.length; i++) {
    //   let d = datalist[i];
    //   if (ids.length === 0) {
    //     break;
    //   }
    //   for (let j = 0; j < ids.length; j++) {
    //     if (d._id == ids[j]) {
    //       idx.push(ids[j]);
    //       ids.splice(j, 1);
    //       break;
    //     }
    //   }
    // }
    for (let id of ids) {
      switch (action) {
        case 'delete':
          for (let i = 0; i < datalist.length; i++) {
            let data = datalist[i];
            if (data._id == id) {
              datalist.splice(i, 1);
            }
          }
          break;
        case 'modify':
          for (let i = 0; i < datalist.length; i++) {
            let data = datalist[i];
            if (data._id == id) {
              data = createDataItem(table.metadata);
              data._id = id;
              datalist[i] = data;

            }
          }
          break;
      }
    }

    return {
      data: {},
      status: {
        code: 0,
        success: true,
        message: '',
      },
    }
  }

};
