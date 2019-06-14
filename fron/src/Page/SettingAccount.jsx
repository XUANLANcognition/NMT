import React, { Component } from 'react'
import { Layout, Col, Row, Menu, Icon, Typography, Tabs } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import StepAuth from '../StepAuth'

const { Title } = Typography
const { TabPane } = Tabs

class SettingAccount extends Component {
  componentDidMount () {
    this.getProfileData()
  }

  state = {
    data: [],
    collapsed: false,
    bio: '',
    username: '',
    email: ''
  };

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  getProfileData = async (v) => {
    try {
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      const response = await axios.get(
        'https://finewf.club:8080/api/users/' + window.localStorage.getItem('user_id') + '?format=json',
        config
      )
      this.data = response.data.results
      this.setState(function (state) {
        return { urlAvatar: response.data.last_name, bio: response.data.profile.bio, username: response.data.username, email: response.data.email }
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
    })
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Nav />
        <div style={{ flex: '1 0' }}>
          <Row style={{ flex: '1 0', paddingTop: '20px' }} >
            <Col xl={{ span: 4, offset: 3 }} xs={{ span: 22, offset: 1 }} >
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
              >
                <Menu.Item key='profile'>
                  <Icon type='user' />个人信息
                  <Link to='/settings/profile' />
                </Menu.Item>
                <Menu.Item key='account'>
                  <Icon type='user' />账号设置
                  <Link to='/settings/account' />
                </Menu.Item>
              </Menu>
            </Col>
            <Col xl={{ span: 13, offset: 1 }} xs={{ span: 22, offset: 1 }} >
              <Row>
                <Col xl={{ span: 24, offset: 0 }} xs={{ span: 22, offset: 1 }}>
                  <Title level={3}>账号设置</Title>
                </Col>
              </Row>
              <Row>
                <Col xl={{ span: 24, offset: 0 }} xs={{ span: 22, offset: 1 }}>
                  <Tabs defaultActiveKey='1'>
                    <TabPane
                      tab={
                        <span>
                          <Icon type='apple' />权限申请
                        </span>
                      }
                      key='1'
                    >
                      <Title style={{ padding: '24px 0' }} level={4}>1.书籍影视资源编辑</Title>
                      <StepAuth />
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <Icon type='android' />敬请期待
                        </span>
                      }
                      key='2'
                    >
                        Tab 2
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default SettingAccount