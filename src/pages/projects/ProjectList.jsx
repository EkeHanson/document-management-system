import { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Empty } from 'antd';
import ProjectContext from '../../contexts/ProjectContext';
import { AuthContext } from '../../contexts/AuthContext';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/UserSearch';
import Pagination from '../../components/common/Pagination';

const ProjectList = () => {
  const { projects, loading, fetchProjects, error } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    let isMounted = true;
    
    const loadProjects = async () => {
      try {
        await fetchProjects();
      } catch (err) {
        console.error("Project fetch error:", err);
      }
    };

    if (isMounted) loadProjects();

    return () => {
      isMounted = false;
    };
  }, [fetchProjects]);

  // Safely filter projects
  const filteredProjects = (Array.isArray(projects) ? projects : []).filter(project => {
    const matchesSearch = project?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project?.code?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  // Status filter dropdown items
  const statusMenuItems = [
    { key: 'all', label: 'All Statuses' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
    { key: 'on-hold', label: 'On Hold' },
  ];

  const handleStatusFilterChange = ({ key }) => {
    setStatusFilter(key);
    setCurrentPage(1);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">Error loading projects: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        {user?.role === 'admin' && (
          <Link 
            to="/projects/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Create New Project
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <SearchBar 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="flex gap-4">
            <Dropdown
              menu={{
                items: statusMenuItems,
                onClick: handleStatusFilterChange,
                selectedKeys: [statusFilter],
              }}
              trigger={['click']}
            >
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                <span>Status: {statusFilter === 'all' ? 'All Statuses' : statusFilter}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </Dropdown>
          </div>
        </div>

        {currentProjects.length === 0 ? (
          <Empty
            description={
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">No projects found</p>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            }
            styles={{
              image: {
                height: 60,
                marginBottom: 16,
              },
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProjects.map(project => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${project.status === 'active' ? 'bg-green-100 text-green-800' : 
                          project.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(project.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        to={`/projects/${project.id}`} 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      {user?.role === 'admin' && (
                        <Link 
                          to={`/projects/${project.id}/settings`} 
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Settings
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProjects.length > projectsPerPage && (
          <Pagination
            current={currentPage}
            total={filteredProjects.length}
            pageSize={projectsPerPage}
            onChange={paginate}
            className="mt-6"
          />
        )}
      </div>
    </div>
  );
};

export default ProjectList;