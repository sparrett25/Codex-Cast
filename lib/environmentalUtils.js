export const parseMoonPhase = (phase) => {
  switch (phase.toLowerCase()) {
    case 'new moon': return 0;
    case 'waxing crescent': return 1;
    case 'first quarter': return 2;
    case 'waxing gibbous': return 3;
    case 'full moon': return 4;
    case 'waning gibbous': return 5;
    case 'last quarter': return 6;
    case 'waning crescent': return 7;
    default: return -1;
  }
};