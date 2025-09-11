export function suggestSpecies({ temperature, weather }) {
  const suggestions = [];

  if (weather === 'Overcast' && temperature >= 60 && temperature <= 80) {
    suggestions.push('Largemouth Bass');
  }
  if (weather === 'Sunny' && temperature >= 75 && temperature <= 90) {
    suggestions.push('Tilapia');
  }
  if (weather === 'Rainy' && temperature >= 65 && temperature <= 85) {
    suggestions.push('Catfish');
  }

  return suggestions;
}
