import CustomHeader from "../custom/CustomHeader";
import CustomFooter from "../custom/CustomFooter";
import DefaultDisplay from "@/custom/DefaultDisplay";

const Home = () => {
  return (
    <div className="font-mulish">
      <CustomHeader />
      <DefaultDisplay />
      <CustomFooter />
    </div>
  );
};

export default Home;
