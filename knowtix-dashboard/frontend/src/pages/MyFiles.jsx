// components/MyFiles.js
import React, { useState } from 'react';
import { FaFolder, FaFilePdf, FaFileImage, FaFileAlt, FaSearch, FaPlus, FaEllipsisV } from 'react-icons/fa';

const MyFiles = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'Mathematics Notes.pdf', type: 'pdf', size: '2.4 MB', date: '2023-05-15' },
    { id: 2, name: 'Physics Diagram.png', type: 'image', size: '1.2 MB', date: '2023-05-10' },
    { id: 3, name: 'Chemistry Formulas.txt', type: 'text', size: '0.5 MB', date: '2023-05-05' },
    { id: 4, name: 'Biology Notes.pdf', type: 'pdf', size: '3.1 MB', date: '2023-05-01' },
    { id: 5, name: 'English Essay.docx', type: 'text', size: '0.8 MB', date: '2023-04-28' }
  ]);
  
  const [folders, setFolders] = useState([
    { id: 1, name: 'Mathematics', files: 12, date: '2023-05-15' },
    { id: 2, name: 'Physics', files: 8, date: '2023-05-10' },
    { id: 3, name: 'Chemistry', files: 6, date: '2023-05-05' },
    { id: 4, name: 'Biology', files: 10, date: '2023-05-01' }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(null);
  
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="file-icon pdf" />;
      case 'image':
        return <FaFileImage className="file-icon image" />;
      case 'text':
        return <FaFileAlt className="file-icon text" />;
      default:
        return <FaFileAlt className="file-icon" />;
    }
  };
  
  const toggleOptions = (id) => {
    setShowOptions(showOptions === id ? null : id);
  };
  
  const handleFileAction = (action, fileId) => {
    // In a real app, this would perform the actual action
    console.log(`${action} file with ID: ${fileId}`);
    setShowOptions(null);
  };
  
  const handleFolderAction = (action, folderId) => {
    // In a real app, this would perform the actual action
    console.log(`${action} folder with ID: ${folderId}`);
    setShowOptions(null);
  };
  
  return (
    <div className="my-files">
      <div className="files-header">
        <h2 className="page-title">My Files</h2>
        <div className="files-actions">
          <div className="search-bar">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search files and folders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="new-folder-btn">
            <FaPlus /> New Folder
          </button>
          <button className="upload-btn">
            <FaPlus /> Upload File
          </button>
        </div>
      </div>
      
      <div className="files-container">
        <div className="files-section">
          <h3>Folders</h3>
          <div className="folders-grid">
            {filteredFolders.map(folder => (
              <div key={folder.id} className="folder-card">
                <div className="folder-icon">
                  <FaFolder />
                </div>
                <div className="folder-info">
                  <div className="folder-name">{folder.name}</div>
                  <div className="folder-meta">{folder.files} files • {folder.date}</div>
                </div>
                <div className="folder-actions">
                  <button 
                    className="options-btn"
                    onClick={() => toggleOptions(`folder-${folder.id}`)}
                  >
                    <FaEllipsisV />
                  </button>
                  {showOptions === `folder-${folder.id}` && (
                    <div className="options-menu">
                      <button onClick={() => handleFolderAction('open', folder.id)}>Open</button>
                      <button onClick={() => handleFolderAction('rename', folder.id)}>Rename</button>
                      <button onClick={() => handleFolderAction('delete', folder.id)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="files-section">
          <h3>Files</h3>
          <div className="files-list">
            {filteredFiles.map(file => (
              <div key={file.id} className="file-item">
                <div className="file-icon-container">
                  {getFileIcon(file.type)}
                </div>
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-meta">{file.size} • {file.date}</div>
                </div>
                <div className="file-actions">
                  <button 
                    className="options-btn"
                    onClick={() => toggleOptions(`file-${file.id}`)}
                  >
                    <FaEllipsisV />
                  </button>
                  {showOptions === `file-${file.id}` && (
                    <div className="options-menu">
                      <button onClick={() => handleFileAction('view', file.id)}>View</button>
                      <button onClick={() => handleFileAction('download', file.id)}>Download</button>
                      <button onClick={() => handleFileAction('rename', file.id)}>Rename</button>
                      <button onClick={() => handleFileAction('move', file.id)}>Move</button>
                      <button onClick={() => handleFileAction('delete', file.id)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFiles;