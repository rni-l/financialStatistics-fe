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
      label: '地址',
      prop: 'address'
    },
    {
      label: '备注',
      prop: 'remark'
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
      label: '地址',
      prop: 'address',
      type: 'textarea',
      span: 12,
      rules: [
        {
          required: false,
          message: '请输入正确格式的是地址',
          trigger: 'change'
        }
      ]
    },
    {
      label: '备注',
      prop: 'remark',
      type: 'textarea',
      span: 12,
      rules: [
        {
          required: false,
          message: '请输入正确格式的备注',
          trigger: 'change'
        }
      ]
    },
  ]
}
