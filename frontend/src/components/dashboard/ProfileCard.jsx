import "./ProfileCard.css";
import LogoutButton from "../common/LogoutButton";

function ProfileCard({ profile, loading }) {
  if (loading) {
    return (
      <div className="profile-card">
        <div className="loading">載入中...</div>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={profile?.pictureUrl} alt="個人頭像" />
      </div>

      <div className="profile-info">
        <h2>歡迎，{profile?.displayName}！</h2>
        <p className="user-id">用戶ID: {profile?.userId}</p>

        {profile?.statusMessage && (
          <p className="status-message">{profile.statusMessage}</p>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
