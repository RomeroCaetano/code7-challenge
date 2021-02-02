import DebtsTable from "./DebtsTable";
import React from "react";
import { Button, Space } from "antd";
import { Link, useParams } from "react-router-dom";
import "../styles/Debts.css";
const Debts: React.FC = () => {
  //@ts-ignore
  const { id } = useParams();
  return (
    <Space direction="vertical">
      <div className="create-debt-button">
        <Button>
          <Link to={`/user/${id}/create`}>Create Debt</Link>
        </Button>
      </div>
      <DebtsTable />
    </Space>
  );
};
export default Debts;
