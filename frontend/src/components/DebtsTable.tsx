import { notification, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IDebt from "../interfaces/IDebt";
import Pagination from "../interfaces/Pagination";
import { DateTime } from "luxon";
import "../styles/DebtsTable.css";
import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";

const DebtsTable: React.FC = () => {
  //@ts-ignore
  const { id } = useParams();
  const [debts, setDebts] = useState<Pagination<IDebt>>();
  const init = () => {
    loadNextPage(1, 15);
  };
  const loadNextPage = useCallback(
    async (page: number, pageSize: number | undefined) => {
      const res = await fetch(
        `http://localhost:8000/debt/user/${id}?per_page=${
          pageSize || 15
        }&page=${page}`
      );
      setDebts(await res.json());
    },
    [id]
  );
  const deleteDebt = async (debtId: string) => {
    const res = await fetch(`http://localhost:8000/debt/${debtId}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      notification.success({
        message: "Debt deleted!",
      });
      loadNextPage(1, 15);
    }
  };
  useEffect(init, [loadNextPage]);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (v: string) => (
        <span>{DateTime.fromISO(v).toFormat("dd/MM/yyyy HH:mm:ss")}</span>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_: string, debt: IDebt) => (
        <Link to={`/user/${id}/edit/${debt.id}`}>
          <EditOutlined />
        </Link>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_: string, debt: IDebt) => (
        <DeleteTwoTone twoToneColor="red" onClick={() => deleteDebt(debt.id)} />
      ),
    },
  ];
  return (
    <>
      <Table
        rowKey={(d) => d.id}
        columns={columns}
        dataSource={debts?.data}
        pagination={{
          total: debts?.total,
          pageSize: 15,
          onChange: loadNextPage,
        }}
      />
    </>
  );
};
export default DebtsTable;
