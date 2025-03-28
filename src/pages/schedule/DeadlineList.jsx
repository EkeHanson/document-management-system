import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiCalendar } from 'react-icons/fi';
import { formatDate, getStatusBadge } from '../../utils/displayUtils';

const DeadlineList = ({ deadlines }) => {
  const now = new Date();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {deadlines.map((deadline) => {
          const isOverdue = new Date(deadline.dueDate) < now && !deadline.completed;
          const isUpcoming = new Date(deadline.dueDate) >= now && !deadline.completed;
          
          return (
            <li key={deadline.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {isOverdue && <FiAlertTriangle className="text-red-500 text-xl" />}
                  {isUpcoming && <FiCalendar className="text-yellow-500 text-xl" />}
                  {deadline.completed && <FiCheckCircle className="text-green-500 text-xl" />}
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{deadline.title}</h3>
                    <p className="text-sm text-gray-500">{deadline.documentNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${isOverdue ? 'bg-red-100 text-red-800' : isUpcoming ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {isOverdue ? 'Overdue' : isUpcoming ? 'Upcoming' : 'Completed'}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Due: {formatDate(deadline.dueDate)}
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {deadline.assignedTo}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DeadlineList;