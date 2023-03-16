import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { convertDate, validateEmail, validatePhone } from "../helpers/inputValidate";

const Profile = () => {

    // Context
    const { user, setUser } = useContext(AuthContext);

    // Form data
    const [fullname, setFullname] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/profile', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('Could not fetch the data');
                }
                return res.json();
            })
            .then(data => {
                if (data.status === true) {
                    setFullname(data.profile.fullName);
                    setDateOfBirth(data.profile.dateOfBirth);
                    setEmail(data.profile.email);
                    setPhone(data.profile.phone);
                    setError(null);
                }
                else if (data.status === false){
                    setError(data.error);
                }
            })
            .catch(err => {
                // auto catches network / connection error
                setError(err.message);
            })
    }, [])



    // Error
    const [error, setError] = useState(null);



    // Update profile
    const handleUpdate = (e) => {
        e.preventDefault();

        // Missing
        if (fullname === '' || dateOfBirth === '' || email === '' || phone === '') {
            setError('Missing required field(s)');
        }
        // Validate
        else if (!(validateEmail(email))) {
            setError('Email is invalid');
        }
        else if (!(validatePhone(phone))) {
            setError('Phone is invalid');
        }
        // Send update
        else {
            fetch('http://127.0.0.1:5000/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    fullName: fullname,
                    dateOfBirth: dateOfBirth,
                    email: email,
                    phone: phone
                })
            })
                .then(res => {
                    if (!res.ok) { // error coming back from server
                        throw Error('Could not update the data');
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.status === false) {
                        setError(data.message);
                    }
                    else if (data.status === true) {
                        window.alert('Profile successfully updated! Please login again');
                        logout();
                    }
                })
                .catch(err => {
                    // auto catches network / connection error
                    setError(err.message);
                })
        }
    }

    // Logout
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <form className="panel" onSubmit={handleUpdate}>
            <h3 className="title-profile">Profile</h3>

            <label className="label-profile">Full name:</label>
            <input className="input" value={fullname} onChange={(e) => setFullname(e.target.value)} type='text' required></input>

            <label className="label-profile">Date of birth:</label>
            <input className="input" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} type='date' required></input>

            <label className="label-profile">Email:</label>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type='email' required></input>

            <label className="label-profile">Phone:</label>
            <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required></input>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="container-second">
                <div className="secondary-button" onClick={logout}>Cancel</div>
                <button className="primary-button">Update</button>
            </div>
        </form>
    );
}

export default Profile;