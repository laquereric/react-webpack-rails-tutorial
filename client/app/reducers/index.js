import commentsReducer from './comment/commentsReducer';
import { $$initialState as $$commentsState } from './comment/commentsReducer';

export default {
  $$commentsStore: commentsReducer,
};

export const initalStates = {
  $$commentsState,
};
