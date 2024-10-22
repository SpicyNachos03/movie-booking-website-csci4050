import { useState } from "react";

export default function Form() {
    //States for registration
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    //JOSEPH ADD THE EVENT HANDLERS FOR PHONE NUMBER AND CONFIRM PASSWORD
    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

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

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "" || phoneNumber === "" || confirmPassword === "") {
            setError(true);
        } 
        else if (password !== confirmPassword){ //check for matching passwords
            setError(true);
            //maybe set an erro message sayign passwords do not match
        }  
        else {
            setSubmitted(true);
            setError(false);
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
                <h1>User {name} successfully registered!!</h1>
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
        <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input
                    onChange={handleName}
                    className="input"
                    value={name}
                    type="text"
                />

                <label className="label">Email</label>
                <input
                    onChange={handleEmail}
                    className="input"
                    value={email}
                    type="email"
                />

                <label className="label">Phone Number</label>
                <input
                    onChange={handlePhoneNumber}
                    className="input"
                    value={phoneNumber}
                    type="phone"
                />

                <label className="label">Password</label>
                <input
                    onChange={handlePassword}
                    className="input"
                    value={password}
                    type="password"
                />

                <label className="label">Confirm Password</label>
                <input
                    onChange={handleConfirmPassword}
                    className="input"
                    value={confirmPassword}
                    type="password"
                />
                //add checkbox for registering for promotions through email
                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}