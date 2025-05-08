"use client"

import { createContext, useContext, useState } from 'react';

interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

const ToastContext = createContext<{
  toast: (props: ToastProps) => void;
}>({ toast: () => {} });

export function Toaster({ children }: { children?: React.ReactNode }) {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (props: ToastProps) => {
    setToast(props);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}
      {toast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
          toast.variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          <h3 className="font-bold">{toast.title}</h3>
          <p>{toast.description}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
