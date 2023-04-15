import { useHistory } from "react-router";
import { UserAuth } from "../context/AuthContext";

interface componentProps {
  children: any;
}

const ProtectedRoute: React.FC<componentProps> = ({ children }) => {
  const history = useHistory();
  const { user } = UserAuth();

  if (!user) {
    return alert("no user");
  } else {
    history.push("/create");
  }

  return children;
};

export default ProtectedRoute;
