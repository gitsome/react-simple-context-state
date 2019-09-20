import React from 'react';

const SOURCE_REFS = {
  UserCard: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/components/UserCard/UserCard.js',
  ApplicationLayout: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/components/ApplicationLayout/ApplicationLayout.js',
  DemoUserCard: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/components/DemoUserCard/DemoUserCard.js',
  UserStateStore: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/StateStores/UserStateStore.js',
  StateStores: 'https://github.com/gitsome/react-simple-context-state/tree/master/sample-react-app/src/StateStores',
  Todos: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/components/Todos/Todos.js',
  AppStateContext: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/StateContexts/AppStateContext.js'
};

const SourceCodeLink = (props) => {
  return (
    <a href={SOURCE_REFS[props.file]} target="_blank" rel="noopener noreferrer" className="badge badge-light">{props.file}</a>
  );
};

const Property = (props) => {
  return (
    <span className="badge badge-light badge-pill">{props.children}</span>
  );
};

export { SourceCodeLink, Property };