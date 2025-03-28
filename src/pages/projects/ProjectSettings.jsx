import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { ProjectContext } from '../../contexts/ProjectContext';
// import { AuthContext } from '../../contexts/AuthContext';
import Loader from '../../components/common/Loader';
import StatusBadge from '../../components/common/StatusBadge';
import Tabs from '../../components/common/Tabs';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Modal from '../../components/common/Modal';
import TeamManagement from '../../components/projects/TeamManagement';
import ProjectForm from '../../components/projects/ProjectForm';
import DangerZone from '../../components/projects/DangerZone';

const ProjectSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //const { project, loading, fetchProject, updateProject, deleteProject, error } = useContext(ProjectContext);
 // const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('general');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  const handleUpdateProject = async (updatedData) => {
    try {
      await updateProject(id, updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update project:', err);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(id);
      navigate('/projects');
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!project) return <div className="text-center mt-8">Project not found</div>;
  if (user?.role !== 'admin') return <div className="text-center mt-8">Unauthorized access</div>;

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'team', label: 'Team Management' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'danger', label: 'Danger Zone' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: 'Projects', link: '/projects' },
          { label: project.name, link: `/projects/${id}` },
          { label: 'Settings', link: `/projects/${id}/settings` }
        ]}
      />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Project Settings</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-gray-600">{project.code}</span>
            <StatusBadge status={project.status} />
          </div>
        </div>
        <Link 
          to={`/projects/${id}`}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Back to Project
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'general' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">General Settings</h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Edit Project
                  </button>
                )}
              </div>

              {isEditing ? (
                <ProjectForm 
                  initialData={project}
                  onSubmit={handleUpdateProject}
                  onCancel={() => setIsEditing(false)}
                  submitText="Save Changes"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Basic Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Project Name</p>
                        <p className="font-medium">{project.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Project Code</p>
                        <p className="font-medium">{project.code}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Client</p>
                        <p className="font-medium">{project.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{project.location}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium mb-2">Timeline</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className="font-medium">{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium capitalize">{project.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-md font-medium mb-2">Description</h3>
                    <p className="text-gray-700 whitespace-pre-line">{project.description || 'No description provided.'}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'team' && (
            <TeamManagement 
              projectId={id}
              currentTeam={project.team || []}
            />
          )}

          {activeTab === 'permissions' && (
            <div>
              <h2 className="text-lg font-semibold mb-6">Permission Settings</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Permission settings are managed at the role level. Adjust role permissions in the <Link to="/admin/roles" className="text-yellow-700 underline">Role Management</Link> section.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'danger' && (
            <DangerZone 
              onDelete={() => setShowDeleteModal(true)}
              projectName={project.name}
            />
          )}
        </div>
      </div>

      <Modal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Project Deletion"
      >
        <div className="space-y-4">
          <p className="text-red-600">
            Are you sure you want to delete the project "{project.name}"? This action cannot be undone.
          </p>
          <p>All documents, drawings, and related data will be permanently removed.</p>
          <div className="flex justify-end gap-4 mt-6">
            <button 
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteProject}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Project
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectSettings;