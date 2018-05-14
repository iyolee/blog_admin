import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { atomDark } from 'react-syntax-highlighter/styles/prism'

class CodeBlock extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    value: PropTypes.string
  }
  render() {
    return (
      <pre>
        <code className={`language-${this.props.language}`}>
          {this.props.value 
          && (<SyntaxHighlighter language={this.props.language} style={atomDark}>{this.props.value}</SyntaxHighlighter>)}
        </code>
      </pre>
    )
  }
}

export default CodeBlock