import { useState } from "react";

function Folder({ handleInsertNode = () => {}, explorer }) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false,
    });

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder,
        });
    };

    const onAddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
            setShowInput({ ...showInput, visible: false });
        }
    };

    // Handle File or Folder Selection
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const isFolder = file.webkitRelativePath && file.webkitRelativePath.includes("/");
            const name = isFolder ? file.webkitRelativePath.split("/")[0] : file.name;

            handleInsertNode(explorer.id, name, isFolder);
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setExpand(true);

        const files = Array.from(e.dataTransfer.files);
        files.forEach((file) => {
            const isFolder = file.webkitRelativePath && file.webkitRelativePath.includes("/");
            const name = isFolder ? file.webkitRelativePath.split("/")[0] : file.name;

            handleInsertNode(explorer.id, name, isFolder);
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const renderFolder = (explorer) => {
        return (
            <div style={{ marginTop: 5 }}>
                <div
                    onClick={() => setExpand(!expand)}
                    className="folder"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <span>📁 {explorer.name}</span>

                    <div>
                        <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
                        <button onClick={(e) => handleNewFolder(e, false)}>File +</button>

                        {/* Open file or folder picker */}
                        <label>
                            Upload File
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                style={{ display: "none" }}
                            />
                        </label>
                        <label>
                            Upload Folder
                            <input
                                type="file"
                                webkitdirectory="true"
                                onChange={handleFileUpload}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>
                </div>

                <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
                    {showInput.visible && (
                        <div className="inputContainer">
                            <span>{showInput.isFolder ? "📁" : "📄"}</span>
                            <input
                                type="text"
                                className="inputContainer__input"
                                autoFocus
                                onKeyDown={onAddFolder}
                                onBlur={() => setShowInput({ ...showInput, visible: false })}
                            />
                        </div>
                    )}

                    {/* Safeguard: Default to empty array if `items` is null */}
                    {(explorer.items || []).map((exp) => {
                        return (
                            <Folder
                                handleInsertNode={handleInsertNode}
                                key={exp.id}
                                explorer={exp}
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    return explorer.isFolder ? renderFolder(explorer) : <span className="file">📄 {explorer.name}</span>;
}

export default Folder;
