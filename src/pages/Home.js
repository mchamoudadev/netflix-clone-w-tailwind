import Faqs from "../components/faq/Faqs";
import { Features } from "../components/features/Features";
import Footer from "../components/footer/Footer";

import HomeHero from "../components/HomeHero";

const Home = () => {
    return (
        <div className="relative">
            {/* <Header /> */}
            <HomeHero />
            {/* <Border /> */}
            <Features />
            <Faqs />
            <Footer />
        </div>
    );
};

export default Home;
