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
    <div> <Navbar /></div>
       
        <Outlet />
        <Toaster />
    </>
);
}

export default Root;