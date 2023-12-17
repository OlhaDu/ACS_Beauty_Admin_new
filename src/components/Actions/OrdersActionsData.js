const showChangeOrderStatusModal = () => {
    console.log('модалка')
}

const deleteOrder = () => {
    console.log('удалить')
}

export const OrdersActionsData = [ 
    {
        actionName: 'Змінити статус',
        handler: showChangeOrderStatusModal,
    },
    {
        actionName: 'Видалити',
        handler: deleteOrder,
    }
]