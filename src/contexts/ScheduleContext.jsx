import React, { createContext, useContext, useState } from 'react';

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [scheduleItems, setScheduleItems] = useState([]);
  
  const addScheduleItem = async (newItem) => {
    // In a real app, you would typically make an API call here
    // For now, we'll just add it to local state
    setScheduleItems(prevItems => [...prevItems, {
      ...newItem,
      id: Date.now().toString(), // temporary ID
      createdAt: new Date().toISOString()
    }]);
    
    return Promise.resolve(); // simulate async operation
  };

  const updateScheduleItem = async (id, updates) => {
    setScheduleItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
    return Promise.resolve();
  };

  const deleteScheduleItem = async (id) => {
    setScheduleItems(prevItems => 
      prevItems.filter(item => item.id !== id)
    );
    return Promise.resolve();
  };

  const value = {
    scheduleItems,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useScheduleContext must be used within a ScheduleProvider');
  }
  return context;
};