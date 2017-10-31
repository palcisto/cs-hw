import Component from 'inferno-component';
import PropTypes from 'prop-types';
import { Checkbox, Panel, PanelContent, PanelHeader } from '../../atoms';
import { FileRow } from '../../molecules';
import './FileManager.css';

export class FileManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
    this.setAllSelectedHandler  = this.setAllSelectedHandler.bind(this);
    this.setFileSelectedHandler = this.setFileSelectedHandler.bind(this);
    this.downloadFiles          = this.downloadFiles.bind(this);
  }

  componentDidMount() {
    const state = {
      filesSelected: 'none',
      files: this.props.files.map(file => Object.assign({}, file, { selected: false }))
    };

    this.setState(state);
  }

  setFileSelectedHandler(index) {
    return event => {
      const target = event.target;
      const files = this.state.files;
      const state = {};
      state.files = files.map((file, idx) => {
        return index === idx ? this.setFileSelectedNess(file, target.checked) : file;
      });
      const selectedCount = state.files.filter(file => file.selected).length;

      if (selectedCount) {
        state.filesSelected = selectedCount < files.length ? 'some' : 'all';
      } else {
        state.filesSelected = 'none';
      }

      this.setState(state);
    };
  }

  setFileSelectedNess(file, isSelected) {
    return Object.assign({}, file, { selected: isSelected });
  };

  setAllSelectedHandler() {
    const allFiles = this.state.files;
    const selected = allFiles.filter(file => file.selected);
    const state = {};

    if (selected.length < allFiles.length) {
      state.files = allFiles.map(file => this.setFileSelectedNess(file, true));
      state.filesSelected = 'all';
    } else {
      state.files = allFiles.map(file => this.setFileSelectedNess(file, false));
      state.filesSelected = 'none';
    }

    this.setState(state);
  }

  downloadFiles() {
    const selectedFiles = this.state.files.filter(file => file.selected);
    const availableFiles = selectedFiles.filter(file => file.status === 'available');
    const unAvailableFiles = selectedFiles.filter(file => file.status !== 'available');
    let message = ['The following files were selected for download:'];

    if (availableFiles.length) {
      message.push('\n\nAvailable for download:');
      buildSelectedFiles(availableFiles);
    }

    if (unAvailableFiles.length) {
      message.push('\n\nUnavailable for download:');
      buildSelectedFiles(unAvailableFiles);
    }

    if (!selectedFiles.length) {
      message = ['No files were selected for download.'];
    }

    alert(message.join(''));

    function buildSelectedFiles (files) {
      files.forEach(file => {
        message.push(`\n* ${file.device}  -  ${file.path}`);
      });
    };
  }

  render() {
    const selectedFilesCount = this.state.files.filter(file => file.selected).length;
    return (
      <div className="FileManager">
        <Panel>
          <PanelHeader>
            <div className="TableActions">
              <div className="TableActions__SelectAll">
                <Checkbox
                  className="Checkbox"
                  checked={this.state.filesSelected === 'all'}
                  onClick={this.setAllSelectedHandler}
                  indeterminate={this.state.filesSelected === 'some'}
                />
              </div>
              <div className="TableActions__SelectedCount">
                {selectedFilesCount ? `Selected ${selectedFilesCount}` : 'None Selected'}
              </div>
              <div className="TableActions__DownloadButton">
                <button onClick={this.downloadFiles}>Download Selected</button>
              </div>
            </div>
          </PanelHeader>
          <PanelContent>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Device</th>
                  <th>Path</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.files.map((file, idx) => (
                  <FileRow file={file} setFileSelectedHandler={this.setFileSelectedHandler(idx)} key={idx} />
                ))}
              </tbody>
            </table>
          </PanelContent>
        </Panel>
      </div>
    );
  }
}

FileManager.propTypes = {
  files: PropTypes.array.isRequired
};

export default FileManager;
