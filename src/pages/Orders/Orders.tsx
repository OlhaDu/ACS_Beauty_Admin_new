import s from './Orders.module.scss'
import AdminLayout from "../../layouts/AdminLayout";
import SearchInput from "../../components/ToolsPanel/SearchInput/SearchInput";
import Select from "../../components/ToolsPanel/Select/Select";
import FilterIcon from "../../images/svg/FilterIcon";
import Table from "../../components/Table/Table";
import ExportButton from "../../components/ToolsPanel/ExportButton/ExportButton";

const filteringOptions = ["Статус", "Спосіб доставки", "Спосіб оплати"];

const columns = [
    {field: "id", headerName: "№", width: 60},
    {field: "customer", headerName: "Клієнт", width: 120},
    {field: "total", headerName: "Сума", width: 80},
    {
        field: "status", headerName: "Статус", width: 110, renderCell: (params: { value: any }) => (
            <span style={{color: getStatusColor(params.value)}}>{params.value}</span>),
    },
    {field: "deliveryMethod", headerName: "Спосіб доставки", width: 140},
    {field: "waybill", headerName: "ТТН", width: 140},
    {field: "comments", headerName: "Коментарі", width: 140},
    {field: "additionDate", headerName: "Додано", width: 130},
];

const rows = [
    {
        id: 34561,
        customer: "Кузьменко М.",
        total: "1256грн",
        status: "Оплачено",
        deliveryMethod: "Нова пошта",
        waybill: "2045678567890",
        comments: "Будь-ласка відправте",
        additionDate: "12.06.2023"
    },
    {
        id: 34562,
        customer: "Кузьменко М.",
        total: "1256грн",
        status: "Виконано",
        deliveryMethod: "Нова пошта",
        waybill: "2045678567890",
        comments: "Будь-ласка відправте",
        additionDate: "12.06.2023"
    },
    {
        id: 34563,
        customer: "Кузьменко М.",
        total: "1256грн",
        status: "Скасовано",
        deliveryMethod: "Нова пошта",
        waybill: "2045678567890",
        comments: "Будь-ласка відправте",
        additionDate: "12.06.2023"
    },
];

const getStatusColor = (status: string) => {
    const statusToColor: Record<string, string> = {
        Hoве: 'black',
        Прийнято: 'orange',
        Оплачено: 'green',
        Виконано: 'orange',
        Скасовано: 'red',
    }

    return statusToColor[status] || 'black'
}

const Orders = () => {
    const handleEdit = (id: number) => {
        console.log(`Edit order with id: ${id}`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete order with id: ${id}`);
    };
    return (
        <AdminLayout>
            <main className={s.main}>
                <section className={s.main__section}>
                    <div className={s.main__title}>
                        <h2 className={s.main__title_text}>Замовлення</h2>
                    </div>
                    <div className={s.main__user_search}>
                        <div className={s.features}>
                            <SearchInput/>
                            <div className={s.tools}>
                                <Select
                                    options={filteringOptions}
                                    icon={<FilterIcon/>}
                                    toolName={"Фільтрувати"}
                                />
                                <ExportButton columns={columns} rows={rows}/>
                            </div>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        rows={rows}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </section>
            </main>
        </AdminLayout>
    )
}

export default Orders
