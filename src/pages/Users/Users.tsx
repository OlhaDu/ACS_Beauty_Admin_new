import { useEffect, useState } from "react";
import s from "./Users.module.scss";

import Select from "src/components/ToolsPanel/Select/Select";
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput";
import FilterIcon from "../../images/svg/FilterIcon";
import ActionsIcon from "../../images/svg/ActionsIcon";
import ExportFileIcon from "../../images/svg/ExportFileIcon";
import RowListIcon from "../../images/svg/RowListIcon";
import axios from "axios";
import AdminLayout from "src/layouts/AdminLayout";
import { FullFeaturedCrudGrid } from "src/components/Table/Table";
import { handleExternalDataUpdate } from "../../components/Table/helpers";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  note: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
interface TableUser {
  id: number;
  // fullName: string;
  // email: string;
  note: string;
  // phone: string;
  // createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [mapedUsers, setMapedUsers] = useState<TableUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const apiUrl = "http://16.171.113.245:5000/api/user?page=1";
      // "http://16.171.113.245:5000/api/user?page=1&lookup=323&pageSize=25";

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoiYWRtaXdlMjM0MzI0MmZ3ZW5Ad2Vmd2UyMy5jb20iLCJpc0FkbWluIjoidHJ1ZSIsImlhdCI6MTcwMzU2OTU4NCwiZXhwIjoxNzExMzQ1NTg0fQ.ZCj9Ub0jTLqCOtKTDI1CA-8hDDsLGOcp1-0qgVXMDr8`,
          },
        });

        const usersData = response.data.rows;
        // response.data.rows[0]

        setUsers(usersData);

        // console.log("response.data: ", usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const tableRows: TableUser[] = users.map((user) => ({
      id: user.id,
      note: user.note,
    }));
    setMapedUsers(tableRows);
    console.log(tableRows);
  }, [users]);

  // console.log("tableRows: ", tableRows);

  // const tableRows = users.map((user) => ({
  //   id: "dwdwd",
  //   fullName: "efefeeffe",
  //   email: "efefefe",
  //   phone_number: "effefef",
  //   note: "eefefeff",
  //   createdAt: "effefefef",
  // }));

  const filteringOptions = ["Option 1", "Option 2", "Option 3"];
  const actionOptions = ["Редагувати", "Видалити"];
  const exportOptions = ["Option 1", "Option 2", "Option 3"];
  const paginationOptions = ["Option 1", "Option 2", "Option 3"];

  const customColumns = [
    // {
    //   field: "createdAt",
    //   headerName: "Додано",
    //   type: "string",
    //   width: 130,
    //   editable: true,
    // },

    {
      field: "id",
      headerName: "ID",
      width: 70,
      type: "number",
    },
    // {
    //   field: "fullName",
    //   headerName: "Ім’я",
    //   width: 130,
    //   type: "string",
    //   editable: true,
    // },
    // {
    //   field: "firstName",
    //   headerName: "Ім’я",
    //   width: 130,
    //   type: "string",
    //   editable: true,
    // },
    // {
    //   field: "lastName",
    //   headerName: "Ім’я",
    //   width: 130,
    //   type: "string",
    //   editable: true,
    // },
    {
      field: "note",
      headerName: "Примітки",
      type: "string",
      width: 130,
      editable: true,
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   width: 130,
    //   type: "string",
    //   editable: true,
    // },

    // {
    //   field: "phone",
    //   headerName: "Телефон",
    //   type: "number",
    //   width: 130,
    //   editable: true,
    // },
  ];

  // const tableRows = [
  //   {
  //     id: 1,
  //     fullName: "John Doe",
  //     email: "efefefef",
  //     phone_number: 3442332,
  //     note: "fsdfdsfsf",
  //     createdAt: "Market",
  //   },
  //   {
  //     id: 2,
  //     fullName: "Jane Doe",
  //     email: "dfdfsdfsfs",
  //     phone_number: 223323232,
  //     note: "fsdfdsfsf",
  //     createdAt: "Finance",
  //   },
  //   {
  //     id: 3,
  //     fullName: "Bob Smith",
  //     email: "efefefef",
  //     phone_number: 44423423,
  //     note: "fsdfdsfsf",
  //     createdAt: "Development",
  //   },
  // ];

  return (
    <AdminLayout>
      <main className={s.main}>
        <section className={s.main__section}>
          <div className={s.main__title}>
            <h2 className={s.main__title_text}>Користувачі</h2>
          </div>
          <div className={s.main__user_search}>
            <div className={s.features}>
              <SearchInput />
              <div className={s.tools}>
                <section className={s.options__container}>
                  <Select
                    options={filteringOptions}
                    icon={<FilterIcon />}
                    toolName={"Фільтрувати"}
                  />
                  <Select
                    options={actionOptions}
                    icon={<ActionsIcon />}
                    toolName={"Дії"}
                  />
                  <Select
                    options={exportOptions}
                    icon={<ExportFileIcon />}
                    toolName={"Експортувати"}
                  />
                </section>
                <Select
                  options={paginationOptions}
                  icon={<RowListIcon />}
                  toolName={"Рядків на сторінці: 10"}
                  style={{ width: "261px" }}
                />
              </div>
            </div>
          </div>
          <FullFeaturedCrudGrid
            columns={customColumns}
            rows={users}
            onExternalDataUpdate={handleExternalDataUpdate}
          />
        </section>
      </main>
    </AdminLayout>
  );
};

export default Users;
