import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../stores/comment/commentsStore';
import CommentPane from '../components/comment/CommentPane';

const App = props => {
  const store = createStore(props);
  return (
      <Provider store={store}>
        <CommentPane />
      </Provider>
  );
};

// Export is needed for the hot reload server
export default App;
