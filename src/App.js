import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

const App = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleAddField = (type) => {
    setFormFields([...formFields, { type, label: '', options: [], required: false }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;
    setFormFields(updatedFields);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedFields = [...formFields];
    updatedFields[index].options[optionIndex] = value;
    setFormFields(updatedFields);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let errors = {};
    formFields.forEach((field, index) => {
      if (field.required && !formData[index]) {
        errors[index] = 'This field is required';
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Perform form submission
      console.log('Form submitted:', formData);
    }
  };

  const handleSaveConfig = () => {
    // Save form configuration as JSON
    console.log(JSON.stringify(formFields));
  };

  const handleLoadConfig = (config) => {
    setFormFields(JSON.parse(config));
  };
  return (
    <div className="container">
      <h1 className="heading">Dynamic Form Generator</h1>
      <div className="button-group">
        <button className="add-button" onClick={() => handleAddField('text')}>Add Text Input</button>
        <button className="add-button" onClick={() => handleAddField('textarea')}>Add Textarea</button>
        <button className="add-button" onClick={() => handleAddField('dropdown')}>Add Dropdown</button>
        <button className="add-button" onClick={() => handleAddField('checkbox')}>Add Checkbox</button>
        <button className="add-button" onClick={() => handleAddField('radio')}>Add Radio Button</button>
      </div>

      <form onSubmit={handleFormSubmit}>
        {formFields.map((field, index) => (
          <div className="form-field" key={index}>
            <label className="label">
              {field.type !== 'checkbox' && field.type !== 'radio' && 'Label:'}
              <input
                className="input"
                type="text"
                value={field.label}
                onChange={(e) => handleInputChange(index, 'label', e.target.value)}
              />
            </label>
            {field.type === 'dropdown' && (
              <>
                <label className="label">Options:</label>
                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      className="input"
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                  </div>
                ))}
                <button className="add-option-button" onClick={() => handleOptionChange(index, field.options.length, '')}>Add Option</button>
              </>
            )}
            <label className="label">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => handleInputChange(index, 'required', e.target.checked)}
              />
              Required
            </label>
            <button className="remove-button" onClick={() => handleRemoveField(index)}>Remove</button>
            {formErrors[index] && <p className="error">{formErrors[index]}</p>}
          </div>
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>

      <div className="button-group">
        <button className="save-button" onClick={handleSaveConfig}>Save Configuration</button>
        <input type="file" className="load-input" onChange={(e) => handleLoadConfig(e.target.value)} />
      </div>
    </div>
  );
};

export default App;
