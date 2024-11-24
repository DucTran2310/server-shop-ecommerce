export type SupplierRequestAddType = {
  name: string;
  product: string;
  categories?: string[];
  price?: number;
  contact?: string;
  isTaking: 0 | 1;
  photoUrl?: string;
};
