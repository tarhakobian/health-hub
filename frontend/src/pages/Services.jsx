
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import ServiceSearch from '../components/ServiceSearch';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const selectedServiceRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check URL hash for service ID
    const hash = window.location.hash;
    if (hash) {
      const serviceId = hash.substring(1);
      setSelectedService(serviceId);
      
      // Give time for the render to complete
      setTimeout(() => {
        const element = document.getElementById(serviceId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    // Scroll to selected service when it changes
    if (selectedService && selectedServiceRef.current) {
      selectedServiceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedService]);

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    if (serviceId) {
      window.history.pushState(null, '', `#${serviceId}`);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Filter services based on selected service
  const displayedServices = selectedService 
    ? services.filter(service => service.id === selectedService) 
    : [];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Background Image */}
      <section 
        className="py-20 bg-center bg-cover bg-no-repeat relative" 
        style={{ backgroundImage: 'url("/images/services.webp")' }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-blue-900/70"></div>
        
        <div className="page-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
              Մեր ծառայությունները
            </span> */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Գտեք ձեզ անհրաժեշտ ծառայությունը
            </h1>
            {/* <p className="text-blue-100 text-lg mb-8">
              Մենք առաջարկում ենք բժշկական ծառայությունների լայն շրջանակ՝ բավարարելու ձեր առողջապահական կարիքները, որոնք մատուցվում են մեր փորձառու մասնագետների թիմի կողմից։
            </p> */}
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="page-container">
          <div className="text-center max-w-3xl mx-auto mb-8">
            {/* <h2 className="text-3xl font-bold mb-4">
              Գտեք ձեզ անհրաժեշտ ծառայությունը
            </h2> */}
            {/* <p className="text-gray-600">
              Սեղմեք ծառայության վրա կամ օգտագործեք որոնման դաշտը՝ գտնելու ձեզ հետաքրքրող բժշկական ծառայությունը:
            </p> */}
          </div>
          
          <ServiceSearch 
            services={services} 
            onServiceSelect={handleServiceSelect} 
            selectedService={selectedService}
          />
          
          {selectedService && (
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => handleServiceSelect(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
              >
                <span>Վերադառնալ ծառայություններին</span>
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Services Grid */}
      {!selectedService && (
        <section className="py-12 bg-white">
          <div className="page-container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onSelect={() => handleServiceSelect(service.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Detailed Service View */}
      {selectedService && (
        <section className="py-16 bg-gray-50">
          <div className="page-container">
            <div className="space-y-20">
              {displayedServices.map((service) => (
                <ServiceDetail 
                  key={service.id} 
                  service={service} 
                  ref={selectedServiceRef}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Appointment CTA */}
      <section className="py-20 relative">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: 'url("/images/8e7ce08c-6da8-4e1f-b36a-e057ee65780e.png")' }}>
        </div>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-blue-900/70"></div>
        
        <div className="page-container text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ամրագրեք Ձեր այցելությունը
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Հոգ տարեք Ձեր առողջության մասին ժամանակին։ Մեր փորձառու մասնագետները պատրաստ են Ձեզ ընդունել Ձեզ հարմար ժամանակ։
          </p>
          <Link 
            to="/appointment" 
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium shadow-lg hover:bg-blue-50 transition-all inline-block button-hover"
          >
            Ամրագրել հիմա
          </Link>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ service, onSelect }) => (
  <div 
    className="bg-white rounded-2xl overflow-hidden shadow-soft hover-scale cursor-pointer"
    onClick={onSelect}
  >
    <div className="h-48 overflow-hidden">
      <img 
        src={service.icon} 
        alt={service.title} 
        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-5 line-clamp-3">{service.description}</p>
      <button 
        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
      >
        Մանրամասներ
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
      </button>
    </div>
  </div>
);

const ServiceDetail = React.forwardRef(({ service }, ref) => (
  <div id={service.id} ref={ref} className="scroll-mt-24 bg-white rounded-2xl shadow-soft p-8">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
        <p className="text-gray-600 mb-6">{service.description}</p>
        <div className="space-y-3 mb-8">
          <h3 className="font-bold text-lg">Մեր ծառայությունները ներառում են՝</h3>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link 
          to={`/appointment?service=${service.id}`} 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-button hover:bg-blue-600 button-hover inline-block"
        >
          Ամրագրել այցելություն
        </Link>
      </div>
      <div>
        <img 
          src={service.icon} 
          alt={service.title} 
          className="w-full h-auto rounded-xl shadow-sm"
        />
      </div>
    </div>
  </div>
));
ServiceDetail.displayName = 'ServiceDetail';

export default Services;
