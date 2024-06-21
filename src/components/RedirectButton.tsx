interface Props {
    children: React.ReactNode,
    onClick: (param?: any) => void
}

const RedirectButton = ({children, onClick}:Props) => {
    return (
        <button className="flex items-center bg-indigo-600 border border-indigo-600 text-white w-fit h-10 p-5 rounded-xl hover:bg-inherit hover:text-indigo-600 duration-300" onClick={onClick}>
            { children }
        </button>
    );
}

export default RedirectButton;