import Component from 'inferno-component';
import PropTypes from 'prop-types';
import { Checkbox } from '../../atoms';
import './FileManager.css';

const FileRow = ({ file, setFileSelectedHandler }) => {
  const classNames = ['FileRow', `${file.selected ? 'FileRow--Selected' : ''}`].join(' ');
  return (
    <tr className={classNames}>
      <td className="FileRow__Checkbox">
        <Checkbox
          className="Checkbox"
          checked={file.selected}
          onClick={setFileSelectedHandler}
        />
      </td>
      <td className="FileRow__Name">{file.name}</td>
      <td className="FileRow__Device">{file.device}</td>
      <td className="FileRow__Path"><div>{file.path}<span className={`StatusIndicator StatusIndicator--${file.status}`}></span></div></td>
      <td className="FileRow__Status">{file.status}</td>
    </tr>
  );
};

export class FileManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
    this.setFileSelectedHandler = this.setFileSelectedHandler.bind(this);
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
      const files = this.state.files.map((file, idx) => {
        return index === idx ? this.setFileSelectedNess(file, target.checked) : file;
      });

      this.setState({files});
    };
  }

  setFileSelectedNess(file, isSelected) {
    return Object.assign({}, file, { selected: isSelected });
  };

  render() {
    return (
      <div className="FileManager">
        <div className="Panel">
          <div className="Panel__Header">
            <div className="TableActions">
              <div className="TableActions__SelectAll">
                <Checkbox
                  className="Checkbox"
                  checked={this.state.filesSelected === 'all'}
                  onClick={this.setFileSelectedHandler}
                />
              </div>
              <div className="TableActions__SelectedCount">
                Selected 2
              </div>
              <div className="TableActions__DownloadButton">
                <button>Download Selected</button>
              </div>
            </div>
          </div>
          <div className="Panel__Content">
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
          </div>
        </div>
      </div>
    );
  }
}

FileManager.propTypes = {
  files: PropTypes.array.isRequired
};

export default FileManager;
