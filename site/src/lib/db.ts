import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock_quantity: number;
  description: string;
  image_url: string;
  featured: boolean;
  created_at?: string;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  device_type: string;
  requested_date: string;
  message: string;
  status: 'nouveau' | 'traité';
  created_at: string;
}

export interface Sale {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
  created_at: string;
}

export interface Settings {
  whatsapp_number_1: string;
  whatsapp_number_2: string;
  address_akwa: string;
  address_nkouabang: string;
  admin_password?: string;
}

const DEFAULT_SETTINGS: Settings = {
  whatsapp_number_1: '237676886733',
  whatsapp_number_2: '237657941527',
  address_akwa: 'Boutique N30, Galeries du Congo, Akwa, Douala',
  address_nkouabang: 'Carrefour Nkouabang, Douala',
  admin_password: 'admin'
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Laptop HP ProBook 450 G9',
    category: 'Ordinateurs',
    price: 450000,
    stock_quantity: 5,
    description: 'Intel Core i5 12ème gén., 8 Go RAM, 256 Go SSD. Performant et robuste.',
    image_url: '/assets/images/laptop_front-1784329995010.png',
    featured: true,
  },
  {
    id: '2',
    name: 'Dell Latitude 5421',
    category: 'Ordinateurs',
    price: 199000,
    stock_quantity: 5,
    description: 'Intel Core i5-11400H 11e Gén (jusqu\'à 4.50GHz, 12 CPUs), 16 Go RAM DDR4, 256 Go SSD ultra rapide, Écran 14" Full HD, Clavier rétroéclairé. Batterie excellent état. Garantie 3 mois.',
    image_url: '/assets/images/dell_latitude_5421_1.png',
    featured: true,
  },
  {
    id: '3',
    name: 'Dell XPS 15 9510',
    category: 'Ordinateurs',
    price: 350000,
    stock_quantity: 3,
    description: 'Intel Core i5-11400H (11e Gén, 12 CPUs), 16 Go RAM DDR4, 256 Go SSD, Intel Iris Xe Graphics, Écran 15.6" Full HD+ IPS InfinityEdge, Clavier rétroéclairé, Déverrouillage facial & Empreinte. Garantie 6 mois.',
    image_url: '/assets/images/dell_xps_15_1.png',
    featured: true,
  },
  {
    id: '4',
    name: 'Dell Latitude 7390 Tactile',
    category: 'Ordinateurs',
    price: 180000,
    stock_quantity: 4,
    description: 'Intel Core i5, 8 Go RAM, 256 Go SSD, Écran 13.3" tactile Full HD. Compact, léger et performant. Idéal professionnels et étudiants.',
    image_url: '/assets/images/dell_7390_1.png',
    featured: true,
  },
  {
    id: '5',
    name: 'Microsoft Surface Book 2',
    category: 'Ordinateurs',
    price: 320000,
    stock_quantity: 2,
    description: 'Intel Core i5, 8 Go RAM, 256 Go SSD, Écran tactile détachable haute résolution. L\'alliance parfaite d\'une tablette et d\'un PC ultra-puissant.',
    image_url: '/assets/images/surface_book_2_full.png',
    featured: true,
  },
  {
    id: '6',
    name: 'Clavier Gaming RGB',
    category: 'Périphériques',
    price: 35000,
    stock_quantity: 12,
    description: 'Clavier mécanique rétroéclairé RGB avec switches réactifs et repose-poignet ergonomique.',
    image_url: '/assets/images/keyboard_gaming-1784329994862.png',
    featured: false,
  },
  {
    id: '7',
    name: 'Souris Sans Fil Ergonomique',
    category: 'Périphériques',
    price: 18000,
    stock_quantity: 10,
    description: 'Souris ergonomique sans fil, résolution réglable jusqu\'à 2400 DPI, batterie longue durée.',
    image_url: '/assets/images/mouse-1784329995357.png',
    featured: false,
  },
  {
    id: '8',
    name: 'Support Laptop Aluminium',
    category: 'Accessoires',
    price: 22000,
    stock_quantity: 8,
    description: 'Support réglable en aluminium robuste, compatible avec les ordinateurs portables de 11 à 17 pouces.',
    image_url: '/assets/images/laptopn_stand-1784329994358.png',
    featured: false,
  },
];

const getLocalStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};

const setLocalStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
};

const initLocalStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('ut_products')) {
    localStorage.setItem('ut_products', JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem('ut_appointments')) {
    localStorage.setItem('ut_appointments', JSON.stringify([]));
  }
  if (!localStorage.getItem('ut_sales')) {
    localStorage.setItem('ut_sales', JSON.stringify([]));
  }
  if (!localStorage.getItem('ut_settings')) {
    localStorage.setItem('ut_settings', JSON.stringify(DEFAULT_SETTINGS));
  }
};

export const getProducts = async (): Promise<Product[]> => {
  initLocalStorage();
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) return data as Product[];
    console.error('Erreur Supabase, bascule sur LocalStorage:', error);
  }
  const local = getLocalStorageItem('ut_products');
  return local ? JSON.parse(local) : INITIAL_PRODUCTS;
};

export const saveProduct = async (product: Omit<Product, 'id'> & { id?: string }): Promise<Product> => {
  initLocalStorage();
  const id = product.id || Math.random().toString(36).substring(2, 9);
  const newProduct = { ...product, id } as Product;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('products').upsert(newProduct).select().single();
    if (!error && data) return data as Product;
    console.error('Erreur Supabase, bascule sur LocalStorage:', error);
  }

  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index >= 0) {
    products[index] = newProduct;
  } else {
    products.unshift(newProduct);
  }
  setLocalStorageItem('ut_products', JSON.stringify(products));
  return newProduct;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  initLocalStorage();
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) return true;
    console.error('Erreur Supabase, bascule sur LocalStorage:', error);
  }

  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  setLocalStorageItem('ut_products', JSON.stringify(filtered));
  return true;
};

export const getAppointments = async (): Promise<Appointment[]> => {
  initLocalStorage();
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
    if (!error && data) return data as Appointment[];
    console.error('Erreur Supabase, bascule sur LocalStorage:', error);
  }
  const local = getLocalStorageItem('ut_appointments');
  return local ? JSON.parse(local) : [];
};

export const saveAppointment = async (appt: Omit<Appointment, 'id' | 'status' | 'created_at'>): Promise<Appointment> => {
  initLocalStorage();
  const newAppt: Appointment = {
    ...appt,
    id: Math.random().toString(36).substring(2, 9),
    status: 'nouveau',
    created_at: new Date().toISOString().split('T')[0]
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('appointments').insert(newAppt).select().single();
    if (!error && data) return data as Appointment;
    console.error('Erreur Supabase, bascule sur LocalStorage:', error);
  }

  const appts = await getAppointments();
  appts.unshift(newAppt);
  setLocalStorageItem('ut_appointments', JSON.stringify(appts));
  return newAppt;
};

export const updateAppointmentStatus = async (id: string, status: 'nouveau' | 'traité'): Promise<Appointment | null> => {
  initLocalStorage();
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('appointments').update({ status }).eq('id', id).select().single();
    if (!error && data) return data as Appointment;
    console.error('Erreur Supabase, bascule sur LocalStorage:', error);
  }

  const appts = await getAppointments();
  const index = appts.findIndex((a) => a.id === id);
  if (index >= 0) {
    appts[index].status = status;
    setLocalStorageItem('ut_appointments', JSON.stringify(appts));
    return appts[index];
  }
  return null;
};

export const getSales = async (): Promise<Sale[]> => {
  initLocalStorage();
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('sales').select('*').order('created_at', { ascending: false });
    if (!error && data) return data as Sale[];
    console.error('Erreur Supabase, bascule sur LocalStorage:', error);
  }
  const local = getLocalStorageItem('ut_sales');
  return local ? JSON.parse(local) : [];
};

export const saveSale = async (sale: Omit<Sale, 'id' | 'created_at'>): Promise<Sale> => {
  initLocalStorage();
  const newSale: Sale = {
    ...sale,
    id: Math.random().toString(36).substring(2, 9),
    created_at: new Date().toISOString()
  };

  const products = await getProducts();
  const prodIndex = products.findIndex((p) => p.id === sale.product_id);
  if (prodIndex >= 0) {
    products[prodIndex].stock_quantity = Math.max(0, products[prodIndex].stock_quantity - sale.quantity);
    await saveProduct(products[prodIndex]);
  }

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('sales').insert(newSale).select().single();
    if (!error && data) return data as Sale;
    console.error('Erreur Supabase, bascule sur LocalStorage:', error);
  }

  const sales = await getSales();
  sales.unshift(newSale);
  setLocalStorageItem('ut_sales', JSON.stringify(sales));
  return newSale;
};

export const getSettings = async (): Promise<Settings> => {
  initLocalStorage();
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('settings').select('*');
    if (!error && data && data.length > 0) {
      const settingsObj: any = {};
      data.forEach((row: any) => {
        settingsObj[row.key] = row.value;
      });
      return { ...DEFAULT_SETTINGS, ...settingsObj } as Settings;
    }
    console.error('Erreur Supabase, bascule sur LocalStorage:', error);
  }
  const local = getLocalStorageItem('ut_settings');
  return local ? { ...DEFAULT_SETTINGS, ...JSON.parse(local) } : DEFAULT_SETTINGS;
};

export const saveSettings = async (settings: Settings): Promise<Settings> => {
  initLocalStorage();
  if (isSupabaseConfigured && supabase) {
    const promises = Object.entries(settings).map(([key, value]) =>
      supabase.from('settings').upsert({ key, value })
    );
    await Promise.all(promises);
  }

  setLocalStorageItem('ut_settings', JSON.stringify(settings));
  return settings;
};

export function getProductMainImage(imageUrl: string): string {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('[')) {
    try {
      const arr = JSON.parse(imageUrl);
      if (Array.isArray(arr) && arr.length > 0) {
        return arr[0];
      }
    } catch (e) {
      // ignore
    }
  }
  return imageUrl;
}

export function getProductAllImages(imageUrl: string): string[] {
  if (!imageUrl) return [];
  if (imageUrl.startsWith('[')) {
    try {
      const arr = JSON.parse(imageUrl);
      if (Array.isArray(arr)) {
        return arr.filter(Boolean);
      }
    } catch (e) {
      // ignore
    }
  }
  return [imageUrl].filter(Boolean);
}
