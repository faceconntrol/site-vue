export interface Product {
  id: string;
  uniqueId?: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  imageSrc?: string;
  imageAlt?: string;
  category?: string;
  section?: string;
  brand?: string;
  maxResolution?: string;
  resolution?: string;
  features?: string[];
  specs?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;
}

export interface Filters {
  category: string | null;
  brand: string | null;
  search: string;
  maxResolution?: string | null;
  resolutions?: string[];
} 