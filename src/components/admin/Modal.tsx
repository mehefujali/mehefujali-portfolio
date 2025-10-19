"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { IconX } from '@tabler/icons-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="relative z-10 w-full max-w-3xl p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl"
                    >
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                                <IconX size={20} />
                            </button>
                        </div>
                        <div className="mt-6 max-h-[70vh] overflow-y-auto pr-2">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}