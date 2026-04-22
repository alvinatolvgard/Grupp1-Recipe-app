import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

/**
 * Sida för användarinlogg.
 * @author Sanel
 */

const LoginPage =() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === 'test@test.com' && password === '123') {
            login({ email, name: 'Demo User' });
            navigate('/');
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    const containerStyle = {
        padding: 'var(--spacing-3xl) var(--spacing-lg)',
        maxWidth: '450px',
        margin: '0 auto',
        backgroundColor: 'var(--color-card)',
        borderRadius: 'var(--color-lg)',
        boxShadow: 'var(--shadow-md)',
        marginTop: 'var(--spacing-3xl)'
    };

    const inputStyle = {
        padding: 'var(--spacing-md)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-body)'
    };

    const buttonStyle = {
        padding: 'var(--spacing-md)',
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: 'var(--text-body)'
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                <input
                    type="email"
                    placeholder="Email adress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default LoginPage;