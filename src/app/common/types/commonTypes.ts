export interface Message {
    message: string;
}

export interface Id {
    id: number;
}

export interface CloseModalProps {
    isOpen: boolean;
    closeModal: () => void;
}