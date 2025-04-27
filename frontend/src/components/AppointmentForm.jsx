
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const AppointmentForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultDoctor = queryParams.get('doctor') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: defaultDoctor,
    service: '',
    date: '',
    time: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const doctors = [
    { id: '1', name: 'Դր․ Արմեն Մկրտչյան', specialty: 'Ակնաբույժ' },
    { id: '2', name: 'Դր․ Լիլիթ Գրիգորյան', specialty: 'Ակնաբույժ' },
    { id: '3', name: 'Դր․ Սուրեն Պետրոսյան', specialty: 'Գաստրոէնտերոլոգ' },
    { id: '4', name: 'Դր․ Նարինե Հակոբյան', specialty: 'Գաստրոէնտերոլոգ' },
    { id: '5', name: 'Դր․ Մարիամ Սարգսյան', specialty: 'Գինեկոլոգ' },
    { id: '6', name: 'Դր․ Անահիտ Մելքոնյան', specialty: 'Գինեկոլոգ' },
    { id: '7', name: 'Դր․ Վահե Գևորգյան', specialty: 'Էնդոկրինոլոգ' },
    { id: '8', name: 'Դր․ Սոնա Ավետիսյան', specialty: 'Էնդոկրինոլոգ' },
    { id: '9', name: 'Դր․ Արմեն Հակոբյան', specialty: 'Թերապևտ' },
    { id: '10', name: 'Դր․ Լիլիթ Մարտիրոսյան', specialty: 'Թերապևտ' },
    { id: '11', name: 'Դր․ Արամ Հակոբյան', specialty: 'Թոքաբան' },
    { id: '12', name: 'Դր․ Մարիամ Սարգսյան', specialty: 'Թոքաբան' },
    { id: '13', name: 'Դր․ Արամ Սահակյան', specialty: 'Կինեզիոթերապիստ' },
    { id: '14', name: 'Դր․ Անահիտ Կարապետյան', specialty: 'Կինեզիոթերապիստ' },
    { id: '15', name: 'Դր․ Գագիկ Պետրոսյան', specialty: 'Հոգեբան' },
    { id: '16', name: 'Դր․ Նարինե Գևորգյան', specialty: 'Հոգեբան' },
    { id: '17', name: 'Դր․ Անի Մինասյան', specialty: 'Մաշկաբան' },
    { id: '18', name: 'Դր․ Հակոբ Մկրտչյան', specialty: 'Մաշկաբան' },
    { id: '19', name: 'Դր․ Արամ Հակոբյան', specialty: 'Նյարդաբան' },
    { id: '20', name: 'Դր․ Լիլիթ Մկրտչյան', specialty: 'Նյարդաբան' },
    { id: '21', name: 'Դր․ Վահան Պետրոսյան', specialty: 'Ուրոլոգ' },
    { id: '22', name: 'Դր․ Կարեն Դավթյան', specialty: 'Ուրոլոգ' },
    { id: '23', name: 'Դր․ Նարեկ Ավետիսյան', specialty: 'Ռենտգենոլոգ' },
    { id: '24', name: 'Դր․ Անի Գրիգորյան', specialty: 'Ռենտգենոլոգ' },
    { id: '25', name: 'Դր․ Հովհաննես Սարգսյան', specialty: 'Սոնոգրաֆիստ' },
    { id: '26', name: 'Դր․ Աննա Մանուկյան', specialty: 'Սոնոգրաֆիստ' },
    { id: '27', name: 'Դր․ Արսեն Մարտիրոսյան', specialty: 'Սրտաբան' },
    { id: '28', name: 'Դր․ Արման Հակոբյան', specialty: 'Սրտաբան' },
    { id: '29', name: 'Դր․ Արմինե Գրիգորյանն', specialty: 'Վնասվածքաբան' },
    { id: '30', name: 'Դր․ Վահե Մարտիրոսյան', specialty: 'Վնասվածքաբան' },
    { id: '31', name: 'Դր․ Լիլիթ Ավետիսյան', specialty: 'Ակնաբույժ' },
    { id: '32', name: 'Դր․ Դավիթ Մանուկյան', specialty: 'Ակնաբույժ' },
  ];
  
  const services = [
    { id: 'gastroenterology', name: 'Գաստրոէնտերոլոգիա' },
    { id: 'gynecology', name: 'Գինեկոլոգիա' },
    { id: 'endocrinology', name: 'Էնդոկրինոլոգիա' },
    { id: 'family-medicine', name: 'Թերապիա | Ընտանեկան բժշկություն' },
    { id: 'pulmonology', name: 'Թոքաբանություն | Բրոնխոսկոպիա' },
    { id: 'kinesitherapy', name: 'Կինեզոթերապիա | Բրոնխոսկոպիա' },
    { id: 'psychology', name: 'Հոգեբանություն' },
    { id: 'pediatrics', name: 'Մանկաբուժություն' },
    { id: 'dermatology', name: 'Մաշկաբանություն' },
    { id: 'neurology', name: 'Նյարդաբանություն' },
    { id: 'urology', name: 'Ուրոլոգիա' },
    { id: 'radiology', name: 'Ռենտգեն' },
    { id: 'sonography', name: 'Սոնոգրաֆիա' },
    { id: 'cardiology', name: 'Սրտաբանություն' },
    { id: 'traumatology', name: 'Վնասվածքաբանություն և օրթոպեդիա' },
    { id: 'ophthalmology', name: 'Ակնաբուժություն' },
  ];
  
  const timeSlots = [
    '09:00', '10:00', '11:00', 
    '12:00', '13:00', '14:00', 
    '15:00', '16:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // This is where you would normally send the data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate successful submission
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          doctor: '',
          service: '',
          date: '',
          time: '',
          message: '',
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-fade-in">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Գրանցումը հաստատված է!</h3>
          <p className="text-gray-600">
            Շնորհակալություն Մեդ Կենտրոնում գրանցվելու համար։ Մենք շուտով կկապվենք Ձեզ հետ՝ հաստատելու Ձեր այցելության մանրամասները։
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Անուն Ազգանուն*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Մուտքագրեք Ձեր անուն ազգանունը"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Հեռախոսահամար*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Մուտքագրեք Ձեր հեռախոսահամարը"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Էլ. փոստի հասցե
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Մուտքագրեք Ձեր էլ. փոստի հասցեն"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                  Ընտրեք բժշկին*
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Ընտրեք բժշկին</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Ընտրեք ծառայությունը*
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Ընտրեք ծառայությունը</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Նախընտրելի ամսաթիվ*
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Նախընտրելի ժամ*
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Ընտրեք ժամը</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Լրացուցիչ տեղեկություն
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Խնդրում ենք տրամադրել ցանկացած լրացուցիչ տեղեկություն Ձեր այցի վերաբերյալ"
              ></textarea>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium shadow-button hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Մշակվում է...
              </span>
            ) : (
              "Ամրագրել այցելություն"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
