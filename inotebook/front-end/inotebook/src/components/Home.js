import { Notes } from "./Notes";

export const Home = (props) => {
  const { showAlert } = props;
  console.log("Token in Home component: " + localStorage.getItem('token'));
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
