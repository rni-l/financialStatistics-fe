import { commonTableConfig } from '../../config/tableConfig';
import { commonFormConfig } from '@/config/formConfig';

export const options = {
  ...commonTableConfig,
  column: [
    {
      label: '名称',
      prop: 'name'
    },
    // {
    //   label: '门店标识符',
    //   prop: 'storeCode'
    // },
    {
      label: '所属门店',
      prop: 'storeName'
    },
    {
      label: '入职时间',
      prop: 'registerTime'
    },
    {
      label: '佣金比率',
      prop: 'bonusRatio',
      slot: 'bonusRatio'
    },
    {
      label: '是否需要交付平台费',
      prop: 'isIgnorePlatform',
      slot: 'isIgnorePlatform'
    }
  ]
}

export const formOptions = {
  ...commonFormConfig,
  column: [
    {
      label: '名称',
      prop: 'name',
      span: 12,
      rules: [
        {
          required: true,
          message: '请输入名称',
          trigger: 'change'
        }
      ]
    },
    {
      label: '门店',
      prop: 'storeCode',
      type: 'select',
      span: 12,
      dicData: [],
      rules: [
        {
          required: true,
          message: '请选择门店',
          trigger: 'change'
        }
      ]
    },
    {
      label: '职位',
      prop: 'jobId',
      type: 'select',
      multiple: true,
      span: 12,
      dicData: [],
      rules: [
        {
          required: true,
          message: '请选择职位',
          trigger: 'change'
        }
      ]
    },
    {
      label: '佣金比率',
      prop: 'bonusRatio',
      type: 'number',
      dataType: 'number',
      span: 12,
      min: 0,
      max: 1,
      precision: 2,
      rules: [
        {
          required: false,
          message: '请输入佣金比率',
          type: 'number',
          min: 0,
          max: 1,
          trigger: 'change'
        }
      ]
    }, {
      label: '是否需要交付平台费',
      prop: 'isIgnorePlatform',
      type: 'radio',
      span: 12,
      dicData: [
        { label: '是', value: 0 },
        { label: '否', value: 1 }
      ]
    },
  ]
}
