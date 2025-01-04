import { useState } from "react";
import Folder from "./Components/Folder";
import useTraverseTree from "./Hook/use-traverse-tree";
//import "./styles.css";
import explorer from "./Components/data/Folder data"

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
      <div className="App">
        <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
      </div>
  );
}

// fix connect script in latest video