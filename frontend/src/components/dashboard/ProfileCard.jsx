import './ProfileCard.css';
import LogoutButton from "../common/LogoutButton";
import StatusMessage from "../common/StatusMessage";

function ProfileCard({ profile, onLogout, loading, backendMessage }) {
  return (
    <div className="profile-card">
      <h2>歡迎使用！</h2>
      {profile && (
        <div className="profile-info">
          <img
            src={profile.pictureUrl}
            alt="Profile"
            className="profile-picture"
          />
          <p className="user-name">{profile.displayName}</p>
          <p className="user-id">ID: {profile.userId}</p>
        </div>
      )}
      <LogoutButton 
        onClick={onLogout}
        disabled={loading}
        loading={loading}
      />
      <StatusMessage message={backendMessage} />
    </div>
  );
}

export default ProfileCard;