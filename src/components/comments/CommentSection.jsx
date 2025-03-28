// src/components/comments/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import { Button, List, Avatar, Form, Input, message } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './CommentSection.css';

const { TextArea } = Input;

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return `${seconds} seconds ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
};

const CommentSection = ({ documentId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        // const response = await api.get(`/documents/${documentId}/comments`);
        const mockComments = [
          {
            id: 1,
            text: 'Please review the changes in section 3.2',
            author: 'John Doe',
            timestamp: '2023-05-15T10:30:00Z',
            avatar: null
          },
          {
            id: 2,
            text: 'The revisions look good to me',
            author: 'Jane Smith',
            timestamp: '2023-05-15T14:45:00Z',
            avatar: 'https://i.pravatar.cc/150?img=2'
          }
        ];
        setComments(mockComments);
      } catch (error) {
        message.error('Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [documentId]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      // Replace with actual API call
      // await api.post(`/documents/${documentId}/comments`, {
      //   text: values.comment
      // });
      
      const newComment = {
        id: comments.length + 1,
        text: values.comment,
        author: currentUser.name,
        timestamp: new Date().toISOString(),
        avatar: currentUser.avatar
      };
      
      setComments([...comments, newComment]);
      form.resetFields();
      message.success('Comment added successfully');
    } catch (error) {
      message.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comment-section">
      <h3 className="comment-title">Comments ({comments.length})</h3>
      
      <List
        className="comment-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar 
                  src={comment.avatar} 
                  icon={!comment.avatar && <UserOutlined />} 
                />
              }
              title={<>
                <span className="comment-author">{comment.author}</span>
                <span className="comment-time">
                  {formatTimeAgo(comment.timestamp)}
                </span>
              </>}
              description={comment.text}
            />
          </List.Item>
        )}
      />

      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="comment"
          rules={[{ required: true, message: 'Please enter your comment' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Add a comment..." 
            maxLength={500}
            showCount
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={submitting}
            icon={<SendOutlined />}
          >
            Post Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

CommentSection.propTypes = {
  documentId: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired
};

export default CommentSection;