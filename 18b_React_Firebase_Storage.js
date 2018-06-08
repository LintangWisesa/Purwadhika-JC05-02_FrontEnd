import React, { Component } from 'react';
import fire from './fire';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class ProfilePage extends Component {
state = {
username: '',
avatar: '',
isUploading: false,
progress: 0,
avatarURL: ''
};
handleChangeUsername = (event) => this.setState({username: event.target.value});

handleUploadStart = () => this.setState({isUploading: true, progress: 0});

handleProgress = (progress) => this.setState({progress});

handleUploadError = (error) => {
this.setState({isUploading: false});
console.error(error);
}

handleUploadSuccess = (filename) => {
this.setState({avatar: filename, progress: 100, isUploading: false});
fire.storage().ref('lin_foto').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
};
render() {
  return (
  <div>
  <form>
  <p><label>Nama:</label>
  <input type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
  </p><label>Foto Diri:</label>
  {this.state.isUploading && <p> Process: {this.state.progress}</p>}
  {this.state.avatarURL && 
  <img src={this.state.avatarURL} alt="ok" />}
  <FileUploader accept="image/*" name="avatar" randomizeFilename
  storageRef={fire.storage().ref('lin_foto')}
  onUploadStart={this.handleUploadStart}
  onUploadError={this.handleUploadError}
  onUploadSuccess={this.handleUploadSuccess}
  onProgress={this.handleProgress}
  />
  </form>
  </div>
  );}}
  
  export default ProfilePage;
  