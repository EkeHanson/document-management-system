import React, { useState, useEffect } from 'react';
import { searchUsers } from '../../services/userService';
import UserSearch from '../common/UserSearch';
import Avatar from '../common/Avatar';
import { Button, Table, Tag, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const TeamManagement = ({ projectId }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      // Replace with your actual API call to fetch team members
      // const response = await getProjectTeam(projectId);
      // setTeamMembers(response.data);
      setTeamMembers([]); // Temporary empty array
    } catch (error) {
      message.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      setSearchLoading(true);
      const users = await searchUsers(query);
      setSearchResults(users.filter(user => 
        !teamMembers.some(member => member.id === user.id)
      ));
    } catch (error) {
      message.error('Search failed');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddMember = (user) => {
    setTeamMembers([...teamMembers, { ...user, roles: ['member'] }]);
    setSearchResults(searchResults.filter(u => u.id !== user.id));
  };

  const handleRemoveMember = (userId) => {
    setTeamMembers(teamMembers.filter(member => member.id !== userId));
  };

  const handleRoleChange = (userId, newRoles) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === userId ? { ...member, roles: newRoles } : member
    ));
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [projectId]);

  const columns = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar name={record.name} src={record.avatar} />
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles, record) => (
        <div>
          {roles.map(role => (
            <Tag key={role} color={role === 'admin' ? 'red' : 'blue'}>
              {role}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveMember(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="team-management">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Team Members</h2>
        <UserSearch
          onSearch={handleSearch}
          results={searchResults}
          loading={searchLoading}
          onSelect={handleAddMember}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Team</h2>
        <Table
          columns={columns}
          dataSource={teamMembers}
          loading={loading}
          rowKey="id"
          pagination={false}
        />
      </div>

      <div className="flex justify-end">
        <Button type="primary" size="large">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default TeamManagement;