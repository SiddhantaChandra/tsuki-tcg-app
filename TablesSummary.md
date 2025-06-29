###Tables:

    accessories
        Columns: id (uuid), name (text), slug (text), image_urls (text[]), thumbnail_url (text), accessory_type (text), price (numeric), created_at (timestamp with time zone), category_id (uuid), description (text), stock_quantity (integer)
        Primary Key: id
        Foreign Key: category_id references categories(id)

    admin_list
        Columns: id (uuid), email (text), created_at (timestamp with time zone)
        Primary Key: id

    cards
        Columns: id (uuid), name (text), slug (text), image_urls (text[]), thumbnail_url (text), category_id (uuid), set_id (uuid), subset_id (uuid), condition (integer), language (text), price (numeric), created_at (timestamp with time zone)
        Primary Key: id
        Foreign Keys: category_id references categories(id), set_id references sets(id), subset_id references subsets(id)

    categories
        Columns: id (uuid), name (text), slug (text), created_at (timestamp with time zone)
        Primary Key: id

    grade_companies
        Columns: id (uuid), name (text), slug (text), created_at (timestamp with time zone), grades (text[])
        Primary Key: id

    sets
        Columns: id (uuid), name (text), slug (text), category_id (uuid), created_at (timestamp with time zone)
        Primary Key: id
        Foreign Key: category_id references categories(id)

    slabs
        Columns: id (uuid), name (text), slug (text), image_urls (text[]), thumbnail_url (text), category_id (uuid), set_id (uuid), subset_id (uuid), grade_company_id (uuid), grade_score (text), condition (text), language (text), price (numeric), created_at (timestamp with time zone)
        Primary Key: id
        Foreign Keys: category_id references categories(id), grade_company_id references grade_companies(id), set_id references sets(id), subset_id references subsets(id)

    subsets
        Columns: id (uuid), name (text), slug (text), set_id (uuid), created_at (timestamp with time zone), release_date (date)
        Primary Key: id
        Foreign Key: set_id references sets(id)

    user_roles
        Columns: id (uuid), user_id (uuid), role (text), created_at (timestamp with time zone)
        Primary Key: id
        Foreign Key: user_id references auth.users(id)
