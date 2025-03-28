import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { ProjectContext } from '../../contexts/ProjectContext';
import { DocumentContext } from '../../contexts/DocumentContext';
// import { AuthContext } from '../../contexts/AuthContext';
import Loader from '../../components/common/Loader';
import Tabs from '../../components/common/Tabs';
import DocumentCard from '../../components/documents/DocumentCard';
import StatusBadge from '../../components/common/StatusBadge';
import TeamMembers from '../../components/projects/TeamMembers';
import ProjectTimeline from '../../components/projects/ProjectTimeline';
import ProjectStatistics from '../../components/projects/ProjectStatistics';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const ProjectDetail = () => {
  const { id } = useParams();
  const { project, loading, fetchProject, error } = useContext(ProjectContext);
  const { documents, fetchProjectDocuments } = useContext(DocumentContext);
  // const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchProject(id);
    fetchProjectDocuments(id);
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!project) return <div className="text-center mt-8">Project not found</div>;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'documents', label: 'Documents' },
    { id: 'team', label: 'Team' },
    { id: 'timeline', label: 'Timeline' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: 'Projects', link: '/projects' },
          { label: project.name, link: `/projects/${id}` }
        ]}
      />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-gray-600">Project Code: {project.code}</span>
            <StatusBadge status={project.status} />
          </div>
        </div>
        {user?.role === 'admin' && (
          <Link 
            to={`/projects/${id}/settings`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Project Settings
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold mb-4">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'}</p>
                  </div>
                </div>

                <h2 className="text-lg font-semibold mb-4">Description</h2>
                <p className="text-gray-700 mb-6">{project.description || 'No description provided.'}</p>

                <ProjectStatistics 
                  documentCount={documents.length}
                  milestones={project.milestones || []}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{documents.length}</p>
                      <p className="text-sm text-gray-500">Documents</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{project.team?.length || 0}</p>
                      <p className="text-sm text-gray-500">Team Members</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {project.recentActivity && project.recentActivity.length > 0 ? (
                    project.recentActivity.map((activity, index) => (
                      <div key={index} className="border-l-2 border-blue-500 pl-4 py-1">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No recent activity</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Project Documents</h2>
                {user?.permissions?.includes('upload_documents') && (
                  <Link 
                    to={`/documents/upload?project=${id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Upload Document
                  </Link>
                )}
              </div>

              {documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map(document => (
                    <DocumentCard 
                      key={document.id} 
                      document={document} 
                      showProject={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No documents found for this project.</p>
                  {user?.permissions?.includes('upload_documents') && (
                    <Link 
                      to={`/documents/upload?project=${id}`}
                      className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                    >
                      Upload your first document
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'team' && (
            <TeamMembers 
              team={project.team || []} 
              projectId={id}
              isAdmin={user?.role === 'admin'}
            />
          )}

          {activeTab === 'timeline' && (
            <ProjectTimeline 
              milestones={project.milestones || []}
              startDate={project.startDate}
              endDate={project.endDate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;