import BestSeller from "../Components/BestSeller";
import Hero from "../Components/Hero";
import LatestCollections from "../Components/LatestCollections";
import OurPolicy from "../Components/OurPolicy";
import NewsLetterBox from "../Components/NewsLetterBox.jsx";
function Home() {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
}
export default Home;
