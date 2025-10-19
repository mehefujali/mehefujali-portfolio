"use client";
import Modal from './Modal';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    loading?: boolean;
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, loading }: ConfirmationModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div>
                <p className="text-slate-300 mb-8">{message}</p>
                <div className="flex justify-end gap-4">
                    <Button onClick={onClose} variant="outline" className="bg-transparent border-slate-700 hover:bg-slate-800">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
                        {loading ? 'Deleting...' : 'Confirm Delete'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}