export const columns = [
  {
    field: "id",
    headerName: "№",
    width: 70,
    type: "number",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "logo",
    headerName: "Логотип",
    width: 168,
    type: "string",
    editable: true,
  },
  {
    field: "name",
    headerName: "Назва",
    width: 102,
    type: "string",
    editable: true,
  },
  {
    field: "description",
    headerName: "Опис",
    type: "string",
    width: 520,
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "Додано",
    type: "string",
    width: 102,
    editable: true,
  },
];
