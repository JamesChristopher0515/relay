import React from 'react';
export function Select(props) {
    const { options, value, onChange } = props;
    return (React.createElement("select", { value: value, onChange: onChange }, options.map((option) => {
        return React.createElement("option", { key: option.value }, option);
    })));
}
//# sourceMappingURL=Select.js.map