import { IRootState, store } from '../common/redux/store';
import { FC } from 'react';
import { AppProps } from 'next/app';
import { NextPage, NextPageContext } from 'next';
import { getNestNextInitialProps } from 'nest-next-spa';
import { withHydrateStore } from 'nest-next-redux';

interface IProps {
  serverStore: Partial<IRootState>;
}

export type INestNextApp<
  Props extends Record<string, any> = Record<string, any>
> = FC<AppProps & Props> & {
  getInitialProps?(props: { ctx: NextPageContext; Component: NextPage }): any;
};

const App: INestNextApp<IProps> = ({ Component, ...props }) => {
  console.log('sss', props);
  return (
    <Component {...props} />
  )
}

App.getInitialProps = getNestNextInitialProps((ctx) => {
  return {
    serverStore: ctx.query
  }
})

export default withHydrateStore(App, store);
