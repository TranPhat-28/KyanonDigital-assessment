import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { validateEmail } from "../helpers/inputValidate";

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();


    // Toggle show password
    const [showPassword, setShowPassword] = useState(false);

    // Email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // To display error
    const [error, setError] = useState(null);


    // Handle login
    const handleLogin = (e) => {
        e.preventDefault();

        // Validate input
        if (!validateEmail(email)) {
            setError('Email is invalid');
        }
        else if (email === '' || password === '') {
            setError('Missing required field(s)');
        }
        else {
            setError(null);
            // Perform login
            fetch('http://127.0.0.1:5000/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            }).then(res => {
                return res.json()
            }).then(data => {
                if (data.status === false) {
                    setError(data.message)
                }
                else if (data.token) {
                    // Set AuthContext data
                    setUser(data);
                    // Set LocalStorage
                    localStorage.setItem('user', JSON.stringify(data))
                    navigate('/profile');
                }
            })
        }
    }

    return (
        <form className="panel" onSubmit={handleLogin}>
            <h3 className="title-login">Login</h3>

            <label className="label-login">Email:</label>
            <input className="input"
                type='email'
                placeholder="example@kyanon.digital"
                onBlur={validateEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required>
            </input>

            <label className="label-login">Password:</label>
            <input className="input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required>
            </input>

            <div className="container">
                <input type="checkbox" onClick={() => setShowPassword(!showPassword)}></input>
                <div className="label">Show password</div>

                <button className="primary-button float-right">Sign in</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default Login;