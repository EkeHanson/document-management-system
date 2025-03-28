import { format } from 'date-fns';
import ProgressBar from './ProgressBar';
import './ProjectCard.css';

const ProjectTimeline = ({ milestones, startDate, endDate }) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  
  const totalDuration = end ? end - start : today - start;
  const elapsedDuration = today - start;
  const progress = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Project Timeline</h2>
      
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Project Progress</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Start: {format(start, 'MMM d, yyyy')}</span>
          <span>{end ? `End: ${format(end, 'MMM d, yyyy')}` : 'Ongoing'}</span>
        </div>
      </div>

      <h3 className="text-md font-medium mb-3">Milestones</h3>
      {milestones.length > 0 ? (
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="border-l-2 border-blue-500 pl-4 py-2">
              <div className="flex justify-between">
                <h4 className="font-medium">{milestone.name}</h4>
                <span className={`text-sm ${
                  new Date(milestone.date) < today ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {format(new Date(milestone.date), 'MMM d, yyyy')}
                </span>
              </div>
              {milestone.description && (
                <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
              )}
              <div className="flex items-center mt-2">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  new Date(milestone.date) < today ? 'bg-green-500' : 'bg-blue-500'
                }`}></span>
                <span className="text-xs text-gray-500">
                  {new Date(milestone.date) < today ? 'Completed' : 'Upcoming'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No milestones defined for this project.</p>
      )}
    </div>
  );
};

export default ProjectTimeline;