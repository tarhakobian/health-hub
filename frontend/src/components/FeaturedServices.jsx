import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services.js';

// Select 6 specific services for the featured section
const featuredServices = [
  services.find(service => service.id === 'cardiology'),
  services.find(service => service.id === 'neurology'),
  services.find(service => service.id === 'pediatrics'),
  services.find(service => service.id === 'ophthalmology'),
  services.find(service => service.id === 'gastroenterology'),
  services.find(service => service.id === 'gynecology')
].filter(Boolean); // Filter out any undefined values

const FeaturedServices = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const serviceElements = document.querySelectorAll('.service-card');
    serviceElements.forEach(el => observer.observe(el));
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      serviceElements.forEach(el => observer.unobserve(el));
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="section-padding bg-white" ref={sectionRef}>
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
            Մեր մասնագիտացումները
          </span> */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Մեր ծառայությունները
          </h2>
          <p className="text-gray-600">
          Ձեր առողջությունը մեր ամենօրյա աշխատանքն է։ Մեդ Կենտրոն-ում դուք կստանաք արդի սարքավորումներով հետազոտություններ և անհատական մոտեցում՝ ցանկացած բժշկական խնդրի դեպքում։
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <ServiceCard 
              key={service.id}
              service={service}
              className={`service-card opacity-0 translate-y-8`}
              style={{ transitionDelay: `${index * 150}ms` }}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/services" 
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Դիտել բոլոր ծառայությունները
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, className, style }) => {
  return (
    <div 
      className={`bg-white rounded-2xl overflow-hidden shadow-soft hover-scale transition-all ${className}`}
      style={style}
    >
      <div className="h-52 overflow-hidden">
        <img 
          src={service.icon} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-5">{service.description}</p>
        <Link 
          to={`/services#${service.id}`} 
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          Իմանալ ավելին
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedServices;