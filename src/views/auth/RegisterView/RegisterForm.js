import React from 'react';
import { useDispatch } from 'react-redux';
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
import { register } from 'src/actions/accountActions';

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

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
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
          await dispatch(register(values));
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
              helperText={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
              className={classes.select}
            >
              {userRoles.map((role) => (
                <MenuItem value={role.value}>{role.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
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

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

export default RegisterForm;
