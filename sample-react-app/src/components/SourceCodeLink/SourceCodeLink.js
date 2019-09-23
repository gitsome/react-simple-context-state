import React from 'react';

import SourceCodeService from '../../services/SourceCodeService';

const SOURCE_REFS = {
  UserCard: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/components/UserCard/UserCard.js',
  ApplicationLayout: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/components/ApplicationLayout/ApplicationLayout.js',
  DemoUserCard: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/components/DemoUserCard/DemoUserCard.js',
  UserStateStore: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/StateStores/UserStateStore.js',
  StateStores: 'https://github.com/gitsome/react-simple-context-state/tree/master/sample-react-app/src/StateStores',
  Todos: 'https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/components/Todos/Todos.js',
  'StateContext.Provider': 'https://github.com/gitsome/react-simple-context-state/blob/master/src/classes/StateContext.tsx',
  'StateContext.Consumer': 'https://github.com/gitsome/react-simple-context-state/blob/master/src/classes/StateContext.tsx',
  'StateStore': 'https://github.com/gitsome/react-simple-context-state/blob/master/src/classes/StateStore.ts'
};

class SourceCodeLink extends React.Component {

  onLinkClicked () {
    SourceCodeService.setSourceCode(SOURCE_REFS[this.props.file]);
  }

  render () {
    return (
      <a href="#" onClick={(e) => {e.preventDefault(); this.onLinkClicked(); }} className="badge badge-light">{this.props.file}</a>
    );
    }
};

const Property = (props) => {
  return (
    <span className="badge badge-light badge-pill">{props.children}</span>
  );
};

export { SourceCodeLink, Property };