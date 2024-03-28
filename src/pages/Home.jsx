import { Helmet } from "react-helmet-async";
import SliderCategories from "../featuers/categories/SliderCategories";
import SliderHome from "../ui/SliderHome";
import Products from "./Products";

function Home() {
  return (
    <>
      <SliderHome />
      <SliderCategories />
      <Products />
      <Helmet>
        <title>Fresh Cart | Home</title>
      </Helmet>
    </>
  );
}

export default Home;
