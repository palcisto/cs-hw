import PropTypes from 'prop-types';
import { Checkbox, StatusIndicator } from '../../atoms';

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
      <td className="FileRow__Path"><div>{file.path}<StatusIndicator status={file.status} /></div></td>
      <td className="FileRow__Status">{file.status}</td>
    </tr>
  );
};

FileRow.propTypes = {
  file: PropTypes.object.isRequired,
  setFileSelectedHandler: PropTypes.func.isRequired
};

export default FileRow;
