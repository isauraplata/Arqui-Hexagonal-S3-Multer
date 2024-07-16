export class Product {
  constructor(
    readonly id: string,  
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly stock_quantity: number,
    readonly image: string
  ) {}
}