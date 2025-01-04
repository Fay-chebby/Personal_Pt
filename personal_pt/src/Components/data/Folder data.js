const explorer = {
    id: 1,
    name: "Root",
    isFolder: true,
    items: [
        {
            id: 2,
            name: "Documents",
            isFolder: true,
            items: [
                {
                    id: 3,
                    name: "Images",
                    isFolder: true,
                    items: []
                },
                {
                    id: 4,
                    name: "photo.jpg",
                    isFolder: false,
                    items: null
                }
            ]
        },
        {
            id: 5,
            name: "file.txt",
            isFolder: false,
            items: null
        }
    ]
};

export default explorer;
