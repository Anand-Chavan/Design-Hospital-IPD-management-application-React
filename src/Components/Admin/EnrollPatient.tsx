import React, { useEffect, useState } from 'react';
import '../../Styles/Modal.css';
import '../../Styles/Room.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../Utils/AxiosConfig';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { postUserDetails, updateUserDetails } from '../../Redux/Slices/UserDetailSlice';
import { AppDispatch } from '../../Redux/Store';
import { useDispatch } from 'react-redux';

interface EnrollPatientProps {
  onClose: () => void;
  onSuccess: (newPatient: any) => void;
  mode: string,
  rowData?: any
}

interface PatientData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone_no: string;
  email: string;
  password: string;
}

interface ApiResponseForUsers {
  status: {
    message: string;
    data: {
      id: number;
      email: string;
      created_at: string;
      updated_at: string;
      jti: string;
    };
    errors: []
  };
}

const EnrollPatient: React.FC<EnrollPatientProps> = ({ onClose, onSuccess, mode, rowData }) => {
  const dispatch = useDispatch<AppDispatch>(); // Use the AppDispatch type
  const [formData, setFormData] = useState<PatientData>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone_no: '',
    email: '',
    password: ''
  });

  const initialValues = {
    first_name: formData.first_name || '',
    last_name: formData.last_name || '',
    date_of_birth: formData.date_of_birth || '',
    gender: formData.gender || '',
    phone_no: formData.phone_no || '',
    email: mode === 'add' ? formData.email || '' : '',
    password: mode === 'add' ? formData.password || '' : '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    date_of_birth: Yup.string().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    phone_no: Yup.string().required('Phone Number is required'),
    ...(mode === 'add' && {
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
  });

  useEffect(() => {
    if (mode === 'edit' && rowData) {
      const editObj = {
        first_name: rowData.first_name,
        last_name: rowData.last_name,
        date_of_birth: rowData.date_of_birth,
        gender: rowData.gender,
        phone_no: rowData.phone_no,
        email: '',
        password: '',
      };
      setFormData(editObj);
    }
  }, [mode, rowData]);

  const handleSubmit = async (values: any) => {
    if (mode === 'add') {
      await handleAdd(values);
    } else if (mode === 'edit') {
      await handleEdit(values);
    }
  };

  const handleAdd = async (values: any) => {
    try {
      const requestBody = {
        user: {
          email: values.email,
          password: values.password
        }
      };

      const dataForUsers = await (await dispatch(updateUserDetails(requestBody))).payload;
      if (dataForUsers.status.errors && dataForUsers.status.errors.length > 0) {
        dataForUsers.status.errors.forEach((ele: string) => {
          toast.error(ele);
        });
      } else {
        const requestBodyForUserDetails = {
          user_detail: {
            first_name: values.first_name,
            last_name: values.last_name,
            date_of_birth: values.date_of_birth,
            gender: values.gender,
            phone_no: values.phone_no,
            user_id: dataForUsers.status.data.id,
            role_id: 3,
            email: values.email,
            password: values.password
          }
        };

        const dataForUserDetails = await (await dispatch(postUserDetails(requestBodyForUserDetails))).payload;
        onSuccess(dataForUserDetails);
        toast.success('User added successfully!');
        onClose();
      }
    } catch (error: any) {
      if (error.response) {
        const dataForUsers = error.response;
        if (dataForUsers.status.errors && dataForUsers.status.errors.length > 0) {
          dataForUsers.status.errors.forEach((ele: string) => {
            toast.error(ele);
          });
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };

  const handleEdit = async (values: any) => {
    try {
      const requestBodyForUserDetails = {
        user_detail: {
          first_name: values.first_name,
          last_name: values.last_name,
          date_of_birth: values.date_of_birth,
          gender: values.gender,
          phone_no: values.phone_no,
          user_id: rowData.user_id,
          role_id: 3
        }
      };

      const responseForUserDetails = await axiosInstance.put(`/user_details`, JSON.stringify(requestBodyForUserDetails));
      onSuccess(responseForUserDetails.data);
      toast.success('User updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating Patient:', error);
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8 text-center'>
            <h2>{mode === 'add' ? 'Add' : 'Update'} Patient</h2>
          </div>
          <div className='col-2'>
            <span className="close" onClick={onClose}>&times;</span>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values).finally(() => setSubmitting(false));
          }}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input-group">
                <Field type="text" name="first_name" placeholder="First Name" />
                <ErrorMessage name="first_name" component="div" className="error-message" />
              </div>
              <div className="input-group">
                <Field type="text" name="last_name" placeholder="Last Name" />
                <ErrorMessage name="last_name" component="div" className="error-message" />
              </div>
              <div className="input-group">
                <Field type="text" name="date_of_birth" placeholder="Date of Birth" />
                <ErrorMessage name="date_of_birth" component="div" className="error-message" />
              </div>
              <div className="input-group">
                <Field type="text" name="gender" placeholder="Gender" />
                <ErrorMessage name="gender" component="div" className="error-message" />
              </div>
              <div className="input-group">
                <Field type="text" name="phone_no" placeholder="Phone Number" />
                <ErrorMessage name="phone_no" component="div" className="error-message" />
              </div>
              {mode === 'add' && (
                <>
                  <div className="input-group">
                    <Field type="text" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                  <div className="input-group">
                    <Field type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>
                </>
              )}
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        toastStyle={{ width: '400px' }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default EnrollPatient;
