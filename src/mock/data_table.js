import Mock from 'mockjs';

const field_metadatas = [{
    n: 'id',
    // v: '@increment',
    r: true, //必须的字段
    attr: {
      field_type: 'text',
      width: 60,
      readonly:true,
    }
  },
  {
    n: 'pid',
    v: '@integer(1,10)',
    r: true, //必须的字段
    attr: {
      field_type: 'text',
      width: 60,
      readonly:true,
    }
  },
  {
    n: '编码',
    v: '@string("lower", 10, 10)',
    attr: {
      field_type: 'text',
      width: 120
    }
  },
  {
    n: '日期',
    v: '@date("yyyy-MM-dd")',
    attr: {
      field_type: 'date',
      format: 'yyyy-MM-dd',
      width: 160
    }

  },
  {
    n: '时间',
    v: '@time',
    attr: {
      field_type: 'time',
      format: 'HH:mm:ss',
      width: 100
    }

  },
  {
    n: '标题',
    v: '@ctitle(5,10)',
    attr: {
      field_type: 'text',
      width: 200
    }

  },
  {
    n: '名称',
    v: '@cname',
    attr: {
      field_type: 'text',
      width: 100
    }

  },
  {
    n: '省份',
    v: '@province',
    attr: {
      field_type: 'text',
      width: 100
    }

  },
  {
    n: '城市',
    v: '@city',
    attr: {
      field_type: 'text',
      width: 100
    }

  },
  {
    n: '区县',
    v: '@county',
    attr: {
      field_type: 'text',
      width: 100
    }

  },
  {
    n: '邮编',
    v: '@zip',
    attr: {
      field_type: 'text',
      width: 120
    }

  },
  {
    n: 'guid',
    v: '@guid',
    attr: {
      field_type: 'text',
      width: 320
    }

  },
  {
    n: '身份证',
    v: '@id',
    attr: {
      field_type: 'text',
      width: 200
    }

  },
  {
    n: '状态',
    v: '@pick(["有效", "无效"])',
    attr: {
      field_type: 'select',
      width: 80,
      item_list: [{
          label: '有效',
          value: '有效'
        },
        {
          label: '无效',
          value: '无效'
        }
      ],
    }

  },
  {
    n: '邮箱',
    v: '@email',
    t: 'text',
    attr: {
      field_type: 'text',
      width: 220
    }

  },
  {
    n: '金钱',
    v: '@float(0, 1000, 2, 2)',
    t: 'text',
    attr: {
      field_type: 'text',
      width: 100
    }
  },

];


function createMetadatas(fieldnames) {
  let fms = [];
  field_metadatas.filter(k => k.r).forEach(k => fms.push(k));
  if (!!fieldnames && fieldnames.length !== 0) {
    for (let n of fieldnames) {
      for (let fm of field_metadatas) {
        if (fm.n === n) {
          fms.push(fm);
        }
      }
    }
  } else {
    let s = Mock.Random.integer(2, 10);
    for (let i = 0; i < s; i++) {
      fms.push(Mock.Random.pick(field_metadatas.slice(2)), );
    };
  }
  let i = 0;
  return fms.map(m => {
    i++;
    let f = m.r ? ('_' + m.n) : ('_f_' + i);
    let l = m.r ? (m.n) : (m.n + '' + i);
    return {
      ...m,
      f,
      l
    }

  });
}

// function createFields(fms) {
//   let result = [];
//   for (let i = 0; i < fms.length; i++) {
//     result.push(createField(i, fms[i]));
//   }
//   return result;
// }

export function createDataItem(metadata) {
  var item = {};
  for (let f of metadata) {
    if (f.v) {
      item[f.f] = Mock.mock(f.v);
    }
  }
  return item;
}
// export function randomDataItem(table,id){

// }
// export function addDataItem(table){

// }

function createData(metadata) {
  let result = [];
  let s = Mock.Random.integer(2, 100);
  for (let i = 0; i < s; i++) {
    var item = createDataItem(metadata);
    item['_id']=i+1;
    result.push(item)
  }
  return result;
}

function createFields(metadata) {
  // let fields = [];
  // for (let fm of metadata) {
  //   fields.push({
  //     ...fm.attr,
  //     label: fm.l,
  //     field: fm.f,
  //   });
  // }
  // return fields;
  return metadata.map(fm=>{
      return {...fm.attr,
      label: fm.l,
      field: fm.f,
      }
  });
}



export function createTable(name,fieldnames) {
  let table = {};
  let metadata = createMetadatas(fieldnames);
  let fields = createFields(metadata);
  let datalist = createData(metadata);
  return {
    name,
    metadata,
    fields,
    datalist,
    max_id:datalist.length
  };
}
