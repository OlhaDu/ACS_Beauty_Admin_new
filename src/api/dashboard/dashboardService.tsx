import { IResponse, IGetDashboardParams } from "src/types/dashboards";
import { instance } from "../brands/instance"
import { GridRowId } from "@mui/x-data-grid";

export const fetchDashboardsFromBackend = async ({page = 1, pageSize = 10, lookup = ""}: IGetDashboardParams): Promise<IResponse> => {
    try {    
        const queryString = `?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`;
        const response = await instance.get<IResponse>(`dashboard${queryString}`);
        console.log("first", response.data)
        return response.data;
    } catch (error) {
        console.error("Ошибка при запросе к бэкэнду:", error);
        // Возвращаем фиктивные данные
        return {
            rows: [
                {
                    id: 13568,
                    customer: "Кузьменко М.",
                    total: "1256грн",
                    status: "Оплачено",
                    deliveryMethod: "Нова пошта",
                    waybill: "2045678567890",
                    comments: "Будь-ласка відправте",
                    additionDate: "12.06.2023",
                },
                {
                    id: 34562,
                    customer: "Кузьменко Михайло.",
                    total: "1256грн",
                    status: "Виконано",
                    deliveryMethod: "Нова пошта",
                    waybill: "2045678567890",
                    comments: "Будь-ласка відправте",
                    additionDate: "12.06.2023",
                },
                {
                    id: 34563,
                    customer: "Кузьменко М.",
                    total: "1256грн",
                    status: "Оплачено",
                    deliveryMethod: "Нова пошта",
                    waybill: "2045678567890",
                    comments: "Будь-ласка відправте",
                    additionDate: "12.06.2023",
                },
            ],
        };
    }
};

export const deleteDashboardFromBackend = async (id: GridRowId) => {
try {
    const queryString = `${id}`
    const response = await instance.delete(`dashboard/${queryString}`)
    return response.data;
} catch (error)
{
    console.error("Ошибка при запросе к бэкэнду:", error);
}
}