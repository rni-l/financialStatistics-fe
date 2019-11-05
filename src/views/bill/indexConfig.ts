import { commonTableConfig } from '../../config/tableConfig'
import { commonFormConfig } from '@/config/formConfig'
import dayjs from 'dayjs'

export const options = {
  ...commonTableConfig,
  menuWidth: '280px',
  column: [
    {
      label: '名称',
      minWidth: 180,
      search: true,
      searchSpan: 8,
      prop: 'name'
    },
    {
      label: '金额（元）',
      minWidth: 100,
      prop: 'price'
    },
    {
      label: '开单时间',
      prop: 'openDate',
      search: true,
      minWidth: 180,
      searchSpan: 8,
      valueFormat: 'timestamp',
      type: 'date',
      format: 'yyyy/MM/dd HH:mm:ss'
    },
    {
      label: '收钱时间',
      prop: 'receiveDate',
      minWidth: 180,
      search: true,
      searchSpan: 8,
      valueFormat: 'timestamp',
      type: 'date',
      formatter: (val: any) => (val.receiveDate ? dayjs(val.receiveDate).format('YYYY/MM/DD HH:mm:ss') : '-')
    },
    {
      label: '状态',
      prop: 'status',
      search: true,
      searchSpan: 8,
      type: 'select',
      dicData: [{ label: '全部', value: '' }, { label: '未收款', value: 0 }, { label: '已收款', value: 1 }],
      slot: true
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
      label: '金额',
      prop: 'price',
      type: 'number',
      span: 12,
      dicData: [],
      rules: [
        {
          required: true,
          message: '请输入金额',
          trigger: 'change'
        }
      ]
    },
    {
      label: '开单时间',
      prop: 'openDate',
      type: 'datetime',
      multiple: true,
      span: 12,
      format: 'yyyy/MM/dd HH:mm:ss',
      valueFormat: 'timestamp',
      rules: [
        {
          required: true,
          message: '请选择开单时间',
          trigger: 'change'
        }
      ]
    },
    {
      label: '选择员工',
      prop: 'staffInfo',
      type: 'select',
      multiple: true,
      span: 12,
      dicData: [],
      rules: [
        {
          required: true,
          message: '请选择员工',
          trigger: 'change'
        }
      ]
    },
    {
      label: '输入比率',
      prop: 'ratio',
      type: 'select',
      formslot: true,
      typeslot: true,
      slot: true,
      formSlot: true,
      span: 24
    }
  ]
}
