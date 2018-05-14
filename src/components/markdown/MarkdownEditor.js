import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'

const Wrapper = styled.div`
overflow: auto;
margin: 0 !important;
padding: 0 !important;
background: #FCFAF2;
min-height: 100%;
/* overflow: auto; */
`

const Preview = styled.div`
  margin-left: 48%;
  min-height: 100%;
  padding: 0 16px;
  color: #333;
  width: 48%;

  tr {
  border-top: 1px solid #c6cbd1;
  background: #fff;
  }

  th,
  td {
  padding: 6px 10px;
  border: 1px solid #dfe2e5;
  text-align: center !important;
  }

  table tr:nth-child(2n) {
  background: #f6f8fa;
  }

  code[class^="language-"] {
  display: block;
  overflow-x: auto;
  }

  blockquote {
  color: #666;
  margin: 0;
  padding-left: 8px;
  border-left: 6px #eee solid;
  }
`

const Editor = styled.textarea`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding: 16px;
  border: none;
  border-right: 1px solid rgb(169, 169, 169);
  outline: none;
  resize: none;
  width: 48%;
  font-size: 20px;
  line-height: 30px;
  box-sizing: border-box;
`

class MarkdownEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      source: '# Markdown'
    }
  }

  onEditorChange = event => {
    this.setState({source: event.target.value})
  }
  render() {
    return (
      <Wrapper>
        <Editor onChange={this.onEditorChange} value={this.state.source} />
        <Preview>
          <ReactMarkdown
            source={this.state.source}
            escapeHtml
            renderers={{
              code: CodeBlock
            }}
          />
        </Preview>
      </Wrapper>
    )
  }
}

export default MarkdownEditor