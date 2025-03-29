// components/LogoUpload.jsx
import React from 'react';

const LogoUpload = ({ currentLogo, onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center">
      {currentLogo ? (
        <img 
          src={currentLogo} 
          alt="System Logo" 
          className="h-16 w-16 rounded-md object-cover mr-4"
        />
      ) : (
        <div className="h-16 w-16 bg-gray-200 rounded-md mr-4"></div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm text-gray-500"
      />
    </div>
  );
};

export default LogoUpload;