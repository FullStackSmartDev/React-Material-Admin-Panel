import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
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
  TextField,
  Typography,
  makeStyles,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';
import { updateUserProfileByAdmin } from 'src/actions/accountActions';
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

function ProfileSettings({ user, className, ...rest }) {
  const userProfile = user.userProfile;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [phoneNumber, setPhoneNumber] = useState(
    userProfile.mobile ? userProfile.mobile : ''
  );
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const country = userProfile.country ? userProfile.country : 'Canada';
  const countryOptions = getCountries();
  const stateOptions = getStates(country);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        state: userProfile.state ? userProfile.state : 'Alabama',
        country: country,
        gender: userProfile.gender ? userProfile.gender : 'male',
        address: userProfile.address ? userProfile.address : ''
      }}
      validationSchema={Yup.object().shape({
        address: Yup.string().max(255).required('Address is required')
      })}
      onSubmit={async (values, { setErrors, setStatus }) => {
        let mobileNumber = phoneNumber
          ? phoneNumber
          : user.mobile
          ? user.mobile
          : '';

        if (isValidPhoneNumber(mobileNumber)) {
          const { gender, address, state, country } = values;

          const data = {
            userId: user.id,
            gender,
            address,
            state,
            country,
            mobile: mobileNumber,
            profile_image: userProfile.profileImage
          };

          try {
            setPhoneNumberError(false);
            await dispatch(updateUserProfileByAdmin(data));
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
                  <PhoneInput
                    international
                    placeholder="Phone Number"
                    value={user.mobile ? user.mobile : phoneNumber}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    select
                    SelectProps={{ native: true }}
                    value={values.country}
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

ProfileSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default ProfileSettings;
