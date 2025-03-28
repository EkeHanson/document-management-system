const DangerZone = ({ onDelete, projectName }) => {
    return (
      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
        <h2 className="text-lg font-semibold text-red-800 mb-4">Danger Zone</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-red-700 mb-2">Delete Project</h3>
            <p className="text-sm text-gray-600 mb-3">
              Once you delete a project, there is no going back. Please be certain.
            </p>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Delete {projectName}
            </button>
          </div>
  
          <div>
            <h3 className="font-medium text-red-700 mb-2">Transfer Ownership</h3>
            <p className="text-sm text-gray-600 mb-3">
              Transfer this project to another project administrator.
            </p>
            <button
              disabled
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed text-sm"
            >
              Transfer Project (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DangerZone;