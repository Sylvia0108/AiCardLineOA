import "./ProfileCard.css";
import phoneIcon from "../../assets/figma/phone-icon.svg";
import editIcon from "../../assets/figma/edit-icon.svg";
import shareIcon from "../../assets/figma/share-icon.svg";

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
      {/* 卡片背景 */}
      <div className="card-background">
        {/* 用戶資訊區域 */}
        <div className="user-info-section">
          <div className="user-avatar">
            <img 
              src={profile?.pictureUrl || '/default-avatar.png'} 
              alt="User Avatar" 
              className="avatar-image"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzUiIGN5PSIzNSIgcj0iMzUiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTM1IDIwQzQwLjUyMjggMjAgNDUgMjQuNDc3MiA0NSAzMEM0NSA0MC41MjI4IDQwLjUyMjggNDUgMzUgNDVDMjkuNDc3MiA0NSAyNSA0MC41MjI4IDI1IDMwQzI1IDI0LjQ3NzIgMjkuNDc3MiAyMCAzNSAyMFoiIGZpbGw9IiM5Q0E3RkYiLz4KPHBhdGggZD0iTTEwIDUwQzEwIDQwLjUyMjggMTQuNDc3MiAzNiAyMCAzNkg1MEM1NS41MjI4IDM2IDYwIDQwLjUyMjggNjAgNTBWNjBIMTBWNTVaIiBmaWxsPSIjOUNBN0ZGIi8+Cjwvc3ZnPgo=';
              }}
            />
          </div>
          <div className="user-details">
            <h1 className="user-name">{profile?.displayName || '王小明'}</h1>
          </div>
        </div>

        {/* 聯絡資訊區域 */}
        <div className="contact-section">
          <div className="contact-item">
            <img src={phoneIcon} alt="Phone" className="contact-icon" />
            <span className="contact-text">0900000000</span>
          </div>
          
          <div className="contact-item">
            <div className="line-icon-placeholder"></div>
            <span className="contact-text">{profile?.statusMessage || 'wang_little_ming'}</span>
          </div>
        </div>

        {/* 右側操作按鈕 */}
        <div className="action-buttons">
          <button aria-label="Share Profile" className="action-btn">
            <img src={shareIcon} alt="Share" />
          </button>
          <button aria-label="Edit Profile" className="action-btn">
            <img src={editIcon} alt="Edit" />
          </button>
        </div>

        {/* 裝飾橢圓 */}
        <div className="decorative-ellipse"></div>
      </div>
    </div>
  );
}

export default ProfileCard;
