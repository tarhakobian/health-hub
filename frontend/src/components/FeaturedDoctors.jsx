import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { doctors } from '../data/doctors.js';

// Select 6 doctors for the featured section
const featuredDoctors = [
  doctors.find(doctor => doctor.id === 1),  // Ակնաբույժ
  doctors.find(doctor => doctor.id === 3),  // Գաստրոէնտերոլոգ
  doctors.find(doctor => doctor.id === 7),  // Էնդոկրինոլոգ
  doctors.find(doctor => doctor.id === 19), // Նյարդաբան
  doctors.find(doctor => doctor.id === 21), // Ուրոլոգ
  doctors.find(doctor => doctor.id === 27), // Սրտաբան
].filter(Boolean); // Filter out any undefined values

const FeaturedDoctors = () => {
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
    
    const doctorElements = document.querySelectorAll('.doctor-card');
    doctorElements.forEach(el => observer.observe(el));
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      doctorElements.forEach(el => observer.unobserve(el));
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      className="section-padding relative" 
      ref={sectionRef}
      style={{
        backgroundImage: `linear-gradient(rgba(219, 234, 254, 0.95), rgba(219, 234, 254, 0.95))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="page-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
            Մեր մասնագետները
          </span> */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ծանոթացեք մեր բժիշկների հետ
          </h2>
          {/* <p className="text-gray-600">
            Մեր փորձառու մասնագետները պատրաստ են ձեզ տրամադրել բարձրորակ բուժօգնություն։
          </p> */}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDoctors.map((doctor, index) => (
            <DoctorCard 
              key={doctor.id}
              doctor={doctor}
              className={`doctor-card opacity-0 translate-y-8`}
              style={{ transitionDelay: `${index * 150}ms` }}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/doctors" 
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Դիտել բոլոր բժիշկներին
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

const DoctorCard = ({ doctor, className, style }) => {
  return (
    <div 
      className={`bg-white rounded-2xl overflow-hidden shadow-soft hover-scale transition-all ${className}`}
      style={style}
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
        <p className="text-blue-600 font-medium mb-3">{doctor.specialty}</p>
        <div className="mb-5 space-y-2">
          <p className="text-gray-600 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {doctor.education}
          </p>
          <p className="text-gray-600 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {doctor.experience}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link 
            to={`/doctors#${doctor.id}`} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-center text-sm flex-1 hover:bg-blue-600 transition-colors"
          >
            Դիտել պրոֆիլը
          </Link>
          <Link 
            to={`/appointment?doctor=${doctor.id}`} 
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg text-center text-sm flex-1 hover:bg-blue-50 transition-colors"
          >
            Ամրագրել այցելություն
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDoctors;