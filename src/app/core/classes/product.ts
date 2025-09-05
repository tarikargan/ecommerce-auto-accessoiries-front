export class Product {
  id!: String;
  category: Category                     = new Category();
  subCategory: Category                  = new Category();
  description: string                    = '';
  fournisseur: Fournisseur               = new Fournisseur();
  photos: Photo                          = new Photo();
  price: number                          = 0;
  quantite_taille: QuantityTaille[]      = [];
  status: any                            = 1;
  ref:any                                = null;
  title:String                           = '';
  season:Season                          = new Season();

  constructor() {
  }

}

export class Category {
  id!: string ;
  name: string  = '';

  constructor() {
  }

}

export class SubCategory {
  id!: string ;
  name: string  = '';
  constructor() {
  }
}

export class Fournisseur {
  id!: string ;
  title: string     = '';
  contact: string   = '';
  category: string  = '';
  local: string     = '';

  constructor() {
  }

}
export class Photo {
  id!: string ;
  src: string  = '';

  constructor() {
  }

}
export class QuantityTaille {
  id!: string ;
  color: string           = '';
  color_type: string      = '';
  quantity: number        = 0;
  quantity_livre: number  = 0;
  stock: Stock            = new Stock();
  taille: Taille          = new Taille();

  constructor() {
  }

}
export class Stock {
  id!: string ;
  address: string   = '';
  name: string      = '';

  constructor() {
  }

}

export class Taille {
  id!: string ;
  name: string  = '';

  constructor() {
  }

}
export class Season {
  id!: string ;
  title: string  = '';
  end_date: any;
  start_dat: any;

  constructor() {
  }

}
