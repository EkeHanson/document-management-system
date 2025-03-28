// src/components/common/UserSearch.jsx
import React from 'react';
import { Input, List, Avatar, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const UserSearch = ({ onSearch, results, loading, onSelect }) => {
  return (
    <div className="user-search">
      <Input
        placeholder="Search users..."
        prefix={<SearchOutlined />}
        onChange={(e) => onSearch(e.target.value)}
        allowClear
      />
      
      {loading && <Spin className="mt-4" />}
      
      {results.length > 0 && (
        <List
          className="mt-4"
          dataSource={results}
          renderItem={(user) => (
            <List.Item 
              onClick={() => onSelect(user)}
              className="cursor-pointer hover:bg-gray-50 p-2"
            >
              <List.Item.Meta
                avatar={<Avatar src={user.avatar}>{user.name.charAt(0)}</Avatar>}
                title={user.name}
                description={user.email}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default UserSearch;