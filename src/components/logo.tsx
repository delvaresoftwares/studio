import Image from 'next/image';

const Logo = () => {
  return (
    <Image 
      src="https://res.cloudinary.com/dt4mweku7/image/upload/v1751266408/buissware_h6bmig.png" 
      alt="Delvare Logo" 
      width={40} 
      height={40} 
      className="rounded-lg"
    />
  );
};

export default Logo;
