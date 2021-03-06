import React, { Component } from "react";
import { Layout, Row, Col, List, Icon } from "antd";
import axios from "axios";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import { Link } from "react-router-dom";

import Nav from "../Nav";
import Myfooter from "../Myfooter";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_7si6tr5rfyr.js",
});

class DevicePage extends Component {
  state = {
    total_device: [],
    loading: true
  };

  getData = async (v) => {
    try {
      const response = await axios.get(
        'https://101.200.52.246:8080/api/genres/?format=json'
      )
      this.setState({ total_device: response.data.results })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount = async (v) => {
    await this.getData()
    this.setState({
      loading: false
    })
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Nav />
        <div
          style={{ flex: "1 0", minHeight: "100vh", backgroundColor: "#fff" }}
        >
          <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <Col
              xxl={{ span: 14, offset: 5 }}
              xl={{ span: 20, offset: 2 }}
              xs={{ span: 22, offset: 1 }}
            >
              <div
                style={{
                  display: "flex",
                  color: "#000",
                  fontWeight: "600",
                  fontSize: "32px",
                  marginBottom: "24px",
                }}
              >
                数码
              </div>
              <div
                style={{
                  display: "flex",
                  fontWeight: "600",
                  fontSize: "22px",
                  marginBottom: "24px",
                }}
              >
                选择适合自己的
              </div>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={this.state.total_device}
                loading={this.state.loading}
                renderItem={(item) => (
                  <List.Item>
                    <Link to={'/brand/' + item.id}>
                      <div
                        style={{
                          backgroundColor: "white",
                          borderRadius: "6px",
                          width: "210px",
                          height: "80px",
                          boxShadow: "0 5px 30px #777777",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "black",
                          marginBottom: '36px',
                          fontSize: "18px",
                          fontWeight: "bold"
                        }}
                      >
                        {item.name}
                        <IconFont
                          type={item.icon}
                          style={{ fontSize: "56px", marginLeft: "8px" }}
                        />
                      </div>
                    </Link>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}

export default DevicePage;
