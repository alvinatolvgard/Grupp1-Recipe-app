import useAuthStore from '../stores/useAuthStore';

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    return (
        <div style={{ padding: 'var(--spacing-xl)', maxWidth: 'var(--container-max-width)', margin: '0 auto' }}>
            <h1> Welcome, {user?.name}!</h1>
            <p>Here is your own creations.</p>

            <button
                onClick={logout}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;