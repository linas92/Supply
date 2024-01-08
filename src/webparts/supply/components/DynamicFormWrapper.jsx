import * as React from "react";
import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";

const DynamicFormWrapper = (props) => {
  const [formData, setFormData] = React.useState({});

  const onSuccess = () => {
    setFormData({});

    if (props.onSuccess) {
      props.onSuccess();
    }
  };

  return (
    <DynamicForm
      {...props} 
      formData={formData} 
      onSuccess={onSuccess} 
    />
  );
};

export default DynamicFormWrapper;