import React, { useState, useEffect } from 'react';
import './CustomerForm.css';

const CustomForm = () => {
  const initialFormData = {
    name: '',
    employeeId: '',
    city: '',
    gender: '',
  };

  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Load data from local storage when the component mounts.
    const savedData = localStorage.getItem('customerData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing data from localStorage:', error);
        setFormData(initialFormData);
      }
    }
  }, []);

  const handleChange = (e) => {
    //  Updates formData state with new input value and corresponding key
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSave = () => {
    //  Save customer data to local storage before submitting the form
    const requiredFields = ['name', 'city', 'employeeId', 'gender'];
    const errors = {};
    //form validations
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = `Please enter the ${field === 'employeeId' ? 'Employee' : field} field`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      localStorage.setItem('customerData', JSON.stringify(formData));
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter Name"
            required
          />
          {formErrors.name && <p className="error-msg">{formErrors.name}</p>}
        </label>

        <label htmlFor="employeeId">
          Employee ID:
          <input
            type="number"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter Employee ID"
            required
          />
          {formErrors.employeeId && <p className="error-msg">{formErrors.employeeId}</p>}
        </label>

        <label htmlFor="city">
          City:
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!isEditing}
            required
          >
            <option value="">▼ Select City ▼</option>
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Tokyo">Tokyo</option>
          </select>
          {formErrors.city && <p className="error-msg">{formErrors.city}</p>}
        </label>

        <fieldset>
          <legend>Gender:</legend>
          <label htmlFor="male">
            <input
              type="radio"
              id="male"
              name="gender"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              disabled={!isEditing}
            />
            Male
          </label>
          <label htmlFor="female">
            <input
              type="radio"
              id="female"
              name="gender"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              disabled={!isEditing}
            />
            Female
          </label>
          {formErrors.gender && <p className="error-msg">{formErrors.gender}</p>}
        </fieldset>

        {isEditing ? (
          <button type="button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        )}
      </form>

      <div>
        <h2>Saved Data Display:</h2>
        <p>Name: {formData.name}</p>
        <p>Employee ID: {formData.employeeId}</p>
        <p>City: {formData.city}</p>
        <p>Gender: {formData.gender}</p>
      </div>
    </div>
  );
};

export default CustomForm;
