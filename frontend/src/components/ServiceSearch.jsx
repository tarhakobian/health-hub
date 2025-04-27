
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Search, X } from 'lucide-react';

const ServiceSearch = ({ services, onServiceSelect, selectedService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Clear search when no service is selected
    if (!selectedService) {
      setSearchQuery('');
    }
  }, [selectedService]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setIsDropdownOpen(true);
    }
  };

  const handleServiceSelect = (serviceId) => {
    onServiceSelect(serviceId);
    setIsDropdownOpen(false);
    
    // Find the service and set it as search query
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setSearchQuery(service.title);
    }
  };

  const clearSelection = () => {
    setSearchQuery('');
    onServiceSelect(null);
  };

  const filteredServices = searchQuery
    ? services.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : services;

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="flex">
          <div className="relative flex-grow">
            <Input
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Որոնել ծառայություն..."
              className="pl-10 pr-10 py-3 h-12 text-lg w-full"
              onFocus={() => setIsDropdownOpen(true)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            {searchQuery && (
              <button 
                onClick={clearSelection}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg z-10">
            <Command>
              <CommandList>
                <CommandEmpty>Ծառայություններ չեն գտնվել</CommandEmpty>
                <CommandGroup>
                  {filteredServices.map((service) => (
                    <CommandItem
                      key={service.id}
                      value={service.id}
                      onSelect={() => handleServiceSelect(service.id)}
                      className={`flex items-center p-3 hover:bg-blue-50 cursor-pointer ${
                        selectedService === service.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <img src={service.icon} alt={service.title} className="w-10 h-10 mr-3 rounded" />
                      <span className="font-medium">{service.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSearch;
