import { useState, useRef } from "react";
import {
  FolderPlus,
  FilePlus,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronDown,
} from "react-feather";
import "./FileExplorer.css";

const actionItemsFolder = (level, isFolder) => {
  return !isFolder
    ? [
        { ariaLabel: "Edit", title: "Edit..", Icon: Edit2, actionType: "Edit" },
        {
          ariaLabel: "Delete",
          title: "Delete..",
          Icon: Trash2,
          actionType: "Delete",
        },
      ]
    : level === 1
    ? [
        {
          ariaLabel: "Create file inside",
          title: "New File..",
          Icon: FilePlus,
          actionType: "File",
        },
        {
          ariaLabel: "Create folder inside",
          title: "New Folder..",
          Icon: FolderPlus,
          actionType: "Folder",
        },
      ]
    : [
        { ariaLabel: "Edit", title: "Edit..", Icon: Edit2, actionType: "Edit" },
        {
          ariaLabel: "Create file inside",
          title: "New File..",
          Icon: FilePlus,
          actionType: "File",
        },
        {
          ariaLabel: "Create folder inside",
          title: "New Folder..",
          Icon: FolderPlus,
          actionType: "Folder",
        },
        {
          ariaLabel: "Delete",
          title: "Delete..",
          Icon: Trash2,
          actionType: "Delete",
        },
      ];
};

function FileExplorer({ fileSystem }) {
  const [fileStructure, setFileStructure] = useState(fileSystem);
  const editName = useRef(null);

  const renderFileSystem = (
    item,
    level = 1,
    parentNode = null,
    nodeIndex = 0
  ) => {
    const {
      name,
      type,
      children,
      collapsed = level === 1 ? false : true,
      isEditing = false,
    } = item;
    const isFolder = type === "folder";

    const handleToggleExpand = (node) => {
      node.collapsed = !node.collapsed;
      setFileStructure({ ...fileStructure });
    };

    const handleKeyDown = (event, node) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleToggleExpand(node);
      }
    };

    const handleCreateFile = () => {
      item.collapsed = false;
      item.children.push({ name: "", isEditing: true, type: "file" });
      setFileStructure({ ...fileStructure });
    };

    const handleCreateFolder = () => {
      item.collapsed = false;
      item.children.push({
        name: "",
        isEditing: true,
        type: "folder",
        children: [],
      });
      setFileStructure({ ...fileStructure });
    };

    const handleToggle = () => {
      if (isFolder) {
        handleToggleExpand(item);
      }
    };

    const handleDelete = () => {
      parentNode.children.splice(nodeIndex, 1);
      setFileStructure({ ...fileStructure });
    };

    const handleEdit = () => {
      item.isEditing = true;
      setFileStructure({ ...fileStructure });
    };

    const handleNameDoubleClick = () => {
      handleEdit();
    };

    const handleRenameSubmitInternal = (e) => {
      let newName = e.target.value;
      if (!newName) {
        newName = editName.current;
        editName.current = null;
      }
      item.name = newName;
      item.isEditing = false;
      setFileStructure({ ...fileStructure });
    };

    const handleRenameCancelInternal = () => {
      item.isEditing = false;
      setFileStructure({ ...fileStructure });
    };

    const handleActionClick = (actionType) => {
      switch (actionType) {
        case "Edit":
          handleEdit();
          break;
        case "Delete":
          handleDelete();
          break;
        case "File":
          handleCreateFile();
          break;
        case "Folder":
          handleCreateFolder();
          break;
        default:
          break;
      }
    };

    return (
      <div
        key={name}
        style={{ textAlign: "left" }}
        aria-expanded={!collapsed}
        aria-label={isFolder ? `${name} folder` : `${name} file`}
      >
        <div
          className="listRow"
          id={`level-${level}`}
          style={{
            borderLeft:
              level > 2 && !parentNode.collapsed
                ? "0.5px solid rgb(204, 204, 204)"
                : "",
          }}
        >
          <div>
            <button
              className="listContent"
              type="button"
              onClick={handleToggle}
              onKeyDown={(event) => handleKeyDown(event, item)}
              tabIndex={0}
              aria-haspopup={isFolder ? "true" : "false"}
              aria-expanded={collapsed}
              aria-label={isFolder ? "Collapse folder" : "Expand file"}
            >
              {isFolder ? (
                collapsed ? (
                  <ChevronRight color="#FFFFFF" size={18} />
                ) : (
                  <ChevronDown color="#FFFFFF" size={18} />
                )
              ) : (
                "📄"
              )}
            </button>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onFocus={(e) => {
                  if (!editName.current) {
                    editName.current = e.target.value;
                  }
                }}
                onChange={(e) => {
                  item.name = e.target.value;
                  setFileStructure({ ...fileStructure });
                }}
                onBlur={handleRenameSubmitInternal}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    handleRenameCancelInternal();
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    handleRenameSubmitInternal(e);
                  }
                }}
                autoFocus
              />
            ) : (
              <span className="fileName" onDoubleClick={handleNameDoubleClick}>
                {name}
              </span>
            )}
          </div>
          <div className="actions" style={{ marginLeft: "auto" }}>
            {actionItemsFolder(level, isFolder).map(
              ({ ariaLabel, title, Icon, actionType }) => (
                <button
                  id={title}
                  className="iconsAsButton"
                  onClick={handleActionClick.bind(this, actionType)}
                  aria-label={`${ariaLabel} ${name}`}
                  title={title}
                >
                  <Icon color="#c9c9c9" size={18} />
                </button>
              )
            )}
          </div>
        </div>
        {!collapsed && isFolder && children && (
          <div style={{ paddingLeft: "20px" }}>
            {children.map((childNode, index) =>
              renderFileSystem(childNode, level + 1, item, index)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="filesContainer" role="tree" aria-label="File Explorer">
      {renderFileSystem(fileStructure)}
    </div>
  );
}

export default FileExplorer;
