export interface IProduct{
    _id: string
    name: string
    category: string
    prices: IBrandProduct[]
    img:string

}

export interface IBrandProduct{
    brandName: string
    price: number 
}