import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { CSSTransition } from 'react-transition-group';
import { StateContext } from '../../dist';

import SourceCodeService from '../../services/SourceCodeService';

import './SourceCodeViewer.css';

const animatingTimeouts = {
  appear: 400,
  enter: 400,
  exit: 400
};

export default class SourceCodeViewer extends React.Component {

  closeSourceCode () {
    SourceCodeService.closeSourceCode();
  }

  render () {

    return (
      <StateContext.Consumer>
        {({ appState }) => {

          return (
            <CSSTransition in={appState.currentSourceFile !== false} timeout={animatingTimeouts} classNames="source-code-viewer-transition" unmountOnExit>
              <div className="source-code-viewer">

                <div className="row text-left mb-2">
                    <div className="col">
                      <button className="btn btn-outline-primary" onClick={() => { this.closeSourceCode(); }}><i className="fa fa-times-circle"></i> Close</button>
                      <a href={appState.currentSourceFile ? appState.currentSourceFile : ''} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary ml-2"><i className="fa fa-github"></i> View in GitHub</a>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                      <SyntaxHighlighter className="code-snippet" language="javascript" style={tomorrow}>{appState.sourceCode}</SyntaxHighlighter>
                    </div>
                </div>

              </div>
            </CSSTransition>
          );
        }}
      </StateContext.Consumer>
    );
  }
}


