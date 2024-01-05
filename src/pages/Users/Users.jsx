import { useEffect } from "react";
import styles from "./Users.module.scss";

import Select from "src/components/ToolsPanel/Select/Select";
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput";
import FilterIcon from "../../images/svg/FilterIcon";
import ActionsIcon from "../../images/svg/ActionsIcon";
import ExportFileIcon from "../../images/svg/ExportFileIcon";
import RowListIcon from "../../images/svg/RowListIcon";
import DataTable from "src/components/Table/Table";
import axios from "axios";
import AdminLayout from "src/layouts/AdminLayout";

const Users = () => {
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";

  //     try {
  //       const response = await axios.get(apiUrl);

  //       const users = response.json();

  //       console.log("users:", users);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   getUsers();
  // }, []);

  const filteringOptions = ["Option 1", "Option 2", "Option 3"];
  const actionOptions = ["Редагувати", "Видалити"];
  const exportOptions = ["Option 1", "Option 2", "Option 3"];
  const paginationOptions = ["Option 1", "Option 2", "Option 3"];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Ім’я", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone_number", headerName: "Телефон", width: 130 },
    { field: "characteristics", headerName: "Примітки", width: 130 },
    { field: "addition_date", headerName: "Додано", width: 130 },
  ];

  const rows = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phone_number: 123456789,
      characteristics: "Some notes",
      addition_date: "2023-01-01",
    },
    {
      id: 2,
      fullName: "John Doe",
      email: "john@example.com",
      phone_number: 123456789,
      characteristics: "Some notes",
      addition_date: "2023-01-01",
    },
    {
      id: 3,
      fullName: "John Doe",
      email: "john@example.com",
      phone_number: 123456789,
      characteristics: "Some notes",
      addition_date: "2023-01-01",
    },
  ];

  return (
    <AdminLayout>
      <main className={styles.main}>
        <section className={styles.main__section}>
          <div className={styles.main__title}>
            <h2 className={styles.main__title_text}>Користувачі</h2>
          </div>
          <div className={styles.main__user_search}>
            <div className={styles.features}>
              <SearchInput />
              <div className={styles.tools}>
                <section>
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
          <DataTable columns={columns} rows={rows} />
        </section>
      </main>
    </AdminLayout>
  );
};

export default Users;
