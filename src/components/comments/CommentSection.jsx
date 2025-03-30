// // src/components/comments/CommentSection.jsx
// import React, { useState } from 'react';
// import { FaUser, FaCalendarAlt } from 'react-icons/fa';

// const CommentSection = ({ documentId, version, currentUser, comments }) => {
//   const [newComment, setNewComment] = useState('');
//   const [commentList, setCommentList] = useState(comments || []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     const newCommentObj = {
//       id: `comment-${Date.now()}`,
//       user: currentUser.name,
//       date: new Date().toISOString(),
//       text: newComment,
//       replies: []
//     };

//     setCommentList([...commentList, newCommentObj]);
//     setNewComment('');
//   };

//   return (
//     <div className="comment-section">
//       <h3>Comments (v{version})</h3>
      
//       <form onSubmit={handleSubmit} className="comment-form">
//         <textarea
//           placeholder="Add your comment..."
//           rows="3"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button type="submit" className="submit-button">
//           Post Comment
//         </button>
//       </form>

//       <div className="comments-list">
//         {commentList.map((comment) => (
//           <div key={comment.id} className="comment-item">
//             <div className="comment-header">
//               <span className="comment-user">
//                 <FaUser /> {comment.user}
//               </span>
//               <span className="comment-date">
//                 <FaCalendarAlt /> {new Date(comment.date).toLocaleString()}
//               </span>
//             </div>
//             <div className="comment-content">{comment.text}</div>
            
//             {comment.replies && comment.replies.length > 0 && (
//               <div className="comment-replies">
//                 {comment.replies.map((reply) => (
//                   <div key={reply.id} className="reply-item">
//                     <div className="reply-header">
//                       <span className="reply-user">
//                         <FaUser /> {reply.user}
//                       </span>
//                       <span className="reply-date">
//                         <FaCalendarAlt /> {new Date(reply.date).toLocaleString()}
//                       </span>
//                     </div>
//                     <div className="reply-content">{reply.text}</div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentSection;

// src/components/comments/CommentSection.jsx
import React, { useState } from 'react';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

const CommentSection = ({ documentId, version, currentUser, comments }) => {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: `comment-${Date.now()}`,
      user: currentUser.name,
      date: new Date().toISOString(),
      text: newComment,
      replies: []
    };

    setCommentList([...commentList, newCommentObj]);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h3>Comments (v{version})</h3>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          placeholder="Add your comment..."
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Post Comment
        </button>
      </form>

      <div className="comments-list">
        {commentList.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
              <span className="comment-user">
                <FaUser /> {comment.user}
              </span>
              <span className="comment-date">
                <FaCalendarAlt /> {new Date(comment.date).toLocaleString()}
              </span>
            </div>
            <div className="comment-content">{comment.text}</div>
            
            {comment.replies && comment.replies.length > 0 && (
              <div className="comment-replies">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="reply-item">
                    <div className="reply-header">
                      <span className="reply-user">
                        <FaUser /> {reply.user}
                      </span>
                      <span className="reply-date">
                        <FaCalendarAlt /> {new Date(reply.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="reply-content">{reply.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;