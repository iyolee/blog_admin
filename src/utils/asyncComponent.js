import React, { Component } from 'react'

export default function lazyLoader(importComponent) {
  class AsyncComponent extends Component {
    constructor() {
      super()
      this.state = { Component: null }
    }

    async componentDidMount() {
      try {
        const { default: Component } = await importComponent()
        this.setState({
          Component: Component
        })
      } catch (err) {
        throw err
      }
      
    }

    render() {
      const { Component } = this.state

      return (Component) ? <Component {...this.props} /> : null
    }
  }

  return AsyncComponent
}
