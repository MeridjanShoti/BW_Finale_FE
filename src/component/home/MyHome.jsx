import AccessPage from "../access/AccessPage";
import HomeDescription from "./HomeDescription";

function MyHome() {
  const token = localStorage.getItem("token");
  return <>{token ? <HomeDescription /> : <AccessPage />}</>;
}

export default MyHome;
