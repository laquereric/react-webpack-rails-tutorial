import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../stores/comment/commentsStore';
import CommentPane from '../components/commen/CommentPane';

const App = props => {
  const store = createStore(props);
  return (
      <Provider store={store}>
        <CommenPane />
      </Provider>
  );
};

export default App;
