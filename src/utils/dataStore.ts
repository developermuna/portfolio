// Data is now managed by Supabase and the useSupabaseData hook.
// This file only retains Authentication logic.

// --- AUTHENTICATION ---

const SESSION_KEY = 'muna_admin_session';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(SESSION_KEY) === 'true';
};

export const login = async (id: string, password: string): Promise<boolean> => {
  const expectedId = import.meta.env.VITE_ADMIN_ID || 'admin';
  const expectedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH || '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

  if (id === expectedId) {
    const passwordHash = await sha256(password);
    if (passwordHash === expectedHash) {
      localStorage.setItem(SESSION_KEY, 'true');
      return true;
    }
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};
