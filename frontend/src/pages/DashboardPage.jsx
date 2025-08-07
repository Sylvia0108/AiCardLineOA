import Header from "../components/layout/Header";
import ProfileCard from "../components/dashboard/ProfileCard";

function DashboardPage({ profile, onLogout, loading, backendMessage }) {
  return (
    <div className="dashboard-container">
      <Header />
      
      <ProfileCard 
        profile={profile}
        onLogout={onLogout}
        loading={loading}
        backendMessage={backendMessage}
      />
    </div>
  );
}

export default DashboardPage;