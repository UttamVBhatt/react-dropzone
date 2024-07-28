import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// This is a comment

function App() {
  interface Files extends File {
    path?: string;
  }
  const [files, setFiles] = useState<Files[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: Files[]) => setFiles(acceptedFiles),
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleFiles = (i: number) => {
    setFiles((files) => files.filter((file) => file !== files[i]));
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Ready to catch your file...</p>
        ) : (
          <p>Drag and drop your files here....</p>
        )}
      </div>

      {files.map((file, i: number) => (
        <img
          key={file.path}
          src={URL.createObjectURL(file)}
          alt={file.path}
          onClick={() => handleFiles(i)}
        />
      ))}
    </div>
  );
}

export default App;
