import "./App.css";
import FileExplorer from "./components/FileExplorer";
import fileSystem from "./store/fileSystem";
import FileViewer from "./components/FileViewer";

function App() {
  return (
    <div className="App">
      <FileExplorer fileSystem={fileSystem} />
      <FileViewer />
    </div>
  );
}

export default App;
