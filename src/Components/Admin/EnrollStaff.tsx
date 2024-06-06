import React, { useEffect, useState } from 'react';
import '../../Styles/Modal.css';
import '../../Styles/Room.css';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAddStaffMutation, useAddStaffDetailsMutation, useEditStaffDetailsMutation, StaffData } from '../../Redux/Slices/StaffSlice';
import { EnrollStaffProps } from '../../Utils/interface';

const EnrollStaff: React.FC<EnrollStaffProps> = ({ onClose, onSuccess, mode, rowData }) => {

  const [addStaff] = useAddStaffMutation();
  const [addStaffDetails] = useAddStaffDetailsMutation();
  const [editStaffDetails] = useEditStaffDetailsMutation();

  const initialValues: StaffData = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone_no: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    date_of_birth: Yup.date().required('Date of birth is required'),
    gender: Yup.string().required('Gender is required'),
    phone_no: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    ...(mode === 'add'
      ? {
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      }
      : {}),
  });


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      if (mode == 'add')
        handleAdd(values);
      if (mode == 'edit')
        handleEdit(values);
    },
  });

  useEffect(() => {
    if (mode === 'edit' && rowData) {
      formik.setValues({
        first_name: rowData.first_name || '',
        last_name: rowData.last_name || '',
        date_of_birth: rowData.date_of_birth || '',
        gender: rowData.gender || '',
        phone_no: rowData.phone_no || '',
        email: rowData.email || '',
        password: rowData.password || ''
      });
    }
  }, [mode, rowData]);

  const handleAdd = async (values: StaffData) => {
    try {
      const userResponse = await addStaff({ email: values.email, password: values.password }).unwrap();
      const detailsResponse = await addStaffDetails({
        first_name: values.first_name,
        last_name: values.last_name,
        date_of_birth: values.date_of_birth,
        gender: values.gender,
        phone_no: values.phone_no,
        user_id: userResponse.status.data.id,
        role_id: 2,
      }).unwrap();

      onSuccess();
      toast.success('User added successfully!');
      onClose();
    } catch (error: any) {
      if (error.data.status.errors.length > 0) {
        error.data.status.errors.forEach((error: string) => {
          toast.error(error);
        });
        return;
      }
      console.error('Error adding staff:', error);
    }
  }

  const handleEdit = async (values: StaffData) => {
    try {
      const detailsResponse = await editStaffDetails({
        id: rowData.user_id,
        details: {
          first_name: values.first_name,
          last_name: values.last_name,
          date_of_birth: values.date_of_birth,
          gender: values.gender,
          phone_no: values.phone_no,
          role_id: 2,
        },
      }).unwrap();

      onSuccess();
      toast.success('User updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  }


  return (

    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <div className='row'>
          <div className='col-2'>
          </div>
          <div className='col-8 text-center'>
            <h2>{mode == 'add' ? 'Add' : 'Update'} Staff</h2>
          </div>
          <div className='col-2'>
            <span className="close" onClick={onClose}>&times;</span>
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={formik.handleSubmit}>
            <div className="input-group">
              <label htmlFor="first_name">First Name</label>
              <input
                id='first_name'
                type="text"
                {...formik.getFieldProps('first_name')}
                placeholder="First Name"
                required
              />
              {formik.touched.first_name && formik.errors.first_name ? (
                <label className="error-message">{formik.errors.first_name}</label>
              ) : null}
            </div>
            <div className="input-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                {...formik.getFieldProps('last_name')}
                placeholder="Last Name"
                required
              />
              {formik.touched.last_name && formik.errors.last_name ? (
                <label className="error-message">{formik.errors.last_name}</label>
              ) : null}
            </div>
            <div className="input-group">
              <label htmlFor="date_of_birth">Date of Birth</label>
              <input
                type="date"
                {...formik.getFieldProps('date_of_birth')}
                placeholder="Date of Birth"
                required
              />
              {formik.touched.date_of_birth && formik.errors.date_of_birth ? (
                <label className="error-message">{formik.errors.date_of_birth}</label>
              ) : null}
            </div>
            <div className="input-group">
              <label>Gender</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formik.values.gender === "male"}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formik.values.gender === "female"}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    required
                  />
                  Female
                </label>
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <label className="error-message">{formik.errors.date_of_birth}</label>
              ) : null}
            </div>
            <div className="input-group">
              <label htmlFor="phone_no">Phone Number</label>
              <input
                type="tel"
                {...formik.getFieldProps('phone_no')}
                placeholder="Phone Number"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                required
              />
              {formik.touched.phone_no && formik.errors.phone_no ? (
                <label className="error-message">{formik.errors.phone_no}</label>
              ) : null}
            </div>
            {mode === 'add' && (
              <>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    {...formik.getFieldProps('email')}
                    placeholder="Email"
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <label className="error-message">{formik.errors.email}</label>
                  ) : null}
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    {...formik.getFieldProps('password')}
                    placeholder="Password"
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <label className="error-message">{formik.errors.password}</label>
                  ) : null}
                </div>
              </>
            )}
            <button type="submit" disabled={!formik.isValid || !formik.dirty || formik.isSubmitting} className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right"
        autoClose={5000}
        toastStyle={{ width: '400px' }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"></ToastContainer>
    </div>
  );
};

export default EnrollStaff;
