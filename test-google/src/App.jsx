import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/auth/login';
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        if (token) {
            console.log('Login successful, token:', token);
            localStorage.setItem('token', token);
            navigate('/dashboard'); // 🟢 Chuyển hướng đến trang Dashboard
        }

        if (error) {
            console.error('Login failed:', error);
        }
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login Page</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
}

export default App;
