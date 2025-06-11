'use client'
import { useState } from "react";
import { Breadcrumbs } from "@/components/crumbs/breadCrumbs";
import { CoverPage } from "@/components/cover/coverscreen";


const Index = () => {

  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect('/login')
  // }
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'cover' | 'login' | 'signup'>('cover');



  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('cover');
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {isAuthenticated && (
          <Breadcrumbs
            currentScreen={currentScreen}
            onLogout={handleLogout}
          />
        )}

       
          <CoverPage/>
         
         
         
        
      </div>
    </div>
  );
};

export default Index;
