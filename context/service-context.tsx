"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";
import { services, type Service } from "@/data/services";

interface Filters {
  categories: string[];
  locations: string[];
  availability: string[];
  status: string[];
}

interface ServiceContextType {
  services: Service[];
  filteredServices: Service[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  comparison: Service[];
  addToComparison: (service: Service) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  addBooking: (booking: Booking) => void;
  updateServiceStatus: (
    id: string,
    status: "Pending" | "Approved" | "Rejected",
  ) => void;
  deleteService: (id: string) => void;
}

type Booking = {
  serviceId: string;
  date: string;
  time: string;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    locations: [],
    availability: [],
    status: [],
  });
  const [comparison, setComparison] = useState<Service[]>([]);
  const [servicesList, setServicesList] = useState<Service[]>(services);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.locations.length > 0 ||
    filters.availability.length > 0 ||
    filters.status.length > 0;

  const clearFilters = () => {
    setFilters({
      categories: [],
      locations: [],
      availability: [],
      status: [],
    });
  };

  const filteredServices = useMemo(() => {
    return servicesList.filter((service) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(service.category);

      // Location filter
      const matchesLocation =
        filters.locations.length === 0 ||
        filters.locations.some((loc) => service.location.includes(loc));

      // Availability filter
      const matchesAvailability =
        filters.availability.length === 0 ||
        filters.availability.includes(service.availability);

      const matchStatus =
        filters.status.length === 0 || filters.status.includes(service.status);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesAvailability &&
        matchStatus
      );
    });
  }, [searchQuery, filters, servicesList]);

  const addToComparison = (service: Service) => {
    if (comparison.length < 3 && !comparison.find((s) => s.id === service.id)) {
      setComparison([...comparison, service]);
    }
  };

  const removeFromComparison = (id: string) => {
    setComparison(comparison.filter((s) => s.id !== id));
  };

  const clearComparison = () => {
    setComparison([]);
  };

  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (booking: Booking) => {
    setBookings((prev) => {
      const updated = [...prev, booking];
      localStorage.setItem("bookings", JSON.stringify(updated));
      return updated;
    });
  };

  const updateServiceStatus = (
    id: string,
    status: "Pending" | "Approved" | "Rejected",
  ) => {
    setServicesList((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, status } : service,
      ),
    );
  };

  const deleteService = (id: string) => {
    setServicesList((prev) => prev.filter((service) => service.id !== id));
  };

  return (
    <ServiceContext.Provider
      value={{
        services: servicesList,
        filteredServices,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        clearFilters,
        hasActiveFilters,
        comparison,
        addToComparison,
        removeFromComparison,
        clearComparison,
        addBooking,
        updateServiceStatus,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within ServiceProvider");
  }
  return context;
}
