import React, { Component } from "react";
import Dropzone from "react-dropzone";
import '../EventUpload.css';
import UploadService from "../services/upload-files.service";
import { storageDb } from '../firebase/index';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
    };

  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    // firebase upload
    // Create a reference to images/'file'.jpg
    const storageRwpRef = ref(storageDb, 'rwp/' + currentFile.name);
    const uploadTask = uploadBytesResumable(storageRwpRef, currentFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        console.log("uploading image...");
      }, (error) => {
        console.log("upload image failed... " + error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.props.setImageUrl(downloadURL);
          this.setState({
            progress: 100,
            message: "Successful!",
            currentFile: this.state.selectedFiles[0],
          });
        })
      }
    );

    // While the file names are the same, the references point to different files
    //dropImagesRef.name;           // true
    //dropImagesRef.fullPath;   // false 

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  onDrop(files) {
    if (files.length > 0) {
      this.setState({ selectedFiles: files });
    }
  }

  render() {
    const { selectedFiles, currentFile, progress, message, fileInfos } = this.state;

    return (
      <div>
        <p>Event's Cover Photo</p>
        {currentFile && (
          <div className="progress mb-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <Dropzone onDrop={this.onDrop} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {selectedFiles && selectedFiles[0].name ? (
                  <div className="selected-file">
                    {selectedFiles && selectedFiles[0].name}
                  </div>
                ) : (
                  "Drag and drop file here, or click to select file"
                )}
              </div>
              <aside className="selected-file-wrapper">
                <button
                  className="btn btn-success"
                  disabled={!selectedFiles}
                  onClick={this.upload}
                >
                 Upload Selected Image
                </button>
              </aside>
            </section>
          )}
        </Dropzone>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        {fileInfos.length > 0 && (
          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}