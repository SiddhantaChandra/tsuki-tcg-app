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