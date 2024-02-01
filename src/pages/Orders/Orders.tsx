import s from "./Orders.module.scss"
import AdminLayout from "../../layouts/AdminLayout"
import SearchInput from "../../components/ToolsPanel/SearchInput/SearchInput"
import Table from "../../components/Table/Table"
import ExportButton from "../../components/ToolsPanel/ExportButton/ExportButton"
import ChangeOrderStatusPopup from "../../components/Popups/ChangeOrderStatusPopup/ChangeOrderStatusPopup.tsx"
import { useEffect, useState } from "react"
import Filter from "../../components/Filter/Filter.tsx"
import { ordersApi } from "../../api/ordersApi.ts"
import EditIcon from "../../images/svg/EditIcon.tsx"
import DeleteIcon from "../../images/svg/DeleteIcon.tsx"
import * as React from "react"
import InfoPopup from "../../components/Popups/InfoPopup/InfoPopup.tsx"
import { IOrder } from "../../types/IOrders.ts"

const OrdersFilterData = [
  {
    optionName: "Статус",
    suboptions: ["Нове", "Прийнято", "Оплачено", "Виконано", "Скасовано"],
  },
  {
    optionName: "Спосіб доставки",
    suboptions: ["Нова пошта", "Укрпошта", "Самовивіз"],
  },
  {
    optionName: "Спосіб оплати",
    suboptions: ["На карту", "При отриманні"],
  },
]
const Orders = () => {
  const [orders, setOrders] = useState([])
  const [chosenOrder, setChosenOrder] = useState<IOrder | undefined>(undefined)
  const [totalUsers, setTotalUsers] = useState(0)

  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState("")

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchData, setSearchData] = useState("")

  const fetchOrders = async () => {
    try {
      const response = await ordersApi.getOrders({
        page: page + 1,
        pageSize,
        lookup: searchData,
      })
      setTotalUsers(response.data.count)
      setOrders(response.data.rows)
    } catch (error) {
      console.error("Error fetching orders", error)
    }
  }

  const deleteOrder = async (id: number) => {
    try {
      await ordersApi.deleteOrder(id)
      setShowSuccessPopup("Замовлення успішно видалено")
      fetchOrders()
      setTimeout(() => setShowSuccessPopup(""), 2000)
    } catch (error) {
      console.error("Error deleting order", error)
      setShowSuccessPopup("Щось пішло не так. Спробуйте піздніше.")
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [page, pageSize, searchData])

  const columns = [
    { field: "id", headerName: "№", width: 50, headerClassName: s.headerCell },
    {
      field: "fullName",
      headerName: "Клієнт",
      width: 150,
      headerClassName: s.headerCell,
      renderCell: (params: { row: { firstName: string; lastName: string } }) => (
        <span>{`${params.row.firstName} ${params.row.lastName}`}</span>
      ),
    },
    {
      field: "total",
      headerName: "Сума",
      width: 100,
      headerClassName: s.headerCell,
      renderCell: (params: {
        row: { products: { price: string; discount: string; count: number }[] }
      }) => {
        const totalSum = params.row.products.reduce((acc, product) => {
          const discountedPrice =
            parseFloat(product.price) * (1 - parseFloat(product.discount) / 100)
          return acc + discountedPrice * product.count
        }, 0)

        return <span>{totalSum.toFixed(2)}</span>
      },
    },
    {
      field: "status",
      headerName: "Статус",
      width: 70,
      headerClassName: s.headerCell,
      renderCell: (params: { value: string }) => (
        <span style={{ color: getStatusColor(params.value) }}>{params.value}</span>
      ),
    },
    {
      field: "deliveryType",
      headerName: "Спосіб доставки",
      width: 130,
      headerClassName: s.headerCell,
    },
    { field: "tth", headerName: "ТТН", width: 130, headerClassName: s.headerCell },
    { field: "comment", headerName: "Коментарі", width: 130, headerClassName: s.headerCell },
    { field: "createdAt", headerName: "Додано", width: 130, headerClassName: s.headerCell },
    {
      field: "actions",
      headerName: "ДіЇ",
      width: 110,
      headerClassName: s.headerCell,
      renderCell: (params: { row: IOrder }) => (
        <div className={s.actionButtons}>
          <button onClick={() => handleShowChangeStatusModal(params.row)}>
            <EditIcon className={s.svg} fill="black" />
          </button>
          <button onClick={() => deleteOrder(params.row.id)}>
            <DeleteIcon className={s.svg} fill="black" />
          </button>
        </div>
      ),
    },
  ]

  const getStatusColor = (status: string) => {
    const statusToColor: Record<string, string> = {
      new: "black",
      received: "orange",
      paid: "green",
      done: "orange",
      canceled: "red",
    }

    return statusToColor[status] || "black"
  }
  const handleEditOrder = (order: IOrder) => {
    console.log(`The order's status changed on: ${order.status}`)
  }

  const handleShowChangeStatusModal = (order: IOrder) => {
    setShowChangeStatusModal(true)
    setChosenOrder(order)
  }

  const handleHideChangeStatusModal = () => {
    setShowChangeStatusModal(false)
    setChosenOrder(undefined)
  }

  return (
    <AdminLayout>
      <main className={s.main}>
        <section className={s.main__section}>
          <div className={s.main__title}>
            <h2 className={s.main__title_text}>Замовлення</h2>
          </div>
          <div className={s.features}>
            <SearchInput onChange={setSearchData} />
            <div className={s.tools}>
              <Filter options={OrdersFilterData} />
              <ExportButton columns={columns} rows={orders} />
            </div>
          </div>

          <Table
            columns={columns}
            rows={orders}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            count={totalUsers}
          />
        </section>
        {showChangeStatusModal && chosenOrder && (
          <ChangeOrderStatusPopup
            onClose={handleHideChangeStatusModal}
            onSuccess={handleEditOrder}
            order={chosenOrder}
          />
        )}
        {showSuccessPopup !== "" && (
          <InfoPopup onClose={() => setShowSuccessPopup("")}>{showSuccessPopup}</InfoPopup>
        )}
      </main>
    </AdminLayout>
  )
}

export default Orders
