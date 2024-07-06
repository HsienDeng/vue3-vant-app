declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare module 'weixin-webview-jssdk' {
  const result: any;
  export default result;
}
