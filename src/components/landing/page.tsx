import React from 'react'
import Nav from '../Nav'
import Features from './Features'
import HeroSection from './HeroSection'
import Works from './Works'
import Bigbg from './Bigbg'
import Footer from '../footer'

function Home() {
  return (
    <div>
      <Nav
        logo="/images/logo.png"
        loginText="Sign In"
        signupText="Sign Up"
        authText="Analyze"
      />

      <HeroSection />
      <Features />
      <Works />
      <Bigbg/>
      <Footer/>
    </div>
  )
}

export default Home