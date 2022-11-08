import { AppContext } from 'next/app';

declare module 'next/app' {
  import { Store } from 'redux';
  export interface AppContext extends AppContext {
    ctx: AppContext['ctx'] & {
      req: {
        _ssrReduxStore: Store;
      }
    }
  }
}
