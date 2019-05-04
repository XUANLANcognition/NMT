import React, { Component } from 'react'
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd'
import moment from 'moment'
import axios from 'axios'
import dayjs from 'dayjs'

const TextArea = Input.TextArea

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout='horizontal'
    renderItem={item => (
      <Comment
        author={item.user ? item.user.username : item.username}
        avatar={item.user ? item.user.last_name : item.last_name}
        content={item.content}
        datetime={dayjs(item.pub_date).fromNow()}
      />
    )}
  />
)

const Editor = ({
  onChange, onSubmit, submitting, value
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType='submit'
        loading={submitting}
        onClick={onSubmit}
        type='primary'
      >
        评论
      </Button>
    </Form.Item>
  </div>
)

const count = 8

class AddComment extends Component {
    state = {
      comments: [],
      submitting: false,
      value: '',
      cache: [],
      loading: false,
      initLoading: true,
      page: 1,
      username: '',
      avatarUrl: ''
    }

    componentDidMount = async (v) => {
      this.getUserData()
      await this.getCommentData()
      this.setState(function (state) {
        return { initLoading: false }
      })
    }

    componentDidUpdate = async (prevProps) => {
      if (prevProps.articleId !== this.props.articleId) {
        await this.getCommentData()
        this.setState(function (state) {
          return { initLoading: false }
        })
      }
    }

    getUserData = async (v) => {
      try {
        let config = {
          headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
        }
        const response = await axios.get(
          'https://guoliang.online:8080/api/users/' + window.localStorage.getItem('user_id'),
          config
        )
        this.setState(function (state) {
          return { username: response.data.username, avatarUrl: response.data.last_name }
        })
      } catch (error) {
        console.log(error)
      }
    }

    getCommentData = async (v) => {
      try {
        const response = await axios.get(
          'https://guoliang.online:8080/api/comments/?format=json&page=' + this.state.page + '&page_size=' + count + '&article=' + this.props.articleId
        )
        this.comments = response.data.results
        this.setState(function (state) {
          return { comments: response.data.results, cache: response.data.results }
        })
      } catch (error) {
        console.log(error)
      }
    }

    sendComment = async (value) => {
      try {
        let config = {
          headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
        }
        const response = await axios.post(
          'https://guoliang.online:8080/api/comments/',
          {
            content: value,
            article: this.props.articleUrl
          },
          config
        )
        if (response.status !== 201) {
          message('error')
        }
      } catch (error) {
        console.log(error)
      }
    }

      handleSubmit = () => {
        if (!this.state.value) {
          return
        }
        console.log('fwefwe', this.props.authorId)
        this.setState({
          submitting: true
        })
        this.sendComment(this.state.value)
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
              {
                username: this.state.username,
                last_name: this.state.avatarUrl,
                content: <p>{this.state.value}</p>,
                pub_date: moment()
              },
              ...this.state.comments
            ]
          })
        }, 500)
      }

      handleChange = (e) => {
        this.setState({
          value: e.target.value
        })
      }

      render () {
        const { comments, submitting, value } = this.state
        return (
          <div>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              avatar={(
                <Avatar
                  src={this.state.avatarUrl}
                  alt={this.state.username}
                />
              )}
              content={(
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              )}
            />
          </div>
        )
      }
}

export default AddComment