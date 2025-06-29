import { supabase } from './supabase'

// Category UUIDs and slugs from the database
const CATEGORY_IDS = {
  POKEMON: '50fad8b9-161b-491e-a18b-f258ebc7a7a7',
  ONE_PIECE: '558c406c-f43a-4297-b082-09ba01a75a70'
}

const CATEGORY_SLUGS = {
  POKEMON: 'poke',
  ONE_PIECE: 'op'
}

// ==================== CARDS ====================

// Get all cards with related data
export async function getAllCards() {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        condition,
        language,
        price,
        created_at,
        categories (
          id,
          name,
          slug
        ),
        sets (
          id,
          name,
          slug
        ),
        subsets (
          id,
          name,
          slug
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching all cards:', error)
    return []
  }
}

// Get card by ID
export async function getCardById(id) {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        condition,
        language,
        price,
        created_at,
        categories (
          id,
          name,
          slug
        ),
        sets (
          id,
          name,
          slug
        ),
        subsets (
          id,
          name,
          slug
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching card by ID:', error)
    return null
  }
}

// Get cards by category
export async function getCardsByCategory(categorySlug, limit = null) {
  try {
    let query = supabase
      .from('cards')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        condition,
        language,
        price,
        created_at,
        categories!inner (
          id,
          name,
          slug
        ),
        sets (
          id,
          name,
          slug
        ),
        subsets (
          id,
          name,
          slug
        )
      `)
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false })
    
    if (limit) {
      query = query.limit(limit)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error(`Error fetching cards for category ${categorySlug}:`, error)
    return []
  }
}

// Get cards by set slug with filtering
export async function getCardsBySet(setSlug, filters = {}) {
  try {
    let query = supabase
      .from('cards')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        condition,
        language,
        price,
        created_at,
        categories (
          id,
          name,
          slug
        ),
        sets!inner (
          id,
          name,
          slug
        ),
        subsets (
          id,
          name,
          slug
        )
      `)
      .eq('sets.slug', setSlug)

    // Apply price range filter
    if (filters.priceRange) {
      query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1])
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'oldest':
        query = query.order('created_at', { ascending: true })
        break
      case 'price-low':
        query = query.order('price', { ascending: true })
        break
      case 'price-high':
        query = query.order('price', { ascending: false })
        break
      case 'name-asc':
        query = query.order('name', { ascending: true })
        break
      case 'name-desc':
        query = query.order('name', { ascending: false })
        break
      default: // newest
        query = query.order('created_at', { ascending: false })
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error(`Error fetching cards for set ${setSlug}:`, error)
    return []
  }
}

// Get cards by subset slug with filtering
export async function getCardsBySubset(subsetSlug, filters = {}) {
  try {
    let query = supabase
      .from('cards')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        condition,
        language,
        price,
        created_at,
        categories (
          id,
          name,
          slug
        ),
        sets (
          id,
          name,
          slug
        ),
        subsets!inner (
          id,
          name,
          slug
        )
      `)
      .eq('subsets.slug', subsetSlug)

    // Apply price range filter
    if (filters.priceRange) {
      query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1])
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'oldest':
        query = query.order('created_at', { ascending: true })
        break
      case 'price-low':
        query = query.order('price', { ascending: true })
        break
      case 'price-high':
        query = query.order('price', { ascending: false })
        break
      case 'name-asc':
        query = query.order('name', { ascending: true })
        break
      case 'name-desc':
        query = query.order('name', { ascending: false })
        break
      default: // newest
        query = query.order('created_at', { ascending: false })
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error(`Error fetching cards for subset ${subsetSlug}:`, error)
    return []
  }
}

// Get set by slug
export async function getSetBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('sets')
      .select(`
        id,
        name,
        slug,
        created_at,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching set by slug:', error)
    return null
  }
}

// Get subset by slug
export async function getSubsetBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('subsets')
      .select(`
        id,
        name,
        slug,
        release_date,
        created_at,
        sets (
          id,
          name,
          slug,
          categories (
            id,
            name,
            slug
          )
        )
      `)
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching subset by slug:', error)
    return null
  }
}

