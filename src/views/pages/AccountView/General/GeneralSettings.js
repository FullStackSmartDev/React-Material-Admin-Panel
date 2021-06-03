import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { get } from 'lodash';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';
import { updateUserProfile, getUserProfile } from 'src/actions/profileActions';
import { getCountries, getStates } from 'src/utils/data';

const useStyles = makeStyles(() => ({
  root: {},
  genderDiv: {
    display: 'flex',
    flexDirection: 'row'
  },
  error: {
    fontSize: 14,
    color: 'red',
    paddingLeft: 40
  }
}));

function GeneralSettings({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.account.user);
  const userProfile = useSelector((state) => state.profile.userProfile);
  const updateProfile = useSelector((state) => state.profile.updateProfile);
  const theme = useSelector((state) => state.profile.theme);

  const [country, setCountry] = useState(
    userProfile.country ? userProfile.country : 'Canada'
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userProfile.mobile ? userProfile.mobile : ''
  );
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const countryOptions = getCountries();
  let stateOptions = getStates(country);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
  };

  let userInfo = {};
  if (user && Object.keys(user).length > 0) {
    userInfo = get(user, 'data', {});
  }

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        state: userProfile.state ? userProfile.state : 'Alabama',
        country: country,
        gender: userProfile.gender ? userProfile.gender : 'male',
        address: userProfile.address ? userProfile.address : ''
      }}
      validationSchema={Yup.object().shape({
        address: Yup.string().max(255).required('Address is required')
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        let mobileNumber = phoneNumber
          ? phoneNumber
          : userProfile.mobile
          ? userProfile.mobile
          : '';

        if (isValidPhoneNumber(mobileNumber)) {
          const { gender, address, state } = values;

          const data = {
            gender,
            address,
            state,
            country,
            mobile: mobileNumber,
            profile_image: userProfile.profileImage
          };

          try {
            setPhoneNumberError(false);
            await dispatch(updateUserProfile(data));
            if (userProfile.isImageAdded && !userProfile.profileImage) {
              enqueueSnackbar(
                'Image Upload Failed!Please upload image of size less than 2 MB',
                {
                  variant: 'error'
                }
              );
            } else {
              setStatus({ success: true });
              enqueueSnackbar('Profile updated', {
                variant: 'success'
              });
              window.location.reload();
            }
          } catch (error) {
            setStatus({ success: false });
            setErrors({ submit: 'Invalid Inputs' });
          }
        } else {
          setPhoneNumberError(true);
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
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="Full Name"
                    name="fullName"
                    onBlur={handleBlur}
                    disabled
                    value={`${userInfo.firstName}${userInfo.lastName}`}
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
                    disabled
                    value={userInfo.email}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <PhoneInput
                    international
                    placeholder="Phone Number"
                    value={
                      userProfile.mobile ? userProfile.mobile : phoneNumber
                    }
                    onChange={setPhoneNumber}
                  />
                  {phoneNumberError && (
                    <span className={classes.error}>
                      Phone number is not valid
                    </span>
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <Typography variant="body2" color="textPrimary">
                      Gender
                    </Typography>
                    <div className={classes.genderDiv}>
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </div>
                  </RadioGroup>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    label="Full Address"
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Select State"
                    name="state"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.state}
                    variant="outlined"
                  >
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Select Country"
                    name="country"
                    onChange={handleCountryChange}
                    onBlur={handleBlur}
                    select
                    SelectProps={{ native: true }}
                    value={country}
                    variant="outlined"
                  >
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
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

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
