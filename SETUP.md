# Tsuki Cards Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
# Get these values from your Supabase project settings > API
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Structure

The application uses the following Supabase database structure:

### Tables
- **categories**: Pokemon, One Piece, etc.
- **sets**: Card sets linked to categories
- **subsets**: Sub-collections within sets
- **cards**: Individual cards
- **slabs**: Graded cards
- **accessories**: Related products

### Key Relationships
- `sets.category_id` → `categories.id`
- `subsets.set_id` → `sets.id`
- `cards.set_id` → `sets.id`
- `cards.category_id` → `categories.id`

## Navbar Functionality

The navbar now includes enhanced dropdowns with images and multi-column layouts:

### **Pokemon & One Piece Dropdowns** (550px wide)
- **Left side (57%)**: Large category image (350x210px display) with overlay text
- **Right side (43%)**: Available sets list with scroll functionality
- **Footer**: "View All" category link

### **Slabs Multi-Column Dropdown** (650px wide)
- **Left column (56%)**: Large slabs image (400x240px display) with gradient overlay
- **Middle column (22%)**: Categories (Pokemon Slabs, One Piece Slabs)
- **Right column (22%)**: Grade companies fetched from database (PSA, BGS, CGC, etc.)
- **Footer**: "View All Slabs" link

### **Features**
- Beautiful image overlays with gradient effects
- Responsive design for mobile and desktop
- Loading states and error handling
- Click-outside-to-close functionality
- Scrollable content areas for long lists
- Professional styling with consistent spacing

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your Supabase project and add the environment variables

3. Run the development server:
   ```bash
   npm run dev
   ```

The navbar will automatically fetch and display sets from your Supabase database. 