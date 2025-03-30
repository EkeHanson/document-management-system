import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { useProjectContext } from '../../contexts/ProjectContext';
import DeadlineChart from './DeadlineChart';
import DeadlineList from './DeadlineList';
import Loader from '../../components/common/Loader';

const DeadlineTracker = () => {
  const { currentProject, fetchProjectDeadlines } = useProjectContext();
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'list'

  useEffect(() => {
    const loadDeadlines = async () => {
      if (!currentProject) {
        console.warn("No current project selected");
        setLoading(false);
        return;
      }

      if (!fetchProjectDeadlines) {
        console.error("fetchProjectDeadlines function is undefined");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching deadlines for project:", currentProject.id);
        const items = await fetchProjectDeadlines(currentProject.id);
        setDeadlines(items || []); // Ensure it's always an array
      } catch (error) {
        console.error("Failed to fetch deadlines:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDeadlines();
  }, [currentProject, fetchProjectDeadlines]);

  const getStatusCounts = () => {
    if (!Array.isArray(deadlines)) return { overdue: 0, upcoming: 0, completed: 0 };

    const now = new Date();
    const overdue = deadlines.filter(d => new Date(d.dueDate) < now && !d.completed).length;
    const upcoming = deadlines.filter(d => new Date(d.dueDate) >= now && !d.completed).length;
    const completed = deadlines.filter(d => d.completed).length;

    return { overdue, upcoming, completed };
  };

  console.log("Current Project:", currentProject);
  console.log("Deadlines:", deadlines);
  console.log("Loading state:", loading);

  const { overdue, upcoming, completed } = getStatusCounts();

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold flex items-center mb-8">
        <FiCalendar className="mr-2" /> Deadline Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-red-50 p-6 rounded-lg border border-red-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-red-600">Overdue</h3>
            <FiAlertTriangle className="text-red-600 text-xl" />
          </div>
          <p className="text-3xl font-bold mt-2 text-red-600">{overdue}</p>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-yellow-600">Upcoming</h3>
            <FiCalendar className="text-yellow-600 text-xl" />
          </div>
          <p className="text-3xl font-bold mt-2 text-yellow-600">{upcoming}</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-green-600">Completed</h3>
            <FiCheckCircle className="text-green-600 text-xl" />
          </div>
          <p className="text-3xl font-bold mt-2 text-green-600">{completed}</p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setViewMode('chart')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${viewMode === 'chart' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Chart View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            List View
          </button>
        </div>
      </div>

      {viewMode === 'chart' ? (
        <DeadlineChart deadlines={deadlines} />
      ) : (
        <DeadlineList deadlines={deadlines} />
      )}
    </div>
  );
};

export default DeadlineTracker;
