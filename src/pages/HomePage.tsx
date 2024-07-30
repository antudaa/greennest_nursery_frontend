import CategorySection from "../components/home/CategorySection";
import HeroSection from "../components/home/HeroSection";
import ImageGallery from "../components/home/ImageGallery";
import Products from "../components/home/Products";

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <CategorySection />
            <Products />
            <ImageGallery />
        </div>
    );
};

export default HomePage;