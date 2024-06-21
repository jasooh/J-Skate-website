import { useState } from 'react';

interface ModalProps {
    isOpen: boolean,
    onClose: () => void
}

const Modal = ({isOpen, onClose}:ModalProps) => {
    if (isOpen == false) return null;

    return (
        <div className="w-screen h-screen fixed flex items-end justify-end border border-black inset-0 m-auto">
            <div className="w-1/3 h-screen flex rounded-xl bg-gray-100 z-20">
                
            </div>
        </div>
    );
}

export default Modal;