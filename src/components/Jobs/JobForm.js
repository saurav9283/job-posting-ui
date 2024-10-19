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
  Fab
} from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import NavigationIcon from '@mui/icons-material/Navigation';
import templet from '../image/templet.jpg';

function JobForm() {
  const [selectedCities, setSelectedCities] = useState([]);
  const [options, setOptions] = useState([{ label: 'abc@gmail.com', value: 'NY' }]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleChange = (newValue) => {
    setSelectedCities(newValue);
  };

  const handleCreate = (inputValue) => {
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

    fetch('/api/send-template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ templateName })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Template sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending template:', error);
      });
  };

  return (
    <>
      <form className="flex flex-col gap-4 w-[100%]">
        <div className="flex items-start gap-4">
          <label className="w-1/4">Job Title:</label>
          <TextField label="Enter Job Title" variant="outlined" fullWidth />
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">Job Description:</label>
          <TextField
            label="Enter Job Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">Experience Level:</label>
          <TextField
            label="Select Experience Level"
            select
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Mid">Mid</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
          </TextField>
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">Add Candidate:</label>
          <div className="w-full">
            <CreatableSelect
              isMulti
              value={selectedCities}
              onChange={handleChange}
              onCreateOption={handleCreate}
              options={options}
              placeholder="Select or create cities"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4 ">End Date:</label>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </div>
      </form>
      <div className="flex justify-end items-end gap-5 mt-3">
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab variant="extended" size="medium" onClick={handleOpenModal}>
            <AttachEmailIcon sx={{ mr: 1 }} />
            Email Template
          </Fab>
          <Fab variant="extended" size="medium" color="primary">
            <NavigationIcon sx={{ mr: 1 }} />
            Send
          </Fab>
        </Box>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Select an Email Template</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button onClick={() => handleSelectTemplate('Template 1')}>
              <img src={templet} alt="Template 1" width="200" height="3100"/>
              Template 1
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
