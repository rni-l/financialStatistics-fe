import { VueConstructor } from 'vue';

interface MyWindow extends Window {
  CryptoJS: any;
  Vue: VueConstructor;
  particlesJS: any;
  pJS: any;
  ArrayBuffer: any;
  Uint8Array: any;
  WebKitBlobBuilder: any;
  MozBlobBuilder: any;
  test: number;
  AnalysysAgent: any;
}
declare const window: MyWindow;
// declare global {
//   interface window extends MyWindow {}
// }

// eslint-disable-next-line one-var
declare global {
  interface window extends Window {
    test: number
  }

  interface SVGAnimationElement {
    beginElement: Function
  }
}

// declare let Window: {
//   prototype: MyWindow;
//   new(): MyWindow;
// };
