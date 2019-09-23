import React from 'react';

import { SourceCodeLink, Property } from '../SourceCodeLink/SourceCodeLink';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Step1, Step2, Step3 } from '../../codeSamples/GettingStarted';

export default class Home extends React.Component {

  render () {
    return (
      <div>

        <h1>Getting Started </h1>

        <div className="reading-width">

          <h3 className="mt-5 mb-4">Step 1 - Install</h3>

          <SyntaxHighlighter className="code-snippet" language="javascript" style={tomorrow}>{Step1}</SyntaxHighlighter>


          <h3 className="mt-5 mb-4">Step 2 - Register a StateStore</h3>

          <p>The first step is to create a new <SourceCodeLink file="StateStore"/>.</p>

          <p>There are lots of options for how to create and share <Property>StateStores</Property>. In the example below we create one in the constructor so it's ready to be passed down into the <SourceCodeLink file="StateContext.Provider"/>.</p>

          <SyntaxHighlighter className="code-snippet" language="javascript" style={tomorrow}>{Step2}</SyntaxHighlighter>

          <p>Notice that we could easily create and provide as many <Property>StateStores</Property> as we want within this component.</p>


          <h3 className="mt-5 mb-4">Step 3 - Consume and Modify State</h3>

          <p>Components often have a need to display and update state. This example shows how state can be consumed within a template and how the <SourceCodeLink file="StateStore"/> can be accessed to update the state.</p>

          <p>Pay close attention to how components consume the immutable state passed down to them and update state through the <Property>StateStores</Property>.</p>

          <SyntaxHighlighter className="code-snippet" language="javascript" style={tomorrow}>{Step3}</SyntaxHighlighter>

          <p>Notice the <SourceCodeLink file="StateStore"/> is consumable. This give lots of flexibility in how state can be updated.</p>

        </div>
      </div>
    )
  }
}
