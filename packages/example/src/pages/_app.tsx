import { Provider } from 'react-redux';
import { IRootState, store } from '../common/redux/store';
import { FC } from 'react';
import { AppContext, AppProps } from 'next/app';
import { NextPage, NextPageContext } from 'next';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers, createAction, createReducer, ReducersMapObject } from '@reduxjs/toolkit';
import produce from 'immer';

export type INestNextApp = FC<AppProps> & {
  getInitialProps?(props: { ctx: NextPageContext; Component: NextPage }): any;
};

type IAppProps = {
  pageProps: Record<string, unknown>;
  [key: string]: unknown;
}

type TAppContext = {
  props: IAppProps;
  Component: NextPage
}

const wrapper = createWrapper(() => store);
const useNestNextRedux = wrapper.useWrappedStore;
export const hydrateAction = createAction<Partial<IRootState>>(HYDRATE);
type TCallback = (ctx: AppContext) => Promise<Partial<IAppProps>> | Partial<IAppProps>;

const getNNRInitialProps = (callback: TCallback) =>
  wrapper.getInitialAppProps((store) => async (context) => {
    console.log('hydrate', context.ctx.query);
    // store.
    const initialPropsStates: Partial<IRootState> = context.ctx.query;
    const initialState = {
      ...store.getState(),
      ...initialPropsStates
    };

    const reducer = combineReducers(
      produce({}, (draftState) => {
        Object.keys(initialState).forEach((key) => {
          // @ts-ignore
          const item: Record<string, unknown> = initialState[key];
          // @ts-ignore
          draftState[key] = createReducer(item, () => {});
        })

        return draftState;
      }) as ReducersMapObject
    );
    store.replaceReducer(
      reducer
    );
    // store.dispatch(hydrateAction(context.ctx.query))
    console.log('stooo', store.getState().common.products);
    // hydrateAction(context.ctx.query);
    return Promise.resolve({
      ...(await callback(context)),
      ...context.ctx.query as IAppProps
    });
  }
)

const App: INestNextApp = ({ Component, ...props }) => {
  console.log('props', props.common.products);
  const { store, ...componentProps } = useNestNextRedux(props)
  console.log('store', store.getState().common.products);

  return (
    <Provider store={store}>
      <Component {...componentProps} />
    </Provider>
  )
}

App.getInitialProps = getNNRInitialProps(() => {
  return {};
})

export default App;
