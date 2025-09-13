// Auth utilities: cleanup and token storage helpers
export const cleanupAuthState = () => {
  try {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (e) {
    // no-op
  }
};

// Move Supabase auth keys from localStorage to sessionStorage (for "Remember me" = false)
export const moveAuthKeysToSession = () => {
  try {
    const keysToMove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        keysToMove.push(key);
      }
    }
    keysToMove.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) sessionStorage.setItem(key, value);
      localStorage.removeItem(key);
    });
  } catch (e) {
    // no-op
  }
};
