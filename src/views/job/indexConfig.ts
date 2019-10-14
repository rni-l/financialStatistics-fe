import { commonTableConfig } from '../../config/tableConfig';
import { commonFormConfig } from '@/config/formConfig';

export const options = {
  ...commonTableConfig,
  column: [
    {
      label: '名称',
      prop: 'name'
    },
    {
      label: '标识符',
      prop: 'code'
    },
    {
      label: '基本工资',
      prop: 'salary'
    },
    {
      label: '提成比率',
      prop: 'commissionRatio'
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
      label: '标识符',
      prop: 'code',
      span: 12,
      rules: [
        {
          required: true,
          message: '请输入标书费',
          trigger: 'change'
        }
      ]
    },
    {
      label: '工资',
      prop: 'salary',
      type: 'number',
      span: 12,
      rules: [
        {
          required: true,
          message: '请输入正确格式的工资',
          type: 'number',
          trigger: 'change'
        }
      ]
    },
    {
      label: '提成比率',
      prop: 'commissionRatio',
      type: 'number',
      span: 12,
      min: 0,
      max: 1,
      precision: 2,
      rules: [
        {
          required: true,
          message: '请输入正确格式的提成比率',
          type: 'number',
          min: 0,
          max: 1,
          trigger: 'change'
        }
      ]
    },
  ]
}
