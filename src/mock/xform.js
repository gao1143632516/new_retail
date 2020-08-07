import Mock from 'mockjs';
import qs from 'qs';
import xconst from './xconst';




function createMetadata(table, _metadata) {
  let fields = table.fields
  return {
    fields,
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


const _components = {
  3: {
    table_id: 2,
    metadata: {
      label_submit: '提交',
      label_cancel: '取消',
      action:'modify',
      listeners: {
        show: ['before_update_table2']
      }
    }
  }

};
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
    const _id = params['_id'];

    let component = components[component_id];
    let datalist = component.datalist;
    let meta = component.metadata;

    let filterList = datalist.filter(item => {
      return (item['_id'] == _id)
    });
    if (filterList.length == 1) {
      return {
        data: filterList[0],
        status: {
          code: 0,
          success: true,
          message: '',
        },
      }
    } else {
      return {
        data: null,
        status: {
          code: 0,
          success: false,
          message: '没有找到记录',
        },
      }
    }

  },
  postData: config => {

    const params = qs.parse(config.body);
    const component_id = params['_cid'];
    // const _id = params['_id'] ;
    // const ids = (params['_id'] || '').split(',').map(k => Number(k));
    const ids = (params['_id'] || '').split(',').map(k => Number(k));
    const action = params['_act'];
    let component = components[component_id];
    let datalist = component.datalist;
    let meta = component.metadata;
    let table = component.table;
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
              for(let f of meta.fields){
                if(f.readonly){
                  continue;
                }
                if(params[f.field]){
                  data[f.field]=params[f.field];
                }
              }

            }
          }
          break;
      }
    }

    return {
      data: {
        updated:['after_update_'+table.name]
      },
      status: {
        code: 0,
        success: true,
        message: '',
      },
    }
  }

};
