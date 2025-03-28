import api from './api';

export const searchUsers = async (query) => {
  try {
    const response = await api.get('/users/search', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUserRoles = async (userId, projectId, roles) => {
  try {
    const response = await api.put(`/users/${userId}/projects/${projectId}/roles`, { roles });
    return response.data;
  } catch (error) {
    console.error('Error updating user roles:', error);
    throw error;
  }
};

export default {
  searchUsers,
  getUserById,
  updateUserRoles
};