// Get featured cards (latest high-value cards)
export async function getFeaturedCards(limit = 12) {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        condition,
        language,
        price,
        created_at,
        categories (
          id,
          name,
          slug
        ),
        sets (
          id,
          name,
          slug
        )
      `)
      .gte('price', 100) // Featured cards are higher value
      .order('price', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching featured cards:', error)
    return []
  }
}

// Get recent cards
export async function getRecentCards(limit = 12) {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        condition,
        language,
        price,
        created_at,
        categories (
          id,
          name,
          slug
        ),
        sets (
          id,
          name,
          slug
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching recent cards:', error)
    return []
  }
}

// ==================== SLABS ====================

// Get all slabs with related data
export async function getAllSlabs() {
  try {
    const { data, error } = await supabase
      .from('slabs')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        grade_score,
        condition,
        language,
        price,
        created_at,
        categories (
          id,
          name,
          slug
        ),
        sets (
          id,
          name,
          slug
        ),
        subsets (
          id,
          name,
          slug
        ),
        grade_companies (
          id,
          name,
          slug,
          grades
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching all slabs:', error)
    return []
  }
}

// Get slab by ID
export async function getSlabById(id) {
  try {
    const { data, error } = await supabase
      .from('slabs')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        grade_score,
        condition,
        language,
        price,
        created_at,
        categories (
          id,
          name,
          slug
        ),
        sets (
          id,
          name,
          slug
        ),
        subsets (
          id,
          name,
          slug
        ),
        grade_companies (
          id,
          name,
          slug,
          grades
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching slab by ID:', error)
    return null
  }
}

// Get slabs by category
export async function getSlabsByCategory(categorySlug) {
  try {
    const { data, error } = await supabase
      .from('slabs')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        grade_score,
        condition,
        language,
        price,
        created_at,
        categories!inner (
          id,
          name,
          slug
        ),
        sets (
          id,
          name,
          slug
        ),
        subsets (
          id,
          name,
          slug
        ),
        grade_companies (
          id,
          name,
          slug,
          grades
        )
      `)
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error(`Error fetching slabs for category ${categorySlug}:`, error)
    return []
  }
}

// ==================== ACCESSORIES ====================

