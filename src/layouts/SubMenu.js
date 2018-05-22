import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const Menu = styled.ul `
  width: 13%;
  height: 100%;
  background: #001529;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 9999;
`

const MenuItem = styled.li `
  min-width: 100%;
  list-style: none;
  margin: 0;
  display: inline-block;
  text-align: center;
  border-bottom: 1px solid #fff;
  background: #001529;

  &:hover {
    background: #fff;
    color: #001529;
    cursor: pointer;
  }

  .menu-active {
    background: #fff;
    color: #001529;
  }

  a {
    text-decoration: none;
    color: #fff;
    display: inline-block;  
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  a:hover {
    color: #001529;
  }
`

const menuList = [
  {
    index: 0,
    title: '全部博客',
    url: '/admin',
    icon: ''
  }, {
    index: 1,
    title: '添加博客',
    url: '/addblog',
    icon: ''
  }, {
    index: 2,
    title: '资料修改',
    url: '/edit',
    icon: ''
  }
]

class SubMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  componentWillMount() {
    const pathname = location.pathname
    menuList
      .forEach(item => {
        if (pathname === item.url) {
          this.setState({index: item.index})
        }
      })
  }

  onClickItem = event => {
    if (parseInt(event.target.dataset.idx) !== this.state.index) {
      this.setState({
        index: parseInt(event.target.dataset.idx)
      })
    }
  }

  render() {
    return (
      <Menu>
        {menuList
          .map(item => <MenuItem key={item.index} onClick={this.onClickItem}>
            <Link
              to={item.url}
              data-idx={item.index}
              className={this.state.index === item.index
                ? 'menu-active'
                : ''}
            >{item.title}</Link>
          </MenuItem>)
        }
      </Menu>
    )
  }
}

export default SubMenu