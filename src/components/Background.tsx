interface Props {
    children: React.ReactNode;
}

const Background = ({ children }:Props) => {
    return (
        <div className="overflow-x-hidden">
            <div className="w-screen bg-white flex flex-col">
                {children}
            </div>
        </div>

    );
}

export default Background;