import { Feature } from '../enums/Feature';
import { commonReducer } from './reducers/commonReducer';
import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';

const reducer = {
  [Feature.COMMON]: commonReducer
}

export const store = configureStore({
  reducer,
})

export type IRootState = StateFromReducersMapObject<typeof reducer>;
