declare module 'vue/types/vue' {
  interface Vue {
    // showMessage: Function;
    request: Function;
    [key: string]: any
  }
}

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
};

export interface ObjectKey {
  [key: string]: any
}

export interface MenuItem {
  label: string;
  index?: string;
  permission?: string;
  icon?: string;
  link?: string;
  isNotShow?: boolean;
  children?: MenuItem[];
}

export interface DropdownItem {
  handleCallback?: Function;
  label: string;
}