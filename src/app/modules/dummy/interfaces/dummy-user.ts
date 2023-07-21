export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  image: string
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

export interface Coordinates {
  lat: string;
  lng: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  address: CompanyAddress;
  department: string;
  name: string;
  title: string;
}

export interface CompanyAddress {
  address: string;
  city: string;
  postalCode: string;
  state: string;
  coordinates: CompanyCoordinates;
}

export interface CompanyCoordinates {
  lat: number;
  lng: number;
}
