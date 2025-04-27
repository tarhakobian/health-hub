import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/images';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Background Image */}
      <section 
        className="py-20 bg-cover bg-center relative" 
        style={{ 
          backgroundImage: `url(${images.about})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900/70"></div>
        
        <div className="page-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
              Մեր մասին
            </span> */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Մեդ Կենտրոն
            </h1>
            <p className="text-blue-100 text-lg mb-8">  Առողջությունը սկսվում է վստահությունից։
            </p>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={images.aboutUs} 
                alt="«Մեդ Կենտրոն»-ի բժշկական թիմը" 
                className="rounded-2xl shadow-soft"
              />
            </div>
            
            <div>
              {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
                Մեր պատմությունը
              </span> */}
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Մեր պատմությունը
              </h2>
              <p className="text-gray-600 mb-6">
              Մեր բժշկական կենտրոնը հիմնադրվել է բուժաշխատողների փոքր խմբի նախաձեռնությամբ, ովքեր միավորվել են որակյալ բժշկական ծառայություններ մատուցելու ընդհանուր գաղափարի շուրջ: 
              </p>
              <p className="text-gray-600 mb-6">
              Հիմնադրման պահից սկսած՝ մեր թիմը նպատակ է ունեցել ստեղծել ժամանակակից պոլիկլինիկա, որտեղ պացիենտների կարիքները դրված են առաջնային պլանում:
              </p>
              <p className="text-gray-600">
              Հետևելով բժշկության ոլորտի արագ զարգացումներին՝ մենք շարունակաբար թարմացնում ենք մեր գիտելիքներն ու սարքավորումները՝ համապատասխանելու ժամանակակից չափանիշներին։
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission, Vision, Values Section */}
      <section className="py-16 bg-blue-50">
        <div className="page-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
              Մեր հիմքը
            </span> */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Առաքելություն, տեսլական և արժեքներ
            </h2>
            {/* <p className="text-gray-600">
              Մեր ուղենիշ սկզբունքները, որոնք ձևավորում են մեր մոտեցումը առողջապահությանը և պացիենտի խնամքին։
            </p> */}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-soft hover-scale">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Մեր առաքելությունը</h3>
              <p className="text-gray-600">
              Մեր առաքելությունն է տրամադրել որակյալ և մատչելի բժշկական ծառայություններ՝ կիրառելով ժամանակակից մոտեցումներ և անհատական ուշադրություն յուրաքանչյուր պացիենտի նկատմամբ: Մենք ձգտում ենք ստեղծել այնպիսի միջավայր, որտեղ պացիենտները կզգան հոգատարություն և աջակցություն :
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-soft hover-scale">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Մեր տեսլականը</h3>
              <p className="text-gray-600">
                Դառնալ նորարարական բժշկական հաստատություն, որը հայտնի է իր հաճախորդակենտրոն մոտեցմամբ և բարձրորակ ծառայություններով: Մենք ձգտում ենք լինել օրինակելի մոդել, որտեղ համատեղվում են մասնագիտական գիտելիքները, ժամանակակից տեխնոլոգիաները և անհատական մոտեցումը:
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-soft hover-scale">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Մեր արժեքները</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Պրոֆեսիոնալիզմ:</strong> Մենք ձգտում ենք պահպանել մասնագիտական բարձր չափանիշներ մեր աշխատանքի բոլոր ասպեկտներում։</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Հարգանք:</strong> Մենք հարգում ենք մեր պացիենտների արժանապատվությունը, կարծիքը և գաղտնիությունը։</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Մատչելիություն:</strong> Մենք կարևորում ենք բժշկական ծառայությունների հասանելիությունը հասարակության լայն շերտերի համար։</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Թիմային աշխատանք:</strong>  Մենք համագործակցում ենք՝ ապահովելու լավագույն հնարավոր արդյունքներ մեր պացիենտների համար։</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Շարունակական զարգացում:</strong>  Մենք շարունակաբար կատարելագործում ենք մեր գիտելիքները և հմտությունները՝ հետևելով բժշկության վերջին նվաճումներին:</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Address & Contact Section */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
              Կոնտակտային տվյալներ
            </span> */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Այցելեք մեր բժշկական կենտրոն
            </h2>
            {/* <p className="text-gray-600">
              Մենք հարմարավետ կերպով տեղակայված ենք Երևանում՝ ժամանակակից հարմարություններով և մեր պացիենտների համար բարեհաճ միջավայրով։
            </p> */}
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="rounded-2xl overflow-hidden shadow-soft h-[400px]">
              {/* This would be replaced with an actual Google Maps embed in a real project */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48818.577343300084!2d44.47231570286115!3d40.18109654041902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2dab8fc8b5b%3A0x3d1479ae87da526a!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2sus!4v1652870691513!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="«Մեդ Կենտրոն»-ի տեղակայումը"
              ></iframe>
            </div>
            
            <div>
              <div className="bg-blue-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold mb-6">Կոնտակտային տվյալներ</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900">Հասցե</h4>
                      <p className="text-gray-600">Բժշկական փողոց 123, Երևան, Հայաստան</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900">Հեռախոս</h4>
                      <p className="text-gray-600">+374 10 123456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900">Էլ. փոստ</h4>
                      <p className="text-gray-600">info@medcentron.am</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900">Աշխատանքային ժամեր</h4>
                      <p className="text-gray-600">Երկուշաբթի - Ուրբաթ։ 9:00 - 17:00</p>
                      {/* <p className="text-gray-600">Շաբաթ։ 9:00 - 17:00</p> */}
                      {/* <p className="text-gray-600">Կիրակի։ Փակ է</p> */}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/appointment" 
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg text-center shadow-button hover:bg-blue-600 button-hover flex-1"
                >
                  Ամրագրել այցելություն
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

