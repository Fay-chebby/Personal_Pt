const useTraverseTree = () => {
    // Add a file or folder in the tree
    const insertNode = function (tree, folderId, item, isFolder) {
        // If the current tree node matches the folderId and is a folder, insert item
        if (tree.id === folderId && tree.isFolder) {
            const newItem = {
                id: new Date().getTime(),  // Unique ID based on timestamp
                name: item,               // Name of the file or folder
                isFolder: isFolder,       // Whether it's a folder or file
                items: isFolder ? [] : null // Initialize empty items for folder, null for file
            };

            // Use spread operator to create a new tree with the inserted item
            return { ...tree, items: [newItem, ...tree.items] };
        }

        // Recursively search for the folder where the item should be inserted
        const latestNode = tree.items.map((ob) => insertNode(ob, folderId, item, isFolder));

        // Return a new tree with the updated items array
        return { ...tree, items: latestNode };
    };

    // Function to delete a node (folder or file)
    const deleteNode = function (tree, nodeId) {
        // If the current node matches the nodeId, return null to remove it
        if (tree.id === nodeId) {
            return null;
        }

        // Filter out the node from the items array and apply the delete recursively
        const latestNode = tree.items
            .filter((ob) => ob.id !== nodeId)
            .map((ob) => deleteNode(ob, nodeId));

        // Return a new tree with the node deleted
        return { ...tree, items: latestNode };
    };

    // Function to rename a node (folder or file)
    const renameNode = function (tree, nodeId, newName) {
        // If the current node matches the nodeId, rename it
        if (tree.id === nodeId) {
            return { ...tree, name: newName };
        }

        // Recursively rename in the child nodes
        const latestNode = tree.items.map((ob) => renameNode(ob, nodeId, newName));

        // Return a new tree with the renamed node
        return { ...tree, items: latestNode };
    };

    // Create a root folder with an empty items array
    const createRootFolder = () => {
        return {
            id: new Date().getTime(),  // Unique ID based on timestamp
            name: "Root",              // Name of the root folder
            isFolder: true,            // It is a folder
            items: []                  // Start with no items
        };
    };

    return { createRootFolder, insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
