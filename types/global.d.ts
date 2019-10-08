declare interface CommonItem {
  label: string;
  value: CommonItemValue;
  [key: string]: any;
}

declare type CommonItemValue = number | string;
