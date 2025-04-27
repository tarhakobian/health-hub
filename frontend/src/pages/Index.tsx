
import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import FeaturedServices from '../components/FeaturedServices';
import FeaturedDoctors from '../components/FeaturedDoctors';
import { Link } from 'react-router-dom';
import { images } from '../assets/images';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <FeaturedServices />
      
      <FeaturedDoctors />
      
      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
                Ինչու՞ ընտրել մեզ
              </span> */}
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ինչու՞ ընտրել մեզ
              </h2>
              {/* <p className="text-gray-600 mb-8">
              «Մեդ Կենտրոն»-ը տրամադրում է լավագույն առողջապահական ծառայություններ՝ օգտագործելով նորագույն տեխնոլոգիաներ և ներգրավելով փորձառու մասնագետների:
              </p> */}
              
              <div className="space-y-4">
                <FeatureItem 
                  title="Փորձառու և հոգատար բժիշկներ" 
                  description="Մեր բժիշկները ունեն հարուստ փորձ և շարունակաբար կատարելագործում են իրենց հմտությունները միջազգային վերապատրաստումների միջոցով:"
                />
                <FeatureItem 
                  title="Ժամանակակից սարքավորումներ" 
                  description="Կենտրոնը հագեցած է նորագույն տեխնոլոգիաներով՝ ապահովելով ճշգրիտ ախտորոշում և արդյունավետ բուժում:"
                />
                <FeatureItem 
                  title="Անհատական մոտեցում" 
                  description="Յուրաքանչյուր պացիենտի համար մշակում ենք բուժման անհատական ծրագիր՝ հաշվի առնելով առողջական վիճակի բոլոր առանձնահատկությունները: Մեզ համար կարևոր է ոչ միայն ախտանիշների վերացումը, այլև հիվանդության պատճառների բացահայտումը և կանխարգելումը:"
                />
                {/* <FeatureItem 
                  title="Հարմարավետություն " 
                  description="Կանխարգելիչ խնամքից մինչև մասնագիտացված բուժում, մենք առաջարկում ենք բժշկական ծառայությունների լայն շրջանակ։"
                /> */}
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/about" 
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-button hover:bg-blue-600 button-hover inline-block"
                >
                  Ավելին մեր մասին
                </Link>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden shadow-soft relative">
                <img 
                  src={images.facility} 
                  alt="Ժամանակակից բժշկական հաստատություն" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {/* <h3 className="text-xl font-bold mb-2">Արդի տեխնոլոգիաներով հագեցած հաստատություն</h3>
                  <p>Հագեցած վերջին բժշկական տեխնոլոգիաներով՝ պացիենտների օպտիմալ խնամքի համար</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section-padding bg-blue-50">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            {/* <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block mb-4">
              Կարծիքներ
            </span> */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ինչ են ասում մեր պացիենտները
            </h2>
            {/* <p className="text-gray-600">
              Լսեք մեր գոհ պացիենտների կարծիքները մեր բժշկական ծառայությունների և խնամքի մասին։
            </p> */}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Արթուր Հովհաննիսյան"
              position="Պացիենտ"
              quote="Բարեհամբույր և պրոֆեսիոնալ սպասարկման համար շնորհակալ եմ կլինիկային և հատկապես սրտաբան Արսեն Մարտիրոսյանին։"
            />
            <TestimonialCard 
              name="Մարինե Պետրոսյան"
              position="Պացիենտ"
              quote="Մեր շաաա՜տ սիրելի բժիշկ Սարգսյանը,հիանալի բժիշկ,բանիմաց ու խելացի մասնագետ,բառերը չեն հերիքի նկարագրելու իրեն մարդ տեսակը,մեր ընտանիքի լավագույն բարեկամ։"
            />
            <TestimonialCard 
              name="Վարդան Սարգսյան"
              position="Պացիենտ"
              quote="Ամեն անգամ մուտքից սկսած մինչև բժշկի սենյակ,մաքուր,կոկիկ,ժպտադեմ,ՍԻՐԱԼԻՐ անձնակազմ։ Վերաբերմունք սկսած օր վերցնելուցդ մինչև բուժմանդ ընթացքը եւ արդյունքները։ Այսքան սիրուններ մի տեղ գրողը տանի🥰 Մարդ մոռանում ա թե խի ա էկել։"
            />
          </div>
        </div>
      </section>
      
      {/* Appointment CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src={images.reception} 
            alt="Բժշկական կենտրոնի ընդունարան" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/80"></div>
        </div>
        <div className="page-container text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ամրագրեք Ձեր այցելությունը
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Հոգ տարեք Ձեր առողջության մասին։ Մեր փորձառու մասնագետները պատրաստ են Ձեզ ընդունել Ձեզ հարմար ժամանակ։
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

const FeatureItem = ({ title, description }) => (
  <div className="flex items-start">
    <div className="mr-4 mt-1">
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({ name, position, quote }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-soft p-6 hover-scale">
    <svg className="w-12 h-12 text-blue-200 mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
    <p className="text-gray-600 mb-6">{quote}</p>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
        {name.charAt(0)}
      </div>
      <div className="ml-4">
        <h4 className="font-bold">{name}</h4>
        <p className="text-gray-500 text-sm">{position}</p>
      </div>
    </div>
  </div>
);

export default Index;
