import React from 'react';
import {
  Box, Grid,
  makeStyles, useTheme,
  Divider, FilledInput, TextField,
  FormControl, InputLabel, Select,
  Input, Button,
  MenuItem
} from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 25,
    marginLeft: 25,
    padding: 25,
  },
  boxStyle: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 25,
    backgroundColor: theme.palette.background.default,
    borderRadius: 5,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
  },
  boxHeading: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    textTransformation: 'uppercase',
    fontSize: '11pt',
    marginBottom: '5px'
  },
  hr: {
    background: 'none',
    border: `1px solid ${theme.palette.split}`,
    opacity: 0.2
  },
  textField: {
    width: '100%',
    marginTop: 20
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const countriesArr = [
  'United States',
  'Canada'
];

const provinceStateArr = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',

  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',

  'American Samoa',
  'District of Columbia',
  'Federated States of Micronesia',
  'Guam',
  'Marshall Islands',
  'Northern Mariana Islands',
  'Palau',
  'Puerto Rico',
  'Virgin Islands',
];

const PaymentTerminalView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // Country
  const [country, setCountry] = React.useState('');
  const [openCountry, setOpenCountry] = React.useState(false);
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleCountryClose = () => {
    setOpenCountry(false);
  };
  const handleCountryOpen = () => {
    setOpenCountry(true);
  };

  // Province / State
  const [provinceState, setProvinceState] = React.useState('');
  const [openProvinceState, setOpenProvinceState] = React.useState(false);
  const handleProvinceStateChange = (event) => {
    setProvinceState(event.target.value);
  };
  const handleProvinceStateClose = () => {
    setOpenProvinceState(false);
  };
  const handleProvinceStateOpen = () => {
    setOpenProvinceState(true);
  };

  const [cardNumber, setCardNumber] = React.useState('');
  const handleCardNumberChange = (e) => {
    const res = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    if (res.length < 20) setCardNumber(res);
  };

  const [expirationDate, setExpirationDate] = React.useState('');
  const handleExpirationDateChange = (e) => {
    const res = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1/').trim();
    if (res.length < 7) setExpirationDate(res);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box className={classes.boxStyle}>
            <h2 className={classes.boxHeading}>BILLING DETAILS</h2>
            <Divider />
            <TextField
              className={classes.textField}
              error={false}
              label="First name"
              required
              helperText="" // Incorrect entry.
            />
            <TextField
              className={classes.textField}
              error={false}
              label="Last name"
              required
              helperText="" // Incorrect entry.
            />
            <TextField
              className={classes.textField}
              error={false}
              label="Company name"
              helperText="" // Incorrect entry.
            />
            <TextField
              className={classes.textField}
              error={false}
              label="Street address"
              required
              placeholder="House number and street name"
              helperText="" // Incorrect entry.
            />
            <TextField
              className={classes.textField}
              error={false}
              label="Apartment, suite, unit"
              placeholder="Apartment, suite, unit, etc. (optional)"
              helperText="" // Incorrect entry.
            />
            <TextField
              className={classes.textField}
              error={false}
              label="Town / City"
              required
              helperText="" // Incorrect entry.
            />
            <FormControl className={classes.formControl} style={{ width: '100%', marginLeft: 0 }}>
              <InputLabel
                error={false}
                id="country-controlled-open-select-label"
                required
              >
                Country
              </InputLabel>
              <Select
                labelId="country-controlled-open-select-label"
                id="country-controlled-open-select"
                open={openCountry}
                onClose={handleCountryClose}
                onOpen={handleCountryOpen}
                value={country}
                onChange={handleCountryChange}
              >
                {/* eslint-disable-next-line max-len,react/no-array-index-key */}
                {countriesArr.map((name, key) => <MenuItem value={name} key={key}>{name}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl} style={{ width: '100%', marginLeft: 0 }}>
              <InputLabel
                error={false}
                id="province-state-controlled-open-select-label"
                required
              >
                Province / State
              </InputLabel>
              <Select
                labelId="province-state-controlled-open-select-label"
                id="province-state-controlled-open-select"
                open={openProvinceState}
                onClose={handleProvinceStateClose}
                onOpen={handleProvinceStateOpen}
                value={provinceState}
                onChange={handleProvinceStateChange}
              >
                {/* eslint-disable-next-line react/no-array-index-key,max-len */}
                {provinceStateArr.map((name, key) => <MenuItem value={name} key={key}>{name}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              className={classes.textField}
              error={false}
              label="Postal code"
              required
              helperText="" // Incorrect entry.
            />
            <TextField
              className={classes.textField}
              error={false}
              label="Phone"
              required
              helperText="" // Incorrect entry.
            />
            <TextField
              className={classes.textField}
              error={false}
              label="Email"
              required
              helperText="" // Incorrect entry.
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box className={classes.boxStyle}>
            <h2 className={classes.boxHeading}>PRODUCT DETAILS</h2>
            <Divider />
            <TextField
              className={classes.textField}
              error={false}
              label="Order notes (optional)"
              placeholder=""
              helperText="" // Incorrect entry.
              multiline
              rows={4}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box className={classes.boxStyle}>
            <h2 className={classes.boxHeading}>CREDIT CARD INFORMATION</h2>
            <Divider />
            <TextField
              className={classes.textField}
              error={false}
              label="Card Number"
              required
              value={cardNumber}
              placeholder="**** **** **** ****"
              onChange={handleCardNumberChange}
              helperText="" // Incorrect entry.
              autoComplete="cc-number"
              autoCorrect="no"
              autoCapitalize="no"
              spellCheck="no"
            />
            <TextField
              className={classes.textField}
              error={false}
              label="Expiration (MM/YY)"
              required

              placeholder="MM / YY"
              helperText="" // Incorrect entry.
              autoComplete="cc-exp"
              autoCorrect="no"
              autoCapitalize="no"
              spellCheck="no"
              value={expirationDate}
              onChange={handleExpirationDateChange}
            />
            <TextField
              className={classes.textField}
              error={false}
              label="Card Security Code"
              required

              placeholder="CSC"
              helperText="" // Incorrect entry.
              autoComplete="off"
              autoCorrect="no"
              autoCapitalize="no"
              spellCheck="no"
              type="number"
            />
            <Divider />
            <br />
            <div style={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" className={classes.button}>
                Submit order
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentTerminalView;
