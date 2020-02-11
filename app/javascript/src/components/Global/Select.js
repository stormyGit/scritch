import React, { Component } from "react";
import Select from "react-select";

class CustomSelect extends Component {
  render() {
    const styles = {
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          color: "#222"
        };
      }
    };

    return <Select styles={styles} {...this.props} />;
  }
}

export default CustomSelect;
