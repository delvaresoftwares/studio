import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image src="https://res.cloudinary.com/dt4mweku7/image/upload/v1751266408/buissware_h6bmig.png" alt="Buissware Logo" width={180} height={40} priority />
    </div>
  );
};

export default Logo;
