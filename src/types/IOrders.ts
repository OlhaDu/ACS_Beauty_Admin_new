export interface OrdersColumn {
    field: string;
    headerName: string;
    width: number;
}

export interface OrdersRow {
    id: number;
    customer: string;
    total: string;
    status: string;
    deliveryMethod: string;
    waybill: string;
    comments: string;
    additionDate: string;
}