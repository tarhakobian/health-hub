
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/images';

const Hero = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center" ref={heroRef}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={images.surgery} 
          alt="Բժշկական կենտրոն" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-blue-700/50"></div>
      </div>
      
      <div className="page-container relative z-10">
        <div className="max-w-3xl">
          {/* <div className="slide-up stagger-1">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
              Առաջատար առողջապահություն Երևանում
            </span>
          </div> */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 slide-up stagger-2">
          ՄԵԴ ԿԵՆՏՐՈՆ 
          </h1>
          <p className="text-xl text-blue-50 mb-8 mt-12 slide-up stagger-3">
          Մեր բժշկական կենտրոնում առողջությունը դառնում է վստահելի ուղեկից
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 slide-up stagger-4">
            <Link 
              to="/appointment" 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg text-center shadow-lg hover:bg-blue-600 button-hover"
            >
              Ամրագրել այցելություն
            </Link>
            <Link 
              to="/services" 
              className="px-6 py-3 bg-white text-blue-700 rounded-lg text-center shadow-lg hover:bg-blue-50 button-hover"
            >
              Մեր ծառայությունները
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
