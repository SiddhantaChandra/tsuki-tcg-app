import { supabase } from './supabase'

// Category UUIDs from the database
const CATEGORY_IDS = {
  POKEMON: '50fad8b9-161b-491e-a18b-f258ebc7a7a7',
  ONE_PIECE: '558c406c-f43a-4297-b082-09ba01a75a70'
}

// Get Pokemon sets
export async function getPokemonSets() {
  try {
    const { data, error } = await supabase
      .from('sets')
      .select('id, name, slug')
      .eq('category_id', CATEGORY_IDS.POKEMON)
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching Pokemon sets:', error)
    return []
  }
}

// Get One Piece sets
export async function getOnePieceSets() {
  try {
    const { data, error } = await supabase
      .from('sets')
      .select('id, name, slug')
      .eq('category_id', CATEGORY_IDS.ONE_PIECE)
      .order('name')
    
    if (error) throw error
    return data || []
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

// Get slabs by category
export async function getSlabsByCategory(categorySlug) {
  try {
    const { data, error } = await supabase
      .from('slabs')
      .select(`
        id,
        name,
        slug,
        grade_score,
        price,
        categories!inner (
          id,
          name,
          slug
        ),
        grade_companies (
          name,
          slug
        )
      `)
      .eq('categories.slug', categorySlug)
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error(`Error fetching slabs for category ${categorySlug}:`, error)
    return []
  }
}

// Get slabs by grade company
export async function getSlabsByGradeCompany(companySlug) {
  try {
    const { data, error } = await supabase
      .from('slabs')
      .select(`
        id,
        name,
        slug,
        grade_score,
        price,
        categories (
          name,
          slug
        ),
        grade_companies!inner (
          id,
          name,
          slug
        )
      `)
      .eq('grade_companies.slug', companySlug)
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error(`Error fetching slabs for company ${companySlug}:`, error)
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