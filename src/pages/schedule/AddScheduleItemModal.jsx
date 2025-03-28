import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  CircularProgress,
  Grid,
  Box
} from '@mui/material';
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  dueDate: yup.date().required('Due date is required').min(new Date(), 'Due date must be in the future'),
  priority: yup.string().required('Priority is required'),
  discipline: yup.string(),
  documentReference: yup.string(),
  status: yup.string()
});

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' }
];

const disciplineOptions = [
  { value: 'architectural', label: 'Architectural' },
  { value: 'structural', label: 'Structural' },
  { value: 'mechanical', label: 'Mechanical' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'plumbing', label: 'Plumbing' }
];

const AddScheduleItemModal = ({ isOpen, onClose, projectId }) => {
  const { addScheduleItem } = useScheduleContext();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: null,
      priority: 'medium',
      discipline: '',
      documentReference: '',
      status: 'pending'
    }
  });

  const onSubmit = async (data) => {
    try {
      await addScheduleItem({ ...data, projectId });
      onClose();
      reset();
    } catch (error) {
      console.error('Error adding schedule item:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Schedule Item</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title *"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                    customInput={
                      <TextField
                        label="Due Date *"
                        fullWidth
                        error={!!errors.dueDate}
                        helperText={errors.dueDate?.message}
                      />
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Priority *</InputLabel>
                    <MuiSelect
                      {...field}
                      label="Priority *"
                      error={!!errors.priority}
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="critical">Critical</MenuItem>
                    </MuiSelect>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="discipline"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={disciplineOptions}
                    placeholder="Select Discipline"
                    isClearable
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="documentReference"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Document Reference"
                    fullWidth
                    error={!!errors.documentReference}
                    helperText={errors.documentReference?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Adding...' : 'Add Schedule Item'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddScheduleItemModal;