export interface Product{
  id : number;
  name : string;
  price : number;
  promotion : boolean;
}

export interface PageProduct{
  page : number;
  size : number;
  totalPages : number;
  products : Array<Product>;
}

export interface ProductsState{
  page : number,
  size : number,
  totalPages : number,
  products : Array<Product>,
  status : string,
  errorMessage : string
}
