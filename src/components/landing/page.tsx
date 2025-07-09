'use client';

import React from 'react';
import Nav from '../Nav';
import Features from './Features';
import HeroSection from './HeroSection';
import Works from './Works';
import Bigbg from './Bigbg';
import Footer from '../footer';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Nav
          logo="/images/Logo.png"
          loginText="Sign In"
          signupText="Sign Up"
          authText="Analyze"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Features />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Works />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Bigbg />
      </motion.div>

      <Footer />
    </div>
  );
}

export default Home;
