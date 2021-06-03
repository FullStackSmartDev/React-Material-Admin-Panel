import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import { get } from 'lodash';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
	makeStyles,
	FormControlLabel,
	Radio,
	RadioGroup,
	Checkbox
} from '@material-ui/core';
import { useHistory } from 'react-router';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { industryOptions, getCountries, getStates } from 'src/utils/data';
import { createLead } from 'src/actions/leadActions';

const useStyles = makeStyles((theme) => ({
	root: {},
	card: {
		marginTop: theme.spacing(3)
	},
	title: {
		marginBottom: theme.spacing(2),
		fontWeight: 'bold'
	},
	error: {
		fontSize: 14,
		color: 'red',
		paddingLeft: 40
	},
	alignCenter: {
		textAlign: 'center'
	},
	checkbox: {
		margin: theme.spacing(1)
	}
}));

const LeadsCreateForm = ({ className, ...rest }) => {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const user = useSelector((state) => state.account.user);
	let userInfo = {};
	if (user && Object.keys(user).length > 0) {
		userInfo = get(user, 'data', {});
	}

	const countryOptions = getCountries();
	const dispatch = useDispatch();
	const history = useHistory();

	const [ phoneNumber, setPhoneNumber ] = useState({
		value: '',
		error: false
	});
	const [ companyPhoneNumber, setCompanyPhoneNumber ] = useState({
		value: '',
		error: false
	});
	const [ country, setCountry ] = useState('Canada');
	const [ companyCountry, setCompanyCountry ] = useState('Canada');
	const [ isSubmitted, setSubmitted ] = useState(false);
	const [ isCompanyDetails, setCompanyDetails ] = useState(true);

	const stateOptions = getStates(country);
	const companyStateOptions = getStates(companyCountry);

	const handleCountryChange = (event) => {
		const selectedCountry = event.target.value;
		setCountry(selectedCountry);
	};

	const handleCompanyCountryChange = (event) => {
		const selectedCountry = event.target.value;
		setCompanyCountry(selectedCountry);
	};
	const handlePhoneNumberChange = (value) => {
		if (isValidPhoneNumber(value)) {
			setPhoneNumber({
				value: value,
				error: false
			});
		} else {
			setPhoneNumber({
				value: value,
				error: TextTrackCue
			});
		}
	};
	const handleCompanyPhoneNumber = (value) => {
		if (isValidPhoneNumber(value)) {
			setCompanyPhoneNumber({
				value: value,
				error: false
			});
		} else {
			setCompanyPhoneNumber({
				...companyPhoneNumber,
				error: true
			});
		}
	};
	return (
		<Formik
			enableReinitialize
			initialValues={{
				gender: 'male',
				industry: 'HVAC',
				country: 'Canada',
				companyCountry: 'Canada',
				state: 'Alberta',
				companyState: 'Alberta',
			}}
			validationSchema={Yup.object().shape({
				firstName: Yup.string().max(255).required('First Name is required'),
				lastName: Yup.string().max(255).required('Last Name is required'),
				email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
				gender: Yup.string().required(),
				industry: Yup.string().required('Industry is required'),
				streetAddress: Yup.string().required('Address is required'),
				city: Yup.string().required('City is required'),
				zipCode: Yup.string().required('Zip is required')
			})}
			onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
				setSubmitted(true);
				let data = {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					phoneNumber: phoneNumber.value,
					gender: values.gender,
					industry: values.industry,
					streetAddress: values.streetAddress,
					unitNumber: values.unitNumber ? values.unitNumber : '',
					state: values.state,
					country: country,
					city:values.city,
					zipCode:values.zipCode,
					role: userInfo.role ? userInfo.role : '',
					createdBy: userInfo.email
				};
				if (isCompanyDetails) {
					data = {
						...data,
						companyName: values.companyName,
						companyEmail: values.companyEmail,
						websiteUrl: values.companyUrl,
						companyNumber: companyPhoneNumber.value,
						companyStreetAddress: values.companyStreetAddress,
						companyUnitAddress: values.companyUnitAddress ? values.companyUnitAddress : '',
						companyCity: values.companyCity ? values.companyCity : '',
						companyState: values.companyState,
						companyCountry: companyCountry,
						companyZipCode:values.companyZipCode,
						facebookUrl: values.companyFacebookUrl,
						twitterUrl: values.companyTwitterUrl,
						linkedinUrl: values.companyLinkedInUrl
					};
				}

				try {
					if (!phoneNumber.error && !companyPhoneNumber.error) {
						await dispatch(createLead(data));
						history.push('/app/management/leads');
					}
				} catch (err) {
					const error = err || 'Something went wrong';
					enqueueSnackbar(error, {
						variant: 'error'
					});
				}
			}}
		>
			{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
				<form className={clsx(classes.root, className)} onSubmit={handleSubmit} {...rest}>
					<Card className={classes.card}>
						<CardContent>
							<Typography className={classes.title}>Basic Info</Typography>
							<Grid container spacing={5}>
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
										required
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
										required
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										error={Boolean(touched.email && errors.email)}
										fullWidth
										helperText={touched.email && errors.email}
										label="Email"
										name="email"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.email}
										variant="outlined"
										required
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<PhoneInput
										international
										placeholder="Phone Number"
										onChange={handlePhoneNumberChange}
										value={phoneNumber.value ? phoneNumber.value : ''}
									/>
									{isSubmitted &&
									phoneNumber.error && (
										<span className={classes.error}>Phone number is not valid</span>
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
											<FormControlLabel value="female" control={<Radio />} label="Female" />
											<FormControlLabel value="male" control={<Radio />} label="Male" />
											<FormControlLabel value="other" control={<Radio />} label="Other" />
										</div>
									</RadioGroup>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Industry Name"
										name="industry"
										onChange={handleChange}
										onBlur={handleBlur}
										select
										SelectProps={{ native: true }}
										value={values.industry}
										variant="outlined"
									>
										{industryOptions.map((industry) => (
											<option key={industry} value={industry}>
												{industry}
											</option>
										))}
									</TextField>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										error={Boolean(touched.streetAddress && errors.streetAddress)}
										fullWidth
										helperText={touched.streetAddress && errors.streetAddress}
										label="Street Address"
										name="streetAddress"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.streetAddress}
										variant="outlined"
										required
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										error={Boolean(touched.unitNumber && errors.unitNumber)}
										fullWidth
										helperText={touched.unitNumber && errors.unitNumber}
										label="Unit Number"
										name="unitNumber"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.unitNumber}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Select Country"
										name="country"
										onBlur={handleBlur}
										select
										SelectProps={{ native: true }}
										onChange={handleCountryChange}
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
										error={Boolean(touched.city && errors.city)}
										fullWidth
										helperText={touched.city && errors.city}
										label="City"
										name="city"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.city}
										variant="outlined"
										required
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										type="number"
										error={Boolean(touched.zipCode && errors.zipCode)}
										fullWidth
										helperText={touched.zipCode && errors.zipCode}
										label="Zip Code"
										name="zipCode"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.zipCode}
										variant="outlined"
										required
									/>
								</Grid>
							</Grid>
						</CardContent>
						<FormControlLabel
							control={
								<Checkbox
									checked={isCompanyDetails}
									onChange={(event) => {
										setCompanyDetails(event.target.checked);
									}}
									name="isCompanyDetails"
									color="primary"
								/>
							}
							label="Do you have any company details"
							className={classes.checkbox}
						/>
					</Card>
					{isCompanyDetails && (
						<Card>
							<CardContent>
								<Typography className={classes.title}>Company Info</Typography>
								<Grid container spacing={5}>
									<Grid item md={6} xs={12}>
										<TextField
											error={Boolean(touched.companyName && errors.companyName)}
											fullWidth
											helperText={touched.companyName && errors.companyName}
											label="Company Name"
											name="companyName"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.companyName}
											variant="outlined"
											required
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											error={Boolean(touched.companyEmail && errors.companyEmail)}
											fullWidth
											helperText={touched.companyEmail && errors.companyEmail}
											label="Company Email"
											name="companyEmail"
											onBlur={handleBlur}
											onChange={handleChange}
											// required
											value={values.companyEmail}
											variant="outlined"
											required
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											error={Boolean(touched.companyUrl && errors.companyUrl)}
											fullWidth
											helperText={touched.companyUrl && errors.companyUrl}
											label="Company Website URL"
											name="companyUrl"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.companyUrl}
											variant="outlined"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<PhoneInput
											international
											placeholder="Phone Number"
											onChange={handleCompanyPhoneNumber}
											value={companyPhoneNumber.value ? companyPhoneNumber.value : ''}
										/>
										{isSubmitted &&
										companyPhoneNumber.error && (
											<span className={classes.error}>Company Phone number is not valid</span>
										)}
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											error={Boolean(touched.companyStreetAddress && errors.companyStreetAddress)}
											fullWidth
											helperText={touched.companyStreetAddress && errors.companyStreetAddress}
											label="Company Street Address"
											name="companyStreetAddress"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.companyStreetAddress}
											variant="outlined"
											required
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											error={Boolean(touched.companyUnitNumber && errors.companyUnitNumber)}
											fullWidth
											helperText={touched.companyUnitNumber && errors.companyUnitNumber}
											label="Company Unit Number"
											name="companyUnitNumber"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.companyUnitNumber}
											variant="outlined"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Select Country"
											name="companyCountry"
											onBlur={handleBlur}
											select
											SelectProps={{ native: true }}
											onChange={handleCompanyCountryChange}
											value={companyCountry}
											variant="outlined"
										>
											{countryOptions.map((country) => (
												<option key={country} value={country}>
													{country}
												</option>
											))}
										</TextField>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Select State"
											name="companyState"
											onChange={handleChange}
											select
											SelectProps={{ native: true }}
											value={values.companyState}
											variant="outlined"
										>
											{companyStateOptions.map((state) => (
												<option key={state} value={state}>
													{state}
												</option>
											))}
										</TextField>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											error={Boolean(touched.companyCity && errors.companyCity)}
											fullWidth
											helperText={touched.companyCity && errors.companyCity}
											label="Company City"
											name="companyCity"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.companyCity}
											variant="outlined"
											required
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											type="number"
											error={Boolean(touched.companyZipCode && errors.companyZipCode)}
											fullWidth
											helperText={touched.companyZipCode && errors.companyZipCode}
											label="Company Zip Code"
											name="companyZipCode"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.companyZipCode}
											variant="outlined"
											required
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											error={Boolean(touched.companyFacebookUrl && errors.companyFacebookUrl)}
											fullWidth
											helperText={touched.companyFacebookUrl && errors.companyFacebookUrl}
											label="Company Facebook URL"
											name="companyFacebookUrl"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.companyFacebookUrl}
											variant="outlined"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											error={Boolean(touched.companyTwitterUrl && errors.companyTwitterUrl)}
											fullWidth
											helperText={touched.companyTwitterUrl && errors.companyTwitterUrl}
											label="Company Twitter URL"
											name="companyTwitterUrl"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.companyTwitterUrl}
											variant="outlined"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											error={Boolean(touched.companyLinkedInUrl && errors.companyLinkedInUrl)}
											fullWidth
											helperText={touched.companyLinkedInUrl && errors.companyLinkedInUrl}
											label="Company Linked In URL"
											name="companyLinkedInUrl"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.companyLinkedInUrl}
											variant="outlined"
										/>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					)}
					<Box mt={2}>
						<Button variant="contained" color="secondary" type="submit">
							Create Lead
						</Button>
					</Box>
				</form>
			)}
		</Formik>
	);
};
export default LeadsCreateForm;
