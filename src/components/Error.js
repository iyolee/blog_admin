import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #f0f2f5;
`

const Image = styled.img`
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  width: 380px;
`

const Title = styled.h2`
  font-size: 60px;
  font-weight: 700;
  color: #8d8e8f;
  text-align: center;
  margin-top: 50px;
`

const Error = ({history}) => (
  <Wrapper>
    <Title>OOPS!</Title>
    <Image src='../static/404.png' alt='404' />
  </Wrapper>
)

export default Error
