import Component from 'inferno-component';
import './Checkbox.css';

export class Checkbox extends Component {
  componentDidMount() {
    this.el.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.el.indeterminate = this.props.indeterminate;
    }
  }

  render() {
    return (
      <input
        {...this.props}
        type="checkbox"
        ref={el => this.el = el}
      />
    );
  }
}

Checkbox.defaultProps = {
  indeterminate: false
};

export default Checkbox;
