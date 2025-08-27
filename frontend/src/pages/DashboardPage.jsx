import ProfileCard from "../components/dashboard/ProfileCard";
import NavigationBar from "../components/dashboard/NavigationBar";
import AddCardButton from "../components/dashboard/AddCardButton";
import './DashboardPage.css';

function DashboardPage({ profile, onLogout, loading, backendMessage }) {
  const handleBack = () => {
    // 處理返回按鈕點擊
    console.log('Back button clicked');
  };

  const handleSettings = () => {
    // 處理設置按鈕點擊
    console.log('Settings button clicked');
  };

  const handleAddCard = () => {
    // 處理新增名片按鈕點擊
    console.log('Add card button clicked');
  };

  return (
    <div className="dashboard-page-container">
      {/* 導航欄 */}
      <NavigationBar 
        title="我的電子名片"
        onBack={handleBack}
        onSettings={handleSettings}
      />
      
      {/* 主要內容區域 - 包含名片和按鈕 */}
      <div className="dashboard-main-content">
        <ProfileCard 
          profile={profile}
          onLogout={onLogout}
          loading={loading}
          backendMessage={backendMessage}
        />
        
        <AddCardButton onClick={handleAddCard} />
      </div>
    </div>
  );
}

export default DashboardPage;