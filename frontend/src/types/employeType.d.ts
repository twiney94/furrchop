interface EmployeeType {
  id: number;
  shop: string;
  bookings: string[];
  leaves: any[]; // Remplacez `any` par un type plus spécifique si nécessaire
  schedules: any[]; // Remplacez `any` par un type plus spécifique si nécessaire
  name: string;
}

export default EmployeeType;
