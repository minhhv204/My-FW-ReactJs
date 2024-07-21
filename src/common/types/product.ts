export interface IProduct {
    id: number | string
    name: string
    image: string
    category?: string
    price: number
    quantity: number,
    description: string
    discount: number
    featured: boolean
    countInStock: number
}
