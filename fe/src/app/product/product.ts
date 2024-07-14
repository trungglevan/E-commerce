import { ObjectId } from 'bson';
export interface Product {
    _id: string | undefined;
    name: string;
    description: string;
    original_price: number;
    current_price: number
    quantity: number;
    price_unit: string
    rating: number;
    rating_account: number;
    colors: any;
    size: any;
    size_unit: string;
    isInStock: boolean;
    isBestSeller: boolean;
}