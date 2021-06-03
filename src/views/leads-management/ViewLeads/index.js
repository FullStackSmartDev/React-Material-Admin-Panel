import React, { useEffect } from 'react';
import MUIDataTable from "mui-datatables";

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

// lib docs: https://www.npmjs.com/package/mui-datatables

const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "fname",
    label: "First Name",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "lname",
    label: "Last Name",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "companyName",
    label: "Company Name",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "phone",
    label: "Phone",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "address",
    label: "Address",
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: "city",
    label: "City",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "bigCity",
    label: "Big City",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "state",
    label: "State",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "zip",
    label: "Zip",
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: "website",
    label: "Website",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "source",
    label: "Source",
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: "twitterURl",
    label: "Twitter URl",
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: "facebookUrl",
    label: "Facebook Url",
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: "linkedInUrl",
    label: "LinkedIn Url",
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
];

const RowData = [
  {
    id: 1,
    industry : "HVAC",
    fname : "Joe",
    lname : "James",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "joe.james@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    bigCity : "Montreal",
    state: "QC",
    zip: "H4B1Z5",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Raw",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 2,
    industry : "Electrician",
    fname : "John",
    lname : "Walsh",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "john.walsh@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Raw",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 3,
    industry : "Painting",
    fname : "Bob",
    lname : "Herm",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "bob.herm@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Raw",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 4,
    industry : "Carpet Cleaning",
    fname : "James",
    lname : "Houston",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "james.houston@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Ottawa",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Raw",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
];
const RowData2 = RowData;
const RowData3 = RowData2.concat(RowData2);
const RowData4 = RowData2.concat(RowData3);
const RowData5 = RowData3.concat(RowData4);
const RowData6 = RowData4.concat(RowData5);

const Assigned = [
  {
    id: 1,
    industry : "HVAC",
    fname : "Joe",
    lname : "James",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "joe.james@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    bigCity : "Montreal",
    state: "QC",
    zip: "H4B1Z5",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 2,
    industry : "Electrician",
    fname : "John",
    lname : "Walsh",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "john.walsh@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 3,
    industry : "Painting",
    fname : "Bob",
    lname : "Herm",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "bob.herm@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 4,
    industry : "Carpet Cleaning",
    fname : "James",
    lname : "Houston",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "james.houston@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Ottawa",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
];
const Assigned2 = Assigned;
const Assigned3 = RowData2.concat(Assigned2);
const Assigned4 = RowData2.concat(Assigned3);
const Assigned5 = RowData3.concat(Assigned4);
const Assigned6 = RowData4.concat(Assigned5);

const Working = [
  {
    id: 1,
    industry : "HVAC",
    fname : "Joe",
    lname : "James",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "joe.james@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    bigCity : "Montreal",
    state: "QC",
    zip: "H4B1Z5",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 2,
    industry : "Electrician",
    fname : "John",
    lname : "Walsh",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "john.walsh@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 3,
    industry : "Painting",
    fname : "Bob",
    lname : "Herm",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "bob.herm@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 4,
    industry : "Carpet Cleaning",
    fname : "James",
    lname : "Houston",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "james.houston@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Ottawa",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
];
const Working2 = Working;
const Working3 = Working2.concat(Working2);
const Working4 = Working2.concat(Working3);
const Working5 = Working3.concat(Working4);
const Working6 = Working4.concat(Working5);

const Qualified = [
  {
    id: 1,
    industry : "HVAC",
    fname : "Joe",
    lname : "James",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "joe.james@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    bigCity : "Montreal",
    state: "QC",
    zip: "H4B1Z5",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 2,
    industry : "Electrician",
    fname : "John",
    lname : "Walsh",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "john.walsh@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 3,
    industry : "Painting",
    fname : "Bob",
    lname : "Herm",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "bob.herm@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 4,
    industry : "Carpet Cleaning",
    fname : "James",
    lname : "Houston",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "james.houston@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Ottawa",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
];
const Qualified2 = Qualified;
const Qualified3 = Working2.concat(Qualified2);
const Qualified4 = Working2.concat(Qualified3);
const Qualified5 = Working3.concat(Qualified4);
const Qualified6 = Working4.concat(Qualified5);

const Nurture = [
  {
    id: 1,
    industry : "HVAC",
    fname : "Joe",
    lname : "James",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "joe.james@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    bigCity : "Montreal",
    state: "QC",
    zip: "H4B1Z5",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 2,
    industry : "Electrician",
    fname : "John",
    lname : "Walsh",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "john.walsh@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 3,
    industry : "Painting",
    fname : "Bob",
    lname : "Herm",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "bob.herm@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 4,
    industry : "Carpet Cleaning",
    fname : "James",
    lname : "Houston",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "james.houston@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Ottawa",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
];
const Nurture2 = Nurture;
const Nurture3 = Working2.concat(Nurture2);
const Nurture4 = Working2.concat(Nurture3);
const Nurture5 = Working3.concat(Nurture4);
const Nurture6 = Working4.concat(Nurture5);

const Unqualified = [
  {
    id: 1,
    industry : "HVAC",
    fname : "Joe",
    lname : "James",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "joe.james@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    bigCity : "Montreal",
    state: "QC",
    zip: "H4B1Z5",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 2,
    industry : "Electrician",
    fname : "John",
    lname : "Walsh",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "john.walsh@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 3,
    industry : "Painting",
    fname : "Bob",
    lname : "Herm",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "bob.herm@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Montreal",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
  {
    id: 4,
    industry : "Carpet Cleaning",
    fname : "James",
    lname : "Houston",
    companyName : "Test Corp",
    phone : "+15145719094",
    email : "james.houston@testcorp.com",
    address : "26 Avenue Hudsone",
    city: "Mont-Royal",
    state: "QC",
    zip: "H4B1Z5",
    bigCity : "Ottawa",
    website: "testcorp.com",
    source: "Yellow Pages",
    status: "Assigned",
    twitterURl : "",
    facebookUrl : "",
    linkedInUrl : "",
  },
];
const Unqualified2 = Unqualified;
const Unqualified3 = Working2.concat(Unqualified2);
const Unqualified4 = Working2.concat(Unqualified3);
const Unqualified5 = Working3.concat(Unqualified4);
const Unqualified6 = Working4.concat(Unqualified5);


const options = {
  filterType: 'dropdown',
  rowsPerPage: 25,
  rowsPerPageOptions: [10,25,50,75,100,125,150,175,200,225,250,275,300],
  fixedHeader: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(6),
    '& dt': {
      marginTop: theme.spacing(2)
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

const statuses = [
  'Raw',
  'Assigned',
  'Working',
  'Qualified',
  'Nurture',
  'Unqualified',
];

const ViewLeads = () => {
  const classes = useStyles();
  const [leadStatus, setLeadStatus] = React.useState([]);

  const handleChange = (event) => {
    setLeadStatus(event.target.value);
  };

  useEffect(() => {
    console.log(leadStatus);
  }, [leadStatus]);

  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <FormControl className={classes.formControl} style={{width: '100%', maxWidth: '400px'}}>
          <InputLabel id="demo-mutiple-checkbox-label">Select Leads Status</InputLabel>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={leadStatus}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                <Checkbox checked={leadStatus.indexOf(status) > -1} />
                <ListItemText primary={status} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      { leadStatus.length > 0
        ? (
        <MUIDataTable
          title={"Leads View"}
          data={RowData6}
          columns={columns}
          options={options}
        />
        ) : ('')}
    </div>
  );
};

export default ViewLeads;
