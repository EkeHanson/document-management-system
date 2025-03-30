import React from 'react';
import { FaComment } from 'react-icons/fa';

const CommentMarker = ({ x, y, pageNumber, onClick, hasUnresolved }) => {
  return (
    <div 
      className={`comment-marker ${hasUnresolved ? 'unresolved' : ''}`}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onClick}
      title="View comment"
    >
      <FaComment />
    </div>
  );
};

export default CommentMarker;