// Get all accessories
export async function getAllAccessories() {
  try {
    const { data, error } = await supabase
      .from('accessories')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        accessory_type,
        price,
        description,
        stock_quantity,
        created_at,
        categories (
          id,
          name,
          slug
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching all accessories:', error)
    return []
  }
}

// Get accessory by ID
export async function getAccessoryById(id) {
  try {
    const { data, error } = await supabase
      .from('accessories')
      .select(`
        id,
        name,
        slug,
        image_urls,
        thumbnail_url,
        accessory_type,
        price,
        description,
        stock_quantity,
        created_at,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching accessory by ID:', error)
    return null
  }
}

// ==================== MIXED PRODUCT FUNCTIONS ====================

// Get mixed products for homepage sections
export async function getMixedProducts(type = 'recent', limit = 12) {
  try {
    let cardQuery, slabQuery, accessoryQuery
    
    if (type === 'recent') {
      cardQuery = supabase
        .from('cards')
        .select('id, name, image_urls, thumbnail_url, price, created_at')
        .order('created_at', { ascending: false })
        .limit(Math.ceil(limit / 3))
      
      slabQuery = supabase
        .from('slabs')
        .select('id, name, image_urls, thumbnail_url, price, created_at, grade_score, grade_companies(name)')
        .order('created_at', { ascending: false })
        .limit(Math.ceil(limit / 3))
    
      accessoryQuery = supabase
        .from('accessories')
        .select('id, name, image_urls, thumbnail_url, price, created_at, accessory_type')
        .order('created_at', { ascending: false })
        .limit(Math.ceil(limit / 3))
    
    } else if (type === 'featured') {
      cardQuery = supabase
        .from('cards')
        .select('id, name, image_urls, thumbnail_url, price, created_at')
        .gte('price', 100)
        .order('price', { ascending: false })
        .limit(Math.ceil(limit / 2))
      
      slabQuery = supabase
        .from('slabs')
        .select('id, name, image_urls, thumbnail_url, price, created_at, grade_score, grade_companies(name)')
        .gte('price', 200)
        .order('price', { ascending: false })
        .limit(Math.ceil(limit / 2))
    }

    const [cardsResult, slabsResult, accessoriesResult] = await Promise.all([
      cardQuery,
      slabQuery,
      type === 'recent' ? accessoryQuery : Promise.resolve({ data: [] })
    ])

    const products = []
    
    // Add cards with type identifier
    if (cardsResult.data) {
      products.push(...cardsResult.data.map(item => ({ ...item, type: 'card' })))
    }
    
    // Add slabs with type identifier
    if (slabsResult.data) {
      products.push(...slabsResult.data.map(item => ({ ...item, type: 'slab' })))
    }
    
    // Add accessories with type identifier
    if (accessoriesResult.data) {
      products.push(...accessoriesResult.data.map(item => ({ ...item, type: 'accessory' })))
    }

    // Shuffle and limit results
    const shuffled = products.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, limit)
    
  } catch (error) {
    console.error(`Error fetching mixed products (${type}):`, error)
    return []
  }
}

// ==================== EXISTING FUNCTIONS ====================

// Get Pokemon cards
export async function getPokemonCards(limit = 12) {
  try {
    return await getCardsByCategory(CATEGORY_SLUGS.POKEMON, limit)
  } catch (error) {
    console.error('Error fetching Pokemon cards:', error)
    return []
  }
}

// Get One Piece cards  
export async function getOnePieceCards(limit = 12) {
  try {
    return await getCardsByCategory(CATEGORY_SLUGS.ONE_PIECE, limit)
  } catch (error) {
    console.error('Error fetching One Piece cards:', error)
    return []
  }
}

// Get Pokemon sets
export async function getPokemonSets() {
  try {
    return await getSetsByCategory(CATEGORY_SLUGS.POKEMON)
  } catch (error) {
    console.error('Error fetching Pokemon sets:', error)
    return []
  }
}

// Get One Piece sets
export async function getOnePieceSets() {
  try {
    return await getSetsByCategory(CATEGORY_SLUGS.ONE_PIECE)
  } catch (error) {
    console.error('Error fetching One Piece sets:', error)
    return []
  }
}

// Get sets by category slug (more flexible approach)
export async function getSetsByCategory(categorySlug) {
  try {
    const { data, error } = await supabase
      .from('sets')
      .select(`
        id,
        name,
        slug,
        categories!inner (
          id,
          name,
          slug
        )
      `)
      .eq('categories.slug', categorySlug)
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error(`Error fetching sets for category ${categorySlug}:`, error)
    return []
  }
}

// Get all categories
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug')
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Get all grade companies
export async function getGradeCompanies() {
  try {
    const { data, error } = await supabase
      .from('grade_companies')
      .select('id, name, slug, grades')
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching grade companies:', error)
    return []
  }
}

// Get subsets by set ID
export async function getSubsetsBySetId(setId) {
  try {
    console.log('Fetching subsets for set ID:', setId) // Debug log
    
    const { data, error } = await supabase
      .from('subsets')
      .select('id, name, slug, release_date, set_id')
      .eq('set_id', setId)
      .order('name')
    
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    
    console.log('Fetched subsets:', data) // Debug log
    return data || []
  } catch (error) {
    console.error(`Error fetching subsets for set ${setId}:`, error)
    return []
  }
}

// Debug function to check all subsets
export async function getAllSubsets() {
  try {
    const { data, error } = await supabase
      .from('subsets')
      .select('id, name, slug, set_id, release_date')
      .order('name')
    
    if (error) throw error
    console.log('All subsets:', data)
    return data || []
  } catch (error) {
    console.error('Error fetching all subsets:', error)
    return []
  }
}

// ==================== UTILITY FUNCTIONS ====================

// Convert database condition number to text
export function getConditionText(conditionNumber) {
  const conditions = {
    1: 'Poor',
    2: 'Good',
    3: 'Very Good',
    4: 'Excellent',
    5: 'Near Mint',
    6: 'Mint'
  }
  return conditions[conditionNumber] || 'Unknown'
}

// Get rarity text for display
export function getRarityText(item) {
  if (item.type === 'slab') {
    return `${item.grade_companies?.name || 'Graded'} ${item.grade_score || ''}`
  }
  return 'Trading Card' // Default for cards without specific rarity in schema
}

// Format price for display
export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(price)
} 