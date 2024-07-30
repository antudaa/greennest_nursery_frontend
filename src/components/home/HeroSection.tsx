import HeroImage from "../../assets/Images/Hero_Section_Plant_Image2.png";

const HeroSection = () => {
    return (
        <main className="flex flex-col lg:my-20 justify-between bg-gradient-to-r from-green-900 to-lime-500 rounded-2xl p-8 relative text-white font-rubik lg:mx-20 mx-4 shadow-xl">
            <div className="flex flex-col items-center text-center lg:text-left lg:items-start lg:w-[400px] animate-slide-in-left">
                <h3 className="text-xl md:text-2xl font-light mt-8 animate-fade-in">Welcome to</h3>
                <h1 className="text-3xl md:text-5xl mb-4 md:mb-8 animate-fade-in">GreenNest Nursery</h1>
                <p className="font-light text-gray-300 mb-4 md:mb-8 text-wrap animate-fade-in">
                    Discover a wide variety of plants and bring nature closer to your home. Our nursery offers everything from beautiful flowers to lush indoor plants.
                </p>
                <p className="font-light text-gray-300 mb-4 md:mb-8 text-wrap animate-fade-in">
                    Explore our collection and transform your space into a green oasis.
                </p>
                <div className="flex flex-col md:flex-row items-center mb-4 md:mb-8 animate-fade-in">
                    <button
                        id="downloadBtn"
                        className="bg-white text-[#524434] font-semibold py-2 md:py-4 px-4 md:px-8 rounded-full relative mb-2 md:mb-0"
                    >
                        View Products
                        <span className="absolute h-15 w-7 bg-transparent shadow-none top-full left-0 rounded-tl-full"></span>
                        <span className="absolute h-15 w-7 bg-transparent shadow-none -top-15 left-0 rounded-bl-full"></span>
                    </button>
                </div>
            </div>
            <div
                id="chameleon"
                className="hidden absolute lg:flex bottom-0 -right-32 lg:right-0 h-[200px] w-[200px] md:h-[400px] md:w-[400px] lg:h-[600px] lg:w-[600px] bg-no-repeat bg-contain animate-slide-in-right"
                style={{ backgroundImage: `url(${HeroImage})`}}
            >

            </div>
        </main>
    );
};

export default HeroSection;