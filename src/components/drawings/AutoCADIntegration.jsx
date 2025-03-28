import React, { useState, useEffect } from 'react';
import { Button, Card, message, Modal } from 'antd';
import { CheckOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const AutoCADIntegration = ({ drawingId, fileUrl, isCheckedOut, onCheckOut, onCheckIn }) => {
  const [viewerLoaded, setViewerLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  
  // This would typically be a reference to the AutoCAD Web API or similar
  const [autoCADInstance, setAutoCADInstance] = useState(null);

  useEffect(() => {
    // Initialize AutoCAD viewer
    const loadAutoCADViewer = async () => {
      try {
        // In a real implementation, this would load the AutoCAD Web Viewer API
        // and initialize it with the fileUrl
        console.log('Loading AutoCAD viewer for:', fileUrl);
        
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setViewerLoaded(true);
        message.success('Drawing loaded in AutoCAD viewer');
      } catch (error) {
        message.error('Failed to load AutoCAD viewer');
        console.error('AutoCAD viewer error:', error);
      }
    };
    
    loadAutoCADViewer();
    
    return () => {
      // Clean up viewer
      if (autoCADInstance) {
        console.log('Cleaning up AutoCAD instance');
      }
    };
  }, [fileUrl]);

  const handleEditStart = () => {
    if (!isCheckedOut) {
      Modal.confirm({
        title: 'Check Out Required',
        content: 'You need to check out this drawing before editing. Check out now?',
        onOk: () => {
          onCheckOut();
          setIsEditing(true);
        },
      });
    } else {
      setIsEditing(true);
    }
  };

  const handleSaveChanges = () => {
    Modal.confirm({
      title: 'Save Changes',
      content: 'Are you sure you want to save your changes to this drawing?',
      onOk: () => {
        // In a real implementation, this would save changes back to the server
        message.success('Changes saved successfully');
        setChangesMade(false);
        setIsEditing(false);
        onCheckIn(); // Check in after saving
      },
    });
  };

  const handleDiscardChanges = () => {
    Modal.confirm({
      title: 'Discard Changes',
      content: 'Are you sure you want to discard all your changes?',
      okType: 'danger',
      onOk: () => {
        message.warning('Changes discarded');
        setChangesMade(false);
        setIsEditing(false);
        onCheckIn(); // Check in after discarding
      },
    });
  };

  return (
    <Card 
      title="AutoCAD Drawing" 
      className="autocad-container"
      extra={
        <span className="text-sm text-gray-500">
          {isCheckedOut ? (
            <span className="text-orange-500">
              <CheckCircleOutlined /> Checked Out
            </span>
          ) : (
            <span className="text-green-500">
              <CloseCircleOutlined /> Available
            </span>
          )}
        </span>
      }
    >
      {!viewerLoaded ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading AutoCAD viewer...</p>
        </div>
      ) : (
        <>
          <div className="autocad-viewer-placeholder border border-dashed border-gray-300 bg-gray-50 flex justify-center items-center h-96 mb-4">
            <p className="text-gray-500">AutoCAD Drawing Viewer: {fileUrl}</p>
            {/* In a real implementation, this would be the actual AutoCAD viewer */}
          </div>
          
          <div className="flex justify-between">
            <div>
              {isEditing ? (
                <span className="text-blue-500">Editing Mode Active</span>
              ) : (
                <Button 
                  type="primary" 
                  onClick={handleEditStart}
                  disabled={isCheckedOut && !isEditing}
                >
                  {isCheckedOut ? 'Continue Editing' : 'Check Out & Edit'}
                </Button>
              )}
            </div>
            
            {isEditing && (
              <Space>
                <Button 
                  type="default" 
                  danger
                  onClick={handleDiscardChanges}
                >
                  Discard Changes
                </Button>
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />}
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </Space>
            )}
          </div>
          
          {isEditing && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded">
              <p className="text-blue-700">
                <strong>Note:</strong> You are now editing this drawing. 
                Please save or discard your changes when finished.
              </p>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default AutoCADIntegration;