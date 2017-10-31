import { version } from 'inferno';
import Component from 'inferno-component';
import './registerServiceWorker';
import { FileManager } from './components/organisms';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},
        {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
        {name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
        {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},
        {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <FileManager files={this.state.data} />
      </div>
    );
  }
}

export default App;
