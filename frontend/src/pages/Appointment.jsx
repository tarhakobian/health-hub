
import React, { useEffect } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import { images } from '../assets/images';

const Appointment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      {/* <section className="bg-blue-600 py-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center"> */}
            {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
              Գրանցվել ընդունելության
            </span> */}
            {/* <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ամրագրել այցելություն
            </h1>
            <p className="text-blue-100 text-lg mb-8">
            Հոգ տարեք Ձեր առողջության մասին ժամանակին։ Մեր փորձառու մասնագետները պատրաստ են Ձեզ ընդունել Ձեզ հարմար ժամանակ։
            </p>
          </div>
        </div>
      </section> */}
      
      {/* Appointment Form Section */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">
                  Ինչպե՞ս ամրագրել այց
                </h2>
                <p className="text-gray-600 mb-6">
                  «Մեդ Կենտրոն»-ում գրանցվելը արագ և հեշտ է։ Կատարեք հետևյալ քայլերին։
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2"></h3>
                      <p className="font-bold text-gray-600">Ընտրեք ձեզ անհրաժեշտ բժշկական ծառայությունը։</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2"></h3>
                      <p className="font-bold text-gray-600">Ընտրեք բժշկին։</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2"></h3>
                      <p className="font-bold text-gray-600">Ընտրեք Ձեզ հարմար ամսաթիվը և ժամը։</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    {/* <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 font-bold">4</span>
                    </div> */}
                    {/* <div> */}
                      {/* <h3 className="font-bold text-lg mb-2">Հաստատում</h3> */}
                      {/* <p className="text-gray-600">Ստացեք ձեր այցի հաստատումը հեռախոսով կամ էլ. փոստով, և դուք պատրաստ եք!</p> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Հարցե՞ր ունեք</h3>
                <p className="text-gray-600 mb-4">
                Եթե Ձեզ օգնություն է հարկավոր, կամ ունեք հարցեր այցելություն ամրագրելու վերաբերյալ, կապվեք մեզ հետ։
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">+374 10 123456</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">info@medcentron.am</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
