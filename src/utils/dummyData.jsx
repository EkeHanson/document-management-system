// src/utils/dummyData.js
export const dummyDocuments = [
    {
      id: 'doc-123',
      name: 'Project Specifications',
      title: 'Project Specifications',
      type: 'pdf',
      fileType: 'pdf',
      status: 'Under Review',
      version: '1.0',
      author: 'Admin User',
      uploadedBy: 'Admin User',
      createdAt: '2024-03-10T09:15:00Z',
      modifiedAt: '2024-03-12T14:30:00Z',
      modifiedDate: '2024-03-12',
      description: 'This document contains all the project specifications and requirements.',
      fileUrl: '/sample.pdf',
      permissions: {
        canComment: true,
        canEdit: false,
        canDownload: true
      },
      versions: [
        { number: '1.0', date: '2024-03-12T14:30:00Z', user: 'Admin User' },
        { number: '0.9', date: '2024-03-10T09:15:00Z', user: 'Admin User' }
      ],
      comments: [
        {
          id: 'comment-1',
          user: 'Reviewer 1',
          date: '2024-03-13T10:30:00Z',
          text: 'The requirements look good, but we need more details on section 3.2.',
          replies: [
            {
              id: 'reply-1',
              user: 'Admin User',
              date: '2024-03-13T11:45:00Z',
              text: "I've added more details to section 3.2 in the latest version."
            }
          ]
        }
      ]
    },
    // Add more dummy documents as needed
  ];
  
  export const currentUser = {
    id: 'user-2',
    name: 'Reviewer 1',
    role: 'reviewer',
    avatar: null
  };