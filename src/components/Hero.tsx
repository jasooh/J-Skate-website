// Components
import { MutableRefObject, useRef } from 'react';
import RedirectButton from './RedirectButton';
import StoreItem from './StoreItem';

// Images
import photo1 from '../img/skateboarder1.jpeg';
import photo2 from '../img/skateboarder2.jpg';
import photo3 from '../img/skateboarder3.jpeg';

import AugmentImage from '../img/augment.png';
import NewImage from '../img/new.png';
import { useCartContext } from '../context/CartContext';

const Hero = () => {
    const myRef = useRef() as MutableRefObject<HTMLDivElement>;
    const onClick = () => myRef.current.scrollIntoView();
    const Cart = useCartContext();

    return (
        <>
            <div className="flex items-center justify-center flex-row w-screen h-[50rem] shadow-2xl"> 
                {/* Heading */}
                <div className="flex flex-col p-10 w-max h-max">
                    <h1 className="mb-5 text-xl text-indigo-600 font-bold">
                        Rethink the way you travel.
                    </h1>
                    <h1 className="text-3xl xl:text-6xl xl: max-w-xl font-bold text-black tracking-tight ">
                        Electric skateboards to enhance the way you ride.
                    </h1>
                    <p className="mt-10 text-lg leading-8 text-gray-600 max-w-md mb-5">
                        Our hand-made electric skateboards are crafted from premium materials, ensuring a <strong>superior</strong> riding experience for enthusiasts seeking an electrifying thrill.
                    </p>
                    <RedirectButton onClick={onClick}>Shop now</RedirectButton>
                </div>
                {/* Images */}
                <div className="hidden flex-row h-full gap-1 xl:flex">
                    <div className="w-[10rem] h-full">
                        <img className="object-cover w-full h-full" src={photo1}/>
                    </div>
                    <div className="w-[10rem] h-full">
                        <img className="object-cover w-full h-full" src={photo2}/>
                    </div>
                    <div className="w-[10rem] h-full">
                        <img className="object-cover w-full h-full" src={photo3}/>
                    </div>
                </div>
            </div>
            <div className="w-screen h-[60rem] flex flex-col items-center justify-start pt-40 p-5">
                <p className="text-4xl text-indigo-600 font-bold mb-5 text-center" ref={myRef}>Let's pick your new ride.</p>
                <p className="text-lg leading-8 text-gray-600 max-w-md mb-10 text-center">
                    Own a skateboard and want an upgrade? We can do that for you. Or buy a new one - <strong>your choice</strong>.
                </p>
                <div className="w-[90%] lg:w-1/2 h-min flex flex-col md:flex-row justify-evenly items-center ring-1 ring-gray-200 rounded-3xl p-10 gap-5">
                    <StoreItem name="Augment Skateboard" cost="$250" src={AugmentImage} id={1}/>
                    <StoreItem name="Custom Skateboard" cost="$500" src={NewImage} id={2}/>
                </div>
            </div>
        </>
    );
}

export default Hero;