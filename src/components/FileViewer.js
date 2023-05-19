export default function FileViewer({ fileName = "" }) {
  return (
    <h3
      style={{
        flexGrow: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {`This is the file viewer for the selected file ${fileName}.`}
    </h3>
  );
}
