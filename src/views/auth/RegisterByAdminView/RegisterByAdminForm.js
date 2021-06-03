import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { userRoles } from 'src/utils/data';
import axios from 'src/utils/axios';
import * as actionTypes from 'src/actionTypes';
import { registerUserByAdmin } from 'src/actions/accountActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  select: {
    width: 505,
    marginBottom: theme.spacing(1)
  },
  alignCenter: {
    textAlign: 'center'
  }
}));

function RegisterByAdminForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const [supervisors, setSupervisors] = useState();
  const [agentRoleActive, setAgentRoleActive] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    async function getAvailableSupervisors() {
      try {
        const initialSupervisors = {
          id: -1,
          firstName: 'None',
          lastName: ''
        };
        const response = await axios.get(
          `${actionTypes.API_URL}/supervisor/get-available-supervisors`
        );
        response.data.data.unshift(initialSupervisors);
        setSupervisors(response.data.data);
      } catch (e) {
        console.log(e.toString());
      }
    }
    getAvailableSupervisors();
  }, []);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        supervisor: ''
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required('First name is required'),
        lastName: Yup.string().max(255).required('Last name is required'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().min(7).max(255).required('Password is required'),
        role: Yup.string().required('Role is required')
      })}
      onSubmit={async (values, { setErrors, setStatus }) => {
        try {
          const data = {
            ...values,
            createBy: user.data.role ? user.data.role : ''
          };
          await dispatch(registerUserByAdmin(data));
          onSubmitSuccess();
        } catch (err) {
          const message = err || 'Something went wrong';
          setStatus({ success: false });
          setErrors({ submit: message });
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.firstName && errors.firstName)}
            fullWidth
            helperText={touched.firstName && errors.firstName}
            label="First Name"
            margin="normal"
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            type="firstName"
            value={values.firstName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.lastName && errors.lastName)}
            fullWidth
            helperText={touched.lastName && errors.lastName}
            label="Last Name"
            margin="normal"
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            type="lastName"
            value={values.lastName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <FormControl>
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              id="role"
              name="role"
              helperText={touched.role && errors.role}
              onChange={(event) => {
                setFieldValue('role', event.target.value);
                if (event.target.value === 'call_center_agent') {
                  setAgentRoleActive(true);
                } else {
                  setAgentRoleActive(false);
                }
              }}
              onBlur={handleBlur}
              value={values.role}
              className={classes.select}
            >
              {userRoles.map((role) => (
                <MenuItem value={role.value}>{role.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {agentRoleActive && (
            <FormControl>
              <InputLabel id="supervisor">Supervisor</InputLabel>
              <Select
                labelId="supervisor"
                id="supervisor"
                name="supervisor"
                helperText={touched.supervisor && errors.supervisor}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.supervisor}
                className={classes.select}
              >
                {supervisors.map((supervisor) => (
                  <MenuItem value={supervisor.id}>
                    {supervisor.firstName + supervisor.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {Boolean(touched.role && errors.role) && (
            <FormHelperText error>{errors.role}</FormHelperText>
          )}
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText className={classes.alignCenter} error>
                {errors.submit}{' '}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create account
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterByAdminForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

export default RegisterByAdminForm;
