/**
 * Saklar Mode Demo PasCall Kantin
 * Hanya aktif jika VITE_USE_DUMMY === 'true' DAN sedang dalam mode DEV (tidak pernah aktif di production build).
 */

let hasLoggedDemoInfo = false;

export const isDummyMode = () => {
  const active = import.meta.env.VITE_USE_DUMMY === 'true' && import.meta.env.DEV === true;
  if (active && !hasLoggedDemoInfo) {
    hasLoggedDemoInfo = true;
    console.info('[PasCall] MODE DEMO aktif - memakai data contoh');
  }
  return active;
};
