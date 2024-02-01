import { instance } from "./instance.tsx"

export const ordersApi = {
  getOrders({ page = 1, pageSize = 10, lookup = "" }) {
    return instance.get(
      `order?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
    )
  },

  deleteOrder(id: number) {
    return instance.delete(`order/${id}`)
  },
}
