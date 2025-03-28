import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';

const TeamMembers = ({ team, projectId, isAdmin }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Project Team</h2>
        {isAdmin && (
          <Link 
            to={`/projects/${projectId}/settings?tab=team`}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Manage Team
          </Link>
        )}
      </div>

      {team.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {team.map(member => (
            <div key={member.id} className="bg-gray-50 p-4 rounded-lg flex items-center">
              <Avatar 
                name={member.name}
                imageUrl={member.avatar}
                size="md"
                className="mr-3"
              />
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
                <p className="text-xs text-gray-400">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No team members assigned yet.</p>
          {isAdmin && (
            <Link 
              to={`/projects/${projectId}/settings?tab=team`}
              className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              Add team members
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;