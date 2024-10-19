import React, { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Person, Phone, Business, Email } from '@mui/icons-material';
import logo from '../image/logo.png';
import GroupsIcon from '@mui/icons-material/Groups';
import axios from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { registerCompany, verifyEmailOtp, verifyMobileOtp } from '../../services/api';


function Navbar() {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8" />
      </div>
      <div className="text-black text-lg font-semibold mr-[10%]">
        Contact
      </div>
    </div>
  );
}

function Register() {
  // State variables for form inputs and OTP management
  const [name, setName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setCompanyEmail] = useState('');
  const [employeeCount, setCompanySize] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);
  const [isMobileOtpVerified, setIsMobileOtpVerified] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await registerCompany({
        name,
        phone,
        companyName,
        email,
        employeeCount,
      })
      console.log(response)
      localStorage.setItem("id", response.data._id)

      if (response.status === 201) {
        setIsOtpVisible(true);
      }
    } catch (error) {
      console.error('Error during API call:', error);
      setError('There was an error during registration. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const id = localStorage.getItem("id")
  
    try {
      // Verify email OTP if not already verified
      if (!isEmailOtpVerified) {
        const emailResponse = await verifyEmailOtp({ id,emailOtp });
  
        if (emailResponse.status === 200 ) {
          setIsEmailOtpVerified(true);
        } else {
          setError('Invalid Email OTP. Please try again.');
          return;
        }
      }
  
      // Verify mobile OTP if not already verified
      if (!isMobileOtpVerified) {
        const mobileResponse = await verifyMobileOtp({id, mobileOtp });
  
        if (mobileResponse.status === 200 && mobileResponse.data.mobileOtpVerified) {
          setIsMobileOtpVerified(true);
        } else {
          setError('Invalid Mobile OTP. Please try again.');
          return;
        }
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setError('There was an error during OTP verification. Please try again.');
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center mt-4 mx-4">
        <div className="md:max-w-[40%] md:ml-[5%] mb-6 md:mb-0">
          <p className="text-center md:text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
        <div className="flex items-center justify-center w-full md:w-[70%]">
          {!isOtpVisible ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
              <div className="flex flex-col justify-center items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Sign Up</h2>
                <p className="text-center text-sm">Lorem Ipsum is simply dummy text</p>
              </div>
              <div className="flex flex-col space-y-2">
                <TextField
                  variant="outlined"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  className="w-full bg-[#f4f4f4]"
                />
                <TextField
                  variant="outlined"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                  className="w-full bg-[#f4f4f4]"
                />
                <TextField
                  variant="outlined"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business />
                      </InputAdornment>
                    ),
                  }}
                  className="w-full bg-[#f4f4f4]"
                />
                <TextField
                  variant="outlined"
                  placeholder="Company Email"
                  value={email}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  className="w-full bg-[#f4f4f4]"
                />
                <TextField
                  variant="outlined"
                  placeholder="Company Size"
                  value={employeeCount}
                  onChange={(e) => setCompanySize(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupsIcon />
                      </InputAdornment>
                    ),
                  }}
                  className="w-full bg-[#f4f4f4]"
                />
                <div className="flex flex-col justify-center items-center">
                  <p className="text-center">By clicking on proceed you will accept our</p>
                  <p className="text-blue-700">Terms & Conditions</p>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Proceed
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
              <div className="flex flex-col justify-center items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Sign Up</h2>
                <p className="text-center">Lorem Ipsum is simply dummy text</p>
              </div>
              <div className='mb-5'>
                <TextField
                  variant="outlined"
                  placeholder="Email OTP"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="w-full bg-[#f4f4f4]"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                    endAdornment: isEmailOtpVerified && (
                      <InputAdornment position="end">
                        <CheckCircleIcon style={{ color: 'green' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                {!isEmailOtpVerified && (
                  <button
                    type="submit"
                    className="w-full py-2 px-4 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Verify OTP
                  </button>
                )}
              </div>
              <div className='mb-5'>
                <TextField
                  variant="outlined"
                  placeholder="Mobile OTP"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                  className="w-full bg-[#f4f4f4]"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SendToMobileIcon />
                      </InputAdornment>
                    ),
                    endAdornment: isMobileOtpVerified && (
                      <InputAdornment position="end">
                        <CheckCircleIcon style={{ color: 'green' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                {!isMobileOtpVerified && (
                  <button
                    type="submit"
                    className="w-full py-2 mt-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Verify OTP
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
