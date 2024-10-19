import React, { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Fab,
  Snackbar,
  IconButton
} from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import NavigationIcon from '@mui/icons-material/Navigation';
import templet from '../image/templet.jpg';
import { createJob } from '../../services/api';
import CloseIcon from '@mui/icons-material/Close';

function JobForm({ showForm }) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState([{ label: 'abc@gmail.com', value: 'NY' }]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChangeCities = (newValue) => {
    setSelectedCities(newValue);
  };

  const handleCreateCity = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptions((prevOptions) => [...prevOptions, newOption]);
    setSelectedCities((prevSelected) => [...prevSelected, newOption]);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectTemplate = (templateName) => {
    setSelectedTemplate(templateName);
    handleCloseModal();
  };

  const companyId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const handleSend = async () => {
    const candidateEmails = selectedCities.map(city => city.label);
    const data = {
      title: jobTitle,
      description: jobDescription,
      experience: experienceLevel,
      candidateEmails,
      companyId,
      endDate,
      templateName: selectedTemplate
    };

    try {
      const response = await createJob(data, token);
      if (response.status === 200) {
        setSnackbarMessage("Job successfully created!");
        setOpenSnackbar(true);
        setJobTitle('');
        setSelectedCities([]);
        setExperienceLevel('');
        setJobDescription('');
        setEndDate('');
        setSelectedTemplate('');
      }
    } catch (error) {
      setSnackbarMessage("Failed to create job. Please try again.");
      setOpenSnackbar(true);
      console.error(error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      <form className="flex flex-col gap-4 w-full">
        <div className="flex items-start gap-4">
          <label className="w-1/4">Job Title:</label>
          <TextField
            label="Enter Job Title"
            variant="outlined"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">Job Description:</label>
          <TextField
            label="Enter Job Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">Experience Level:</label>
          <TextField
            label="Select Experience Level"
            select
            variant="outlined"
            fullWidth
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <MenuItem value="1">Junior</MenuItem>
            <MenuItem value="2">Mid</MenuItem>
            <MenuItem value="3">Senior</MenuItem>
          </TextField>
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">Add Candidate:</label>
          <div className="w-full">
            <CreatableSelect
              isMulti
              value={selectedCities}
              onChange={handleChangeCities}
              onCreateOption={handleCreateCity}
              options={options}
              placeholder="Select or create cities"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">End Date:</label>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </form>
      <div className="flex justify-end items-end gap-5 mt-3">
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab variant="extended" size="medium" onClick={handleOpenModal}>
            <AttachEmailIcon sx={{ mr: 1 }} />
            Email Template
          </Fab>
          <Fab variant="extended" size="medium" color="primary" onClick={handleSend}>
            <NavigationIcon sx={{ mr: 1 }} />
            Send
          </Fab>
        </Box>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Select an Email Template</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button onClick={() => handleSelectTemplate('job')}>
              <img src={templet} alt="job" width="200" height="310" />
              job
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default JobForm;
