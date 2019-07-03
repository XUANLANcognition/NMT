import React, { Component } from 'react'
import { Carousel, Typography } from 'antd'

import './Advertisement.css'

const { Title } = Typography

class Advertisement extends Component {
  render () {
    return (
      <div style={{ borderRadius: '5px', background: '#f7f7f7', padding: '20px' }}>
        <Title level={4}>广告</Title>
        <Carousel autoplay effect='fade'>
          <div style={{ borderRadius: '5px' }}>
            <h3>搭飞机坐火车去哪里都好</h3>
          </div>
          <div style={{ borderRadius: '5px' }}>
            <h3>我都觉得精彩</h3>
          </div>
          <div style={{ borderRadius: '5px' }}>
            <h3>这个世界是多么神奇</h3>
          </div>
          <div style={{ borderRadius: '5px' }}>
            <h3>我竟然遇到了你</h3>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default Advertisement
