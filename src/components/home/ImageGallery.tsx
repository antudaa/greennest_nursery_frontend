import CustomerImage_1 from "../../assets/Client_Images/CustomerImage-1.jpg";
import CustomerImage_2 from "../../assets/Client_Images/CustomerImage-2.jpg";
import CustomerImage_3 from "../../assets/Client_Images/CustomerImage-3.jpg";
import CustomerImage_4 from "../../assets/Client_Images/CustomerImage-4.jpg";
import CustomerImage_5 from "../../assets/Client_Images/CustomerImage-5.jpg";
import CustomerImage_6 from "../../assets/Client_Images/CustomerImage-6.jpg";
import CustomerImage_7 from "../../assets/Client_Images/CustomerImage-7.jpg";
import CustomerImage_8 from "../../assets/Client_Images/CustomerImage-8.jpg";
import CustomerImage_9 from "../../assets/Client_Images/CustomerImage-9.jpg";
import CustomerImage_10 from "../../assets/Client_Images/CustomerImage-10.jpg";
import CustomerImage_11 from "../../assets/Client_Images/CustomerImage-11.jpg";
import CustomerImage_12 from "../../assets/Client_Images/CustomerImage-12.jpg";

const ImageGallery = () => {
    const images = [
        CustomerImage_1,
        CustomerImage_2,
        CustomerImage_3,
        CustomerImage_4,
        CustomerImage_5,
        CustomerImage_6,
        CustomerImage_7,
        CustomerImage_8,
        CustomerImage_9,
        CustomerImage_10,
        CustomerImage_11,
        CustomerImage_12,
    ];

    // Divide images into chunks for each column
    const chunkSize = Math.ceil(images.length / 4);
    const imageChunks = Array.from({ length: 4 }, (_, i) =>
        images.slice(i * chunkSize, i * chunkSize + chunkSize)
    );

    return (
        <div className="lg:mx-20 mx-4">
            <div className='flex flex-col items-center my-10'>
                <div className='flex items-center gap-4 w-full'>
                    <hr className='flex-grow border-t-1 border-[#524434] min-w-[20px]' />
                    <h1 className="text-[#524434] text-sm md:text-4xl font-semibold animate-fade-in whitespace-nowrap">
                        Our Happy Customers
                    </h1>
                    <hr className='flex-grow border-t-1 border-[#524434] min-w-[20px]' />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageChunks?.map((chunk, index) => (
                    <div key={index} className="grid gap-4">
                        {chunk.map((src, idx) => (
                            <div key={idx}>
                                <img className="h-auto max-w-full rounded-lg object-cover object-center" src={src} alt={`Gallery image ${index * chunkSize + idx + 1}`} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
