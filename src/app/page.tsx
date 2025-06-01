'use client'

import { useState } from "react";
import { AuthScreen } from "@/components/auth/authscreen";
import { AnalyzerScreen } from "@/components/screen/analyzerScreen";
import { Breadcrumbs } from "@/components/crumbs/breadCrumbs";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'login' | 'signup' | 'analyzer'>('login');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('analyzer');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  const handleSwitchToSignup = () => setCurrentScreen('signup');
  const handleSwitchToLogin = () => setCurrentScreen('login');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {isAuthenticated && (
          <Breadcrumbs
            currentScreen={currentScreen}
            onLogout={handleLogout}
          />
        )}

        {!isAuthenticated ? (
          <AuthScreen
            currentScreen={currentScreen}
            onLogin={handleLogin}
            onSwitchToSignup={handleSwitchToSignup}
            onSwitchToLogin={handleSwitchToLogin}
          />
        ) : (
          <AnalyzerScreen />
        )}
      </div>
    </div>
  );
};

export default Home;