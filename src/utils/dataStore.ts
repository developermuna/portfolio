import { projects, products, certifications } from '../data/portfolioData';

// Types
export type Project = typeof projects[0];
export type Product = typeof products[0];
export type Certification = typeof certifications[0];

// Keys
const PROJECTS_KEY = 'muna_portfolio_projects';
const PRODUCTS_KEY = 'muna_portfolio_products';
const CERTS_KEY = 'muna_portfolio_certs';

// Helper to get from local storage
const getLocalData = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return [];
  }
};

// Helper to set to local storage
const setLocalData = <T>(key: string, data: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
};

// Helper for sorting numerically by ID/number
const sortByNumber = (a: any, b: any) => {
  const numA = parseInt((a.number || a.id || '').replace(/\D/g, ''), 10) || 0;
  const numB = parseInt((b.number || b.id || '').replace(/\D/g, ''), 10) || 0;
  return numA - numB;
};

// Getters (Merges static + local, then sorts)
export const getProjects = (): Project[] => {
  const localProjects = getLocalData<Project>(PROJECTS_KEY);
  return [...localProjects, ...projects].sort(sortByNumber);
};

export const getProducts = (): Product[] => {
  const localProducts = getLocalData<Product>(PRODUCTS_KEY);
  return [...localProducts, ...products].sort(sortByNumber);
};

export const getCertifications = (): Certification[] => {
  const localCerts = getLocalData<Certification>(CERTS_KEY);
  return [...localCerts, ...certifications].sort(sortByNumber);
};

// Adders
export const addProject = (project: Project) => {
  if (getProjects().some(p => p.number === project.number)) throw new Error('ID already exists');
  const localProjects = getLocalData<Project>(PROJECTS_KEY);
  setLocalData(PROJECTS_KEY, [project, ...localProjects]);
};

export const updateProject = (number: string, updatedProject: Project) => {
  if (number !== updatedProject.number && getProjects().some(p => p.number === updatedProject.number)) throw new Error('ID already exists');
  const localProjects = getLocalData<Project>(PROJECTS_KEY);
  const newProjects = localProjects.map(p => p.number === number ? updatedProject : p);
  setLocalData(PROJECTS_KEY, newProjects);
};

export const deleteProject = (number: string) => {
  const localProjects = getLocalData<Project>(PROJECTS_KEY);
  const newProjects = localProjects.filter(p => p.number !== number);
  setLocalData(PROJECTS_KEY, newProjects);
};

export const addProduct = (product: Product) => {
  if (getProducts().some(p => p.id === product.id)) throw new Error('ID already exists');
  const localProducts = getLocalData<Product>(PRODUCTS_KEY);
  setLocalData(PRODUCTS_KEY, [product, ...localProducts]);
};

export const updateProduct = (id: string, updatedProduct: Product) => {
  if (id !== updatedProduct.id && getProducts().some(p => p.id === updatedProduct.id)) throw new Error('ID already exists');
  const localProducts = getLocalData<Product>(PRODUCTS_KEY);
  const newProducts = localProducts.map(p => p.id === id ? updatedProduct : p);
  setLocalData(PRODUCTS_KEY, newProducts);
};

export const deleteProduct = (id: string) => {
  const localProducts = getLocalData<Product>(PRODUCTS_KEY);
  const newProducts = localProducts.filter(p => p.id !== id);
  setLocalData(PRODUCTS_KEY, newProducts);
};

export const addCertification = (cert: Certification) => {
  if (getCertifications().some(c => c.id === cert.id)) throw new Error('ID already exists');
  const localCerts = getLocalData<Certification>(CERTS_KEY);
  setLocalData(CERTS_KEY, [cert, ...localCerts]);
};

export const updateCertification = (id: string, updatedCert: Certification) => {
  if (id !== updatedCert.id && getCertifications().some(c => c.id === updatedCert.id)) throw new Error('ID already exists');
  const localCerts = getLocalData<Certification>(CERTS_KEY);
  const newCerts = localCerts.map(c => c.id === id ? updatedCert : c);
  setLocalData(CERTS_KEY, newCerts);
};

export const deleteCertification = (id: string) => {
  const localCerts = getLocalData<Certification>(CERTS_KEY);
  const newCerts = localCerts.filter(c => c.id !== id);
  setLocalData(CERTS_KEY, newCerts);
};

// --- AUTHENTICATION ---

const CREDENTIALS_KEY = 'muna_admin_credentials';
const SESSION_KEY = 'muna_admin_session';

export const getAdminCredentials = () => {
  try {
    const data = localStorage.getItem(CREDENTIALS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error reading credentials', e);
  }
  return { id: 'admin', password: 'admin123' };
};

export const setAdminCredentials = (id: string, password: string) => {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ id, password }));
  } catch (e) {
    console.error('Error saving credentials', e);
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(SESSION_KEY) === 'true';
};

export const login = (id: string, password: string): boolean => {
  const creds = getAdminCredentials();
  if (id === creds.id && password === creds.password) {
    localStorage.setItem(SESSION_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};
