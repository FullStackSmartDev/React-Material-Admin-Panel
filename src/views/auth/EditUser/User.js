import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { find } from 'lodash';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfoByAdmin } from 'src/actions/accountActions';
import { userRoles } from '../../../utils/data';

const useStyles = makeStyles(() => ({
  root: {}
}));

function User({ userId, ...rest }) {
  const userList = useSelector((state) => state.account.userList);
  const userInfo = find(userList.data, ['id', parseInt(userId, 10)]);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: '',
        userRole: userInfo.role
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .min(1, 'Must be at least 1 characters')
          .max(255)
          .required('Required'),
        lastName: Yup.string()
          .min(1, 'Must be at least 1 characters')
          .max(255)
          .required('Required'),
        email: Yup.string()
          .email('Enter a valid email')
          .required('Email is required'),
        password: Yup.string()
          .min(7, 'Must be at least 7 characters')
          .max(255)
          .required('Required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const data = {
            userId: userId,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            role: values.userRole
          };

          await dispatch(updateUserInfoByAdmin(data));
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Password updated', {
            variant: 'success'
          });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
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
        <form onSubmit={handleSubmit}>
          <Card className={clsx(classes.root)} {...rest}>
            <CardHeader title="User Information" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="First Name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label="Last Name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Select User Role"
                    name="userRole"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    select
                    SelectProps={{ native: true }}
                    value={values.userRole}
                    variant="outlined"
                  >
                    {userRoles.map((role) => (
                      <option value={role.value}>{role.label}</option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box p={2} display="flex" justifyContent="flex-end">
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

User.propTypes = {
  userId: PropTypes.string
};

export default User;
