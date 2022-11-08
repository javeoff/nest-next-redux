import produce from 'immer';
import { Reducer, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createElement, ReactElement } from 'react';

type THydratedStore = Store & {setState: (newState: Record<string, unknown>) => void};

export const configureHydrateStore = (...props: Parameters<typeof configureStore>) => {
  const [options] = props;

  const _reducer = produce({}, (reducersDraft: Record<string, Reducer>) => {
    Object.keys(options.reducer).map((reducerName) => {
      const reducer = (options.reducer as Record<string, Reducer>)[reducerName]!;

      reducersDraft[reducerName] = ((state, action: { type: string; state: any }) => {
        if (action.type === 'hydrate') {
          return {
            ...state,
            ...action.state[reducerName],
          }
        }

        return reducer(state, action);
      }) as Reducer
    })
  })

  const _store = configureStore({
    ...options,
    reducer: _reducer,
  }) as THydratedStore;

  _store.setState = (newState: Record<string, unknown>) => {
    _store.dispatch({ type: 'hydrate', state: newState })
  };

  return _store;
}

export const withHydrateStore = (Component: any, store: THydratedStore) => {
  const wrapper = ({ ...props }: any) => {
    store.setState(props.pageProps)

    return createElement(
      Provider,
      { store } as unknown as {store: Store, children: ReactElement},
      createElement(Component, props)
    )
  }

  wrapper.getInitialProps = Component.getInitialProps;

  return wrapper;
}
