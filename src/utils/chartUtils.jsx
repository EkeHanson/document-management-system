export const groupByMonth = (deadlines) => {
    const now = new Date();
    const result = {};
    
    deadlines.forEach(deadline => {
      const date = new Date(deadline.dueDate);
      const monthYear = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!result[monthYear]) {
        result[monthYear] = { overdue: 0, upcoming: 0, completed: 0 };
      }
      
      if (deadline.completed) {
        result[monthYear].completed++;
      } else if (date < now) {
        result[monthYear].overdue++;
      } else {
        result[monthYear].upcoming++;
      }
    });
    
    return result;
  };
  
  export const formatMonth = (monthYear) => {
    const [year, month] = monthYear.split('-');
    const date = new Date(year, month);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };