import { useState } from 'react';

interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (props: ToastProps) => {
    setToast(props);
    setTimeout(() => setToast(null), 3000);
  };

  return {
    toast,
    showToast,
  };
}

export function Toast({ toast }: { toast: ToastProps | null }) {
  if (!toast) return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
      toast.variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'
    } text-white`}>
      <h3 className="font-bold">{toast.title}</h3>
      <p>{toast.description}</p>
    </div>
  );
}
