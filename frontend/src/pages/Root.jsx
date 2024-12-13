import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import { AuthProvider } from '@context/AuthContext';
import { Toaster } from "@/components/ui/sonner"

function Root()  {
return (
    
    <AuthProvider>
        <PageRoot/>
    </AuthProvider>
);
}

function PageRoot() {
return (
    <>
        <Navbar />
        <Outlet />
        <Toaster />
    </>
);
}

export default Root;