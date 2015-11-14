import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../stores/commentsStore';
import CommentPane from '../components/CommentPane';

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
