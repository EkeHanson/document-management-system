import React, { useState, useEffect } from 'react';
import { FiCalendar, FiFilter, FiDownload, FiPlus } from 'react-icons/fi';
import { useProjectContext } from '../../contexts/ProjectContext';
import ScheduleTable from './ScheduleTable';
import ScheduleFilter from './ScheduleFilter';
import AddScheduleItemModal from './AddScheduleItemModal';
//import { exportToExcel } from '../../utils/exportUtils';
import Loader from '../../components/common/Loader';

const SubmissionSchedule = () => {
  const { currentProject, fetchProjectSchedule } = useProjectContext();
  const [scheduleItems, setScheduleItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    discipline: '',
    status: '',
    dueDateRange: { start: null, end: null }
  });

  useEffect(() => {
    let isMounted = true;
    
    const loadSchedule = async () => {
      try {
        setError(null);
        if (!currentProject?.id) {
          setLoading(false);
          return;
        }
        
        setLoading(true);
        const items = await fetchProjectSchedule(currentProject.id);
        if (isMounted) {
          setScheduleItems(items);
          setFilteredItems(items);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load schedule. Please try again.');
          console.error('Error loading schedule:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadSchedule();
    
    return () => {
      isMounted = false;
    };
  }, [currentProject, fetchProjectSchedule]);
  
  useEffect(() => {
    applyFilters();
  }, [filters, scheduleItems]);

  const applyFilters = () => {
    let result = [...scheduleItems];
    
    if (filters.discipline) {
      result = result.filter(item => 
        item.discipline.toLowerCase().includes(filters.discipline.toLowerCase())
      );
    }
    
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }
    
    if (filters.dueDateRange.start) {
      result = result.filter(item => 
        new Date(item.dueDate) >= new Date(filters.dueDateRange.start)
      );
    }
    
    if (filters.dueDateRange.end) {
      result = result.filter(item => 
        new Date(item.dueDate) <= new Date(filters.dueDateRange.end)
      );
    }
    
    setFilteredItems(result);
  };

  const handleExport = () => {
    // exportToExcel(filteredItems, 'submission_schedule');
  };

  if (loading) {
    if (!currentProject) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg inline-block">
            No project selected. Please select a project first.
          </div>
        </div>
      );
    }
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg inline-block">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <FiCalendar className="mr-2" /> Submission Schedule
        </h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
          >
            <FiFilter className="mr-2" /> Filters
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100"
          >
            <FiDownload className="mr-2" /> Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FiPlus className="mr-2" /> Add Item
          </button>
        </div>
      </div>

      {showFilters && (
        <ScheduleFilter 
          filters={filters}
          setFilters={setFilters}
          onApply={applyFilters}
          onReset={() => setFilters({
            discipline: '',
            status: '',
            dueDateRange: { start: null, end: null }
          })}
        />
      )}

      <ScheduleTable items={filteredItems} />

      {showAddModal && (
        <AddScheduleItemModal 
          isOpen={showAddModal} // Ensure this prop is passed
          onClose={() => setShowAddModal(false)}
          onSave={(newItem) => {
            setScheduleItems([...scheduleItems, newItem]);
            setShowAddModal(false);
          }}
          projectId={currentProject?.id}
        />
      )}

    </div>
  );
};

export default SubmissionSchedule;