import PropTypes from 'prop-types';
import './StatusIndicator.css';

export const StatusIndicator = ({ status }) => (
  <span className={`StatusIndicator StatusIndicator--${status}`}></span>
);

StatusIndicator.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusIndicator;
