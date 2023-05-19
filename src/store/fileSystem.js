const fileSystem = {
  name: "Documents",
  type: "folder",
  collapsed: false,
  children: [
    {
      name: "index.js",
      type: "file",
    },
    {
      name: "app.js",
      type: "file",
    },
    {
      name: "Work",
      type: "folder",
      collapsed: true,
      children: [
        {
          name: "Project1.docx",
          type: "file",
          size: "1024 KB",
        },
        {
          name: "Project2.docx",
          type: "file",
          size: "800 KB",
        },
      ],
    },
    {
      name: "Personal",
      type: "folder",
      collapsed: true,
      children: [
        {
          name: "Resume.pdf",
          type: "file",
          size: "500 KB",
        },
        {
          name: "Photos",
          type: "folder",
          collapsed: true,
          children: [
            {
              name: "Image1.jpg",
              type: "file",
              size: "200 KB",
            },
            {
              name: "Image2.jpg",
              type: "file",
              size: "300 KB",
            },
          ],
        },
      ],
    },
  ],
};
export default fileSystem;
