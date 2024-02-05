interface ChopperType {
  id: number;
  image: string;
  title: string;
  address: string;
  rating: number;
  reviews: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  availabilities: {
    date: string;
    availabilities: {
      start: string;
      end: string;
    }[];
  }[];
}

export default ChopperType;
