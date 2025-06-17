export const getRarityColor = (rarity) => {
  switch(rarity) {
    case 'Secret Rare': return 'text-purple-600 bg-purple-100'
    case 'Ultra Rare': return 'text-blue-600 bg-blue-100'
    case 'Super Rare': return 'text-pink-600 bg-pink-100'
    case 'Holo Rare': return 'text-yellow-600 bg-yellow-100'
    case 'Leader Rare': return 'text-red-600 bg-red-100'
    case 'Rare': return 'text-green-600 bg-green-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

// Utility functions for common component operations

/**
 * Creates consistent transition classes for dark mode
 * @param {string} additionalClasses - Additional classes to include
 * @returns {string} - Combined transition classes
 */
export const createTransitionClasses = (additionalClasses = '') => {
  const baseTransitions = 'transition-all duration-theme ease-smooth'
  return `${baseTransitions} ${additionalClasses}`.trim()
}

/**
 * Creates dark mode responsive classes with smooth transitions
 * @param {string} lightClasses - Classes for light mode
 * @param {string} darkClasses - Classes for dark mode
 * @param {string} additionalClasses - Additional classes
 * @returns {string} - Combined classes with transitions
 */
export const createDarkModeClasses = (lightClasses, darkClasses, additionalClasses = '') => {
  const transitions = createTransitionClasses()
  return `${transitions} ${lightClasses} ${darkClasses} ${additionalClasses}`.trim()
}

/**
 * Throttle function to limit rapid function calls
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

/**
 * Debounce function to delay function execution
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
} 