// ABOUTME: Fake data for testing HG Pro portal features
// ABOUTME: Includes orders, materials, account info, and user profiles

export interface Order {
  id: string;
  jobName?: string;
  date: string;
  material: string;
  tons: number;
  deliveryAddress: string;
  status: 'delivered' | 'in-transit' | 'scheduled';
  total: number;
}

export interface AccountManager {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  companyName: string;
}

export interface BillingInfo {
  creditLimit: number;
  creditUsed: number;
  currentBalance: number;
  lastPaymentDate: string;
  lastPaymentAmount: number;
}

export const MATERIALS = [
  '57 Gravel',
  '3/8 Gravel',
  'Pea Gravel',
  'Fill Dirt',
  'Road Base',
  'Topsoil',
];

export const COMPANY_TYPES = [
  'Playground Surfaces',
  'Turf',
  'Electrical',
  'Property Management',
  'Pool Contractors',
];

export const fakeUser: User = {
  id: '1',
  email: 'contractor@example.com',
  name: 'John Smith',
  companyName: 'Smith Contracting LLC',
};

export const fakeAccountManager: AccountManager = {
  name: 'Max Cannon',
  phone: '504-323-6496',
  email: 'max@hellogravel.com',
  photo: '👤',
};

export const fakeBillingInfo: BillingInfo = {
  creditLimit: 50000,
  creditUsed: 12500,
  currentBalance: 3200,
  lastPaymentDate: '2024-11-15',
  lastPaymentAmount: 4800,
};

export const fakeOrders: Order[] = [
  {
    id: 'ORD-1001',
    jobName: 'Oak Street Driveway',
    date: '2024-12-15',
    material: '57 Gravel',
    tons: 25,
    deliveryAddress: '1234 Oak Street, Austin, TX 78701',
    status: 'delivered',
    total: 1250,
  },
  {
    id: 'ORD-1002',
    jobName: 'Elm Ave Parking Lot',
    date: '2024-12-10',
    material: 'Pea Gravel',
    tons: 15,
    deliveryAddress: '5678 Elm Avenue, Austin, TX 78702',
    status: 'delivered',
    total: 825,
  },
  {
    id: 'ORD-1003',
    jobName: 'Elm Ave Parking Lot',
    date: '2024-12-05',
    material: 'Road Base',
    tons: 50,
    deliveryAddress: '5678 Elm Avenue, Austin, TX 78702',
    status: 'delivered',
    total: 2100,
  },
  {
    id: 'ORD-1004',
    jobName: 'Maple Drive Landscaping',
    date: '2024-11-28',
    material: 'Fill Dirt',
    tons: 100,
    deliveryAddress: '3456 Maple Drive, Cedar Park, TX 78613',
    status: 'delivered',
    total: 3500,
  },
  {
    id: 'ORD-1005',
    jobName: 'Birch Lane Property',
    date: '2024-11-20',
    material: 'Topsoil',
    tons: 30,
    deliveryAddress: '7890 Birch Lane, Georgetown, TX 78626',
    status: 'delivered',
    total: 1650,
  },
  {
    id: 'ORD-1006',
    jobName: 'Birch Lane Property',
    date: '2024-11-15',
    material: '3/8 Gravel',
    tons: 20,
    deliveryAddress: '7890 Birch Lane, Georgetown, TX 78626',
    status: 'delivered',
    total: 1100,
  },
  {
    id: 'ORD-1007',
    jobName: 'Walnut Court Development',
    date: '2024-12-20',
    material: '57 Gravel',
    tons: 40,
    deliveryAddress: '6789 Walnut Court, Austin, TX 78703',
    status: 'scheduled',
    total: 2000,
  },
  {
    id: 'ORD-1008',
    jobName: 'Oak Street Driveway',
    date: '2024-12-18',
    material: 'Pea Gravel',
    tons: 12,
    deliveryAddress: '1234 Oak Street, Austin, TX 78701',
    status: 'in-transit',
    total: 660,
  },
];

// Fake authentication - in real app this would call an API
export const fakeAuth = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Accept any email/password for testing
    return fakeUser;
  },

  signup: async (email: string, password: string, primaryContactName: string, companyName: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      ...fakeUser,
      email,
      name: primaryContactName,
      companyName,
    };
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
  },
};
