import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ChevronRight,
  Award,
  Building,
  CheckCircle,
  Languages,
  Clock,
  Calendar
} from 'lucide-react';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty && selectedSpecialty !== 'all'
        ? doctor.specialty === selectedSpecialty
        : true;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Background Image */}
      <section
        className="py-20 bg-center bg-cover bg-no-repeat relative"
        style={{
          backgroundImage:
            'url("/images/230c64ca-201d-4ced-865a-1699763a5a30.png")'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70"></div>

        <div className="page-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ձեր առողջությունը մեր ամենօրյա աշխատանքն է
            </h1>
          </div>
        </div>
      </section>

      {/* Main Doctors Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 mt-12">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Որոնել բժշկի"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full sm:w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="" disabled>
                Ըստ մասնագիտության
              </option>
              <option value="all">Բոլոր մասնագիտությունները</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedDoctor ? (
          <div className="mb-8">
            <Button
              variant="outline"
              className="mb-4 flex items-center gap-2"
              onClick={() => setSelectedDoctor(null)}
            >
              <ChevronRight className="rotate-180" />
              Վերադառնալ բժիշկների ցանկին
            </Button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedDoctor.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    {selectedDoctor.specialty}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <Award className="text-primary" />
                    <span>{selectedDoctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="text-primary" />
                    <span>{selectedDoctor.education}</span>
                  </div>

                  <p className="mb-6">{selectedDoctor.description}</p>

                  <h3 className="text-xl font-semibold mb-3">Որակավորումներ</h3>
                  <ul className="mb-6 space-y-2">
                    {selectedDoctor.qualifications.map((qualification, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          className="text-primary shrink-0 mt-1"
                          size={18}
                        />
                        <span>{qualification}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link to="/appointment">
                      <Button className="w-full md:w-auto">
                        <Calendar className="mr-2" />
                        Ամրագրել այցելություն
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover object-center"
                />
                <CardContent className="p-5">
                  <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
                  <p className="text-gray-600 mb-3">{doctor.specialty}</p>
                  <Separator className="my-3" />
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-primary" size={18} />
                    <span className="text-sm">{doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="text-primary" size={18} />
                    <span className="text-sm">{doctor.education}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    Դիտել մանրամասները
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
