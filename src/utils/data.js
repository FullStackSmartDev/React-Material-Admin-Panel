import countries from './countries';

const userRoles = [
  { value: 'lead_generator', label: 'Lead Generator' },
  { value: 'client_care_specialist', label: 'Client Care Specialist' },
  { value: 'call_center_agent', label: 'Call Center Agent' },
  { value: 'customer_service_agent', label: 'Customer Service Agent' },
  { value: 'sales_representative', label: 'Sales Representative' },
  { value: 'sales_manager', label: 'Sales Manager' },
  { value: 'call_agent_supervisor', label: 'Call Agent Supervisor' }
];
const getCountries = () => {
  let result = [];
  countries.map(el => {
    result.push(el.country);
  });
  return result;
};
const getStates = selectedCountry => {
  let result = [];
  if (selectedCountry) {
    countries.map(el => {
      if (el.country === selectedCountry) {
        result = [...el.states]
      }
    });
  } else {
    countries.map(el => {
      if (el.country === 'Canada') {
        result = [...el.states];
      }
    });
  }
  return result;
};
const industryOptions = [
  'HVAC',
  'Roofing',
  'Electrician',
  'Garage Door',
  'Moving',
  'Painting',
  'Pool Services',
  'Carpet Cleaning',
  'Landscaping',
  'Roofing',
  'Plumbing',
  'Realtor',
  'Locksmith',
  'Handyman',
  'Appliance Repair',
  'Window Cleaning',
  'Flooring',
  'Kitchen Installation'
];

const sampleCsvData=[["firstName","lastName","email","phoneNumber","gender","industry","streetAddress","unitNumber","city","state","country","companyName","companyEmail","websiteUrl","companyNumber","companyStreetAddress","companyUnitNumber","companyCity","companyState","companyCountry","companyZipCode","facebookUrl","twitterUrl","linkedinUrl"],
  ["Amaan","Salheen","asalheen1108@gmail.com","+919773113602","male","HVAC","Flat No. C-32","21","Bangalore","Karnataka","India","biramedia","biramedia@gmail.com","biramedia.com","+918877889909","BTM,Bangalore","","Bangalore","Karnataka","India","https://www.facebook.com/amaan.salheen","https://twitter.com","https://linked.com"]
]
export { userRoles, getStates, getCountries, industryOptions , sampleCsvData };

