import { Toaster } from 'sonner';

export function Sonner() {
  return (
    <Toaster
      theme="dark"
      className="font-sans"
      toastOptions={{
        style: {
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          color: '#fff',
        },
      }}
    />
  );
}

export { Toaster } from 'sonner';
