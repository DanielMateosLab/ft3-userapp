import Button from "@/components/Button";
import Heading from "@/components/Heading";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserData from "@/components/UserData";
import { useLogout } from "@/services/authentication";
import { useUser } from "@/services/user";

const Dashboard = () => {
  const { user } = useUser();
  const { logout, loading: loadingLogout } = useLogout();

  return (
    <ProtectedRoute>
      <div className="pt-4">
        <Heading text="Dashboard" />
        <div className="mb-4">
          <UserData user={user} />
        </div>
        <Button variant="secondary" disabled={loadingLogout} onClick={logout}>
          Disconnect
        </Button>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
