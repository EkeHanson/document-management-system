import React from 'react';
import { 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel, 
  FaFileImage, 
  FaFileArchive,
  FaFileCode
} from 'react-icons/fa';
import { 
  MdEngineering,
  MdDescription 
} from 'react-icons/md';

const FileTypesSection = () => {
  const fileTypes = [
    { icon: <FaFilePdf />, name: "PDF", format: "Portable Document Format" },
    { icon: <FaFileWord />, name: "Word", format: "DOC/DOCX" },
    { icon: <FaFileExcel />, name: "Excel", format: "XLS/XLSX" },
    { icon: <MdDescription />, name: "Text", format: "TXT/RTF" },
    { icon: <FaFileImage />, name: "Images", format: "JPG/PNG/TIFF" },
    { icon: <FaFileArchive />, name: "Archives", format: "ZIP/RAR" },
    { icon: <FaFileCode />, name: "CAD", format: "DWG/DXF" },
    { icon: <MdEngineering />, name: "BIM", format: "RVT/IFC" }
  ];

  return (
    <section className="filetypes-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Supported File Formats</h2>
          <p className="section-subtitle">
            All your engineering documents in one secure repository
          </p>
        </div>
        
        <div className="filetypes-grid">
          {fileTypes.map((fileType, index) => (
            <div key={index} className="filetype-card">
              <div className="filetype-icon">
                {fileType.icon}
              </div>
              <div className="filetype-info">
                <h3 className="filetype-name">{fileType.name}</h3>
                <p className="filetype-format">{fileType.format}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FileTypesSection;