import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('token');

        if (!accessToken) {
            // Nếu chưa đăng nhập, chuyển hướng về trang chủ
            navigate('/');
            return;
        }

        // Gọi API để lấy thông tin user từ Google
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User data:', data);
                setUser(data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                navigate('/'); // Nếu có lỗi, quay lại trang login
            });
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <h2>Welcome, {user.name}!</h2>
                    <img src={user.picture} alt="User profile" style={{ borderRadius: '50%', width: '100px' }} />
                    <p>Email: {user.email}</p>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/'); // Quay lại trang login sau khi logout
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Dashboard;
