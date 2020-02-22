import React from "react";
import {AnchorButton, Intent} from "@blueprintjs/core";
import _ from "lodash";
import {Icon} from "react-icons-kit";
import {remove} from 'react-icons-kit/fa/remove';

export default class DraggableUploader extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loadedFiles: []
    };
  }

  onFileLoad(e) {
    // console.log(e)
    const file = e.dataTransfer.files[0] ||e.target.files[0] ;
    let fileReader = new FileReader();
    fileReader.onload = () => {
      // console.log("IMAGE LOADED: ", fileReader.result);
      const file = {
        data: fileReader.result,
        isUploading: false
      }
      this.addLoadedFile(file);
    }
    fileReader.onabort = () => {
      alert("Reading Aborted");
    }
    fileReader.onerror = () => {
      alert("Reading ERROR!");
    }
    fileReader.readAsDataURL(file);
  }
  addLoadedFile(file) {
    this.setState((prevState) => ({
      loadedFiles: [
        ...prevState.loadedFiles,
        file
      ]
    }));
  }
  removeLoadedFile(file) {
    this.setState({loadedFiles: []});
  }
  updateLoadedFile(oldFile, newFile) {
    this.setState((prevState) => {
      const loadedFiles = [...prevState.loadedFiles];
      _.find(loadedFiles, (file, idx) => {
        if (file === oldFile) 
          loadedFiles[idx] = newFile;
        }
      );
      return {loadedFiles};
    });
    return newFile;
  }
  onUpload() {
    const {loadedFiles} = this.state;
    loadedFiles.map((file, idx) => {
      // console.log("Updating...");
      //Update file (Change it's state to uploading)
      let newFile = this.updateLoadedFile(file, {
        ...file,
        isUploading: true
      });
      //Simulate a REAL WEB SERVER DOING IMAGE UPLOADING
      setTimeout(() => {
        //Get it back to it's original State
        this.updateLoadedFile(newFile, {
          ...newFile,
          isUploading: false
        });
      }, 3000);
    });
  }

  render() {
    const {loadedFiles} = this.state;
    return (
      <div
        className="inner-container"
        style={{
          display: "flex",
          flexDirection: "column"
      }}>
        <div className="sub-header">Drag an Image</div>
        <div className="draggable-container">
          <input
            type="file"
            id="file-browser-input"
            name="file-browser-input"
            ref={this.asdfasdf}
            // ref={input => this.fileInput = input}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={this.onFileLoad.bind(this)}
          />
          <div className="files-preview-container ip-scrollbar">
            {loadedFiles.map((file, idx) => {
              return <div className="file" key={idx}>
                <img src={file.data} alt="..." />
                <div className="container">
                  <span className="remove-btn" onClick={() => this.removeLoadedFile(file)}>
                    <Icon icon={remove} size={19}/>
                  </span>
                </div>
              </div>
            })}
          </div>
          <div className="file-browser-container">
            <AnchorButton
              text="Browse"
              intent={Intent.PRIMARY}
              minimal={true}
              onClick={() => this.fileInput.click()}/>
          </div>
        </div>
      </div>
    );
  }
}