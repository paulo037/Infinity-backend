import { v4 } from "uuid";

export interface PromotionProps {
    id?: string;
    name: string;
    buying_category_id: string;
    buying_quantity: number;
    win_category_id: string;
    win_quantity: number;
    startDate: Date;
    endDate: Date;
    deleted?: boolean;
}

export class Promotion {
    public id: string;
    public name: string;
    public buying_category_id: string;
    public buying_quantity: number;
    public win_category_id: string;
    public win_quantity: number;
    public startDate: Date;
    public endDate: Date;
    private deleted: boolean;

    constructor({
        id,
        name,
        buying_category_id,
        buying_quantity,
        win_category_id,
        win_quantity,
        startDate,
        endDate,
        deleted,
    }: PromotionProps) {
        this.id = id ?? v4();
        this.name = name;
        this.buying_category_id = buying_category_id;
        this.buying_quantity = buying_quantity;
        this.win_category_id = win_category_id;
        this.win_quantity = win_quantity;
        this.startDate = startDate;
        this.endDate = endDate;
        this.deleted = deleted ?? false;
    }
}
