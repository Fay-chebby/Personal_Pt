import React, { useState } from "react";
import explorer from "./data/Folder data";

function FileUploader() {
    const [fileStructure, setFileStructure] = useState(explorer);

    // Function to add a new folder
    const addFolder = () => {
        const folderName = prompt("Enter folder name:");
        if (folderName) {
            const newFolder = {
                id: Date.now() + Math.random(),
                name: folderName,
                isFolder: true,
                items: [],
            };

            setFileStructure((prevStructure) => ({
                ...prevStructure,
                items: [...prevStructure.items, newFolder],
            }));
        }
    };

    // Handle file uploads
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const newItems = files.map((file) => ({
            id: Date.now() + Math.random(),
            name: file.name,
            isFolder: false,
            items: null,
        }));

        setFileStructure((prevStructure) => ({
            ...prevStructure,
            items: [...prevStructure.items, ...newItems],
        }));
    };

    // Handle folder uploads
    const handleFolderUpload = (event) => {
        const files = Array.from(event.target.files);
        const folderItems = {};

        // Group files by folder structure
        files.forEach((file) => {
            const folderPath = file.webkitRelativePath.split("/").slice(0, -1).join("/");
            if (!folderItems[folderPath]) {
                folderItems[folderPath] = [];
            }
            folderItems[folderPath].push({
                id: Date.now() + Math.random(),
                name: file.name,
                isFolder: false,
                items: null,
            });
        });

        // Create folder hierarchy
        const createHierarchy = (path, items) => {
            if (path.length === 0) return items;

            const folderName = path.shift();
            return [
                {
                    id: Date.now() + Math.random(),
                    name: folderName,
                    isFolder: true,
                    items: createHierarchy(path, items),
                },
            ];
        };

        const newFolders = Object.entries(folderItems).map(([folderPath, files]) => {
            const pathParts = folderPath.split("/");
            return createHierarchy(pathParts, files);
        });

        setFileStructure((prevStructure) => ({
            ...prevStructure,
            items: [...prevStructure.items, ...newFolders.flat()],
        }));
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const newItems = files.map((file) => ({
            id: Date.now() + Math.random(),
            name: file.name,
            isFolder: false,
            items: null,
        }));

        setFileStructure((prevStructure) => ({
            ...prevStructure,
            items: [...prevStructure.items, ...newItems],
        }));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const renderFileStructure = (items) => {
        return (
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.isFolder ? (
                            <>
                                <strong>{item.name}</strong>
                                {item.items && item.items.length > 0 && renderFileStructure(item.items)}
                            </>
                        ) : (
                            <span>{item.name}</span>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="file-uploader-container">
            {/* Folder Creation */}
            <button onClick={addFolder}>Add Folder</button>

            {/* Drag-and-Drop Upload Section */}
            <div
                className="upload-box"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <p className="upload-title">Upload your files or folders</p>
                <div className="drop-area">
                    {/* Upload File */}
                    <label htmlFor="file-upload" className="drop-label">
                        <div className="folder-icon"></div>
                        <p>Drag & Drop your files here</p>
                        <p>or click to upload files</p>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        className="file-input"
                        multiple
                        onChange={handleFileUpload}
                    />

                    {/* Upload Folder */}
                    <label htmlFor="folder-upload" className="drop-label">
                        <p>or click to upload folders</p>
                    </label>
                    <input
                        id="folder-upload"
                        type="file"
                        className="file-input"
                        webkitdirectory="true"
                        directory="true"
                        multiple
                        onChange={handleFolderUpload}
                    />
                </div>
            </div>

            {/* File Explorer Section */}
            <div className="file-explorer">
                <h3>File Explorer</h3>
                {fileStructure.items && fileStructure.items.length > 0 ? (
                    renderFileStructure(fileStructure.items)
                ) : (
                    <p>No files or folders available.</p>
                )}
            </div>
        </div>
    );
}

export default FileUploader;
