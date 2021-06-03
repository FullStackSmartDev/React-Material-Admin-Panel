import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  FormControlLabel,
  FormHelperText,
  Switch,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { Trash as TrashIcon } from 'react-feather';
import {createEvent,updateEvent} from 'src/actions/eventActions'

const useStyles = makeStyles((theme) => ({
  root: {},
  confirmButton: {
    marginLeft: theme.spacing(2)
  }
}));

function AddEditEventForm({
  event,
  mode,
  onAdd,
  onCancel,
  onDelete,
  onEdit,
  addEventSuccess,
  deleteEvent
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch=useDispatch();

  return (
    <Formik
      initialValues={{
        allDay: event.allDay || false,
        color: event.color || '',
        description: event.description || '',
        end: event.end ||  moment(),
        start: event.start || moment(),
        title: event.title || ''
      }}
      validationSchema={Yup.object().shape({
        allDay: Yup.bool(),
        description: Yup.string().max(5000),
        end: Yup.date()
          .when(
            'start',
            (start, schema) => (start && schema.min(start, 'End date must be later than start date')),
          ),
        start: Yup.date(),
        title: Yup.string().max(255).required('Title is required')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          let data = {
            title:values.title,
            description:values.description,
            startTime:moment(values.start).format("YYYY-MM-DD hh:mm:ss"),
            endTime:moment(values.end).format("YYYY-MM-DD hh:mm:ss")
          };

          if(mode==='edit'){
            data={
              ...data,
              eventId:event.id
            }
            await dispatch(updateEvent(data));
          }
          else{
            await dispatch(createEvent(data));
          }

          enqueueSnackbar('Event created successfully', {
            variant: 'success'
        });
        addEventSuccess();
        } catch (error) {
          const message = error || 'Something went wrong';
          enqueueSnackbar(message, {
            variant: 'error'
        });
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldTouched,
        setFieldValue,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
              color="textPrimary"
            >
              {mode === 'add' ? 'Add Event' : 'Edit Event'}
            </Typography>
          </Box>
          <Box p={3}>
            <TextField
              error={Boolean(touched.title && errors.title)}
              fullWidth
              helperText={touched.title && errors.title}
              label="Title"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              variant="outlined"
            />
            <Box mt={2}>
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label="Description"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                variant="outlined"
              />
            </Box>
            <Box mt={2}>
              <DateTimePicker
                fullWidth
                inputVariant="outlined"
                label="Start date"
                name="start"
                onClick={() => setFieldTouched('end')}
                onChange={(date) => setFieldValue('start', date)}
                value={values.start}
              />
            </Box>
            <Box mt={2}>
              <DateTimePicker
                fullWidth
                inputVariant="outlined"
                label="End date"
                name="end"
                onClick={() => setFieldTouched('end')}
                onChange={(date) => setFieldValue('end', date)}
                value={values.end}
              />
            </Box>
            {Boolean(touched.end && errors.end) && (
              <Box mt={2}>
                <FormHelperText error>
                  {errors.end}
                </FormHelperText>
              </Box>
            )}
          </Box>
          <Divider />
          <Box
            p={2}
            display="flex"
            alignItems="center"
          >
            {mode === 'edit' && (
              <IconButton onClick={() => deleteEvent(event.id)}>
                <SvgIcon>
                  <TrashIcon  />
                </SvgIcon>
              </IconButton>
            )}
            <Box flexGrow={1} />
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="secondary"
              className={classes.confirmButton}
            >
              Confirm
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

AddEditEventForm.propTypes = {
  event: PropTypes.object,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  addEventSuccess:PropTypes.func,
  deleteEvent:PropTypes.func.isRequired
};

AddEditEventForm.defaultProps = {
  event: {},
  onAdd: () => {},
  onCancel: () => {},
  onDelete: () => {},
  onEdit: () => {}
};

export default AddEditEventForm;
