import { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Form() {
    //States for registration
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [address, setAddress] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    //const [status, setStatus] = useState(false);

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    //JOSEPH ADD THE EVENT HANDLERS FOR PHONE NUMBER AND CONFIRM PASSWORD
    // Handling the first name change
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        setSubmitted(false);
    };

    // Handling the last name change
    const handleLastName = (e) => {
        setLastName(e.target.value);
        setSubmitted(false);
    }
    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the phone number change
    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the confirm password change
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the address change
    const handleAddress = (e) => {
      setAddress(e.target.value);
      setSubmitted(false);
  };

    //promotion check box handler (need to add functionality of sending promotions to users email)
    const handlePromotion = () => {
      setIsChecked(!isChecked);
    };

    // Handing Password Visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Handling the status change
    

    // Handling the form submission
    // ADD email verification into submit handler if successful
    // Transfer the data from the form into the database if it is complete
    // ADD THE CORRECT CHANGES TO HANDLE SUBMIT OF FIRST NAME, LAST NAME, AND ADDRESS
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add address to check later (we will be adding billing address in registration)
        if (firstName === "" || lastName === "" || email === "" || password === "" || phoneNumber === "" || address === "" || confirmPassword === "") {
             setError(true);
        } else if (password !== confirmPassword){ //check for matching passwords
             setError(true);
             //maybe set an error message sayign passwords do not match
        }
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            billingAddress: address,
            password: password,
            promotions: isChecked,
            cards: [],
            status: "inactive"
        };

        try { // FIX FRONTEND LOGIC THEN FIGURE OUT POSTING
            // Attempting POST Request
            const response = await axios.post("http://localhost:8000/api/users/signup", userData);

            if (response.status === 201) {
                setSubmitted(true)
                setError(false);
            } else {
                setError(true);
            } 
        } catch (error) {
                console.log("Error Registrering User:", error);
                setError(true);
        }
        
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>User {email} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
      <div className="formWrapper">
        <div>
            {/*fix formatting css (make title bigger)*/}
          <h1>User Registration</h1>
        </div>

        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form className="formBox">
          {/* Labels and inputs for form data */}
          <div className="inputWrapper">
          <label className="label">First Name</label>
          <input
            onChange={handleFirstName}
            className="input"
            value={firstName}
            type="text"
            placeholder="First Name"
          />
          </div>
          
          <div className="inputWrapper">
          <label className="label">Last Name</label>
          <input
            onChange={handleLastName}
            className="input"
            value={lastName}
            type="text"
            placeholder="Last Name"
          />
          </div>
          
          <div className="inputWrapper">
          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="email"
            placeholder="Email"
          />
          </div>
          
          <div className="inputWrapper">
          <label className="label">Phone Number</label>
          <input
            onChange={handlePhoneNumber}
            className="input"
            value={phoneNumber}
            type="phone"
            placeholder="###-###-####"
          />
          </div>

          <div className="inputWrapper">
          <label className="label">Address</label>
          <input
            onChange={handleAddress}
            className="input"
            value={address}
            type="address"
            placeholder="123 Main St."
          />
          </div>
          
          <div className="inputWrapper">
            <label className="label">Password</label>
            <input
              onChange={handlePassword}
              className="input"
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <div onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </div>
          </div>
          
          <div className="inputWrapper">
          <label className="label">Confirm Password</label>
          <input
            onChange={handleConfirmPassword}
            className="input"
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
          />
          </div>

          {/* Promotions Checkbox */}
          <div className="promotion">
            <input
              type="checkbox"
              className="promotions"
              checked={isChecked}
              onChange={handlePromotion}
            />
            <label htmlFor="promotions" className="font-medium">Receive Promotions</label>
          </div>
         
          {/*add checkbox for registering for promotions through email*/}
          <button onClick={handleSubmit} className="button" type="submit">
            Submit
          </button>

          {/*add button for login option*/}
        </form>
      </div>
    );
}