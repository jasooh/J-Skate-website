import { ReactNode } from 'react';
// components
import { Link } from 'react-router-dom';

interface Props {
    children: ReactNode,
    link: string
}

const NavigationButton = ({children, link}:Props) => {
    return (
        <Link to={link} className="flex items-center justify-center text-xl font-semibold text-gray-600 hover:text-indigo-600">
            { children }
        </Link>
    );
}

export default NavigationButton;