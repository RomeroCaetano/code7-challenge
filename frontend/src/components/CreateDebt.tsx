import { notification } from "antd";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import IDebt from "../interfaces/IDebt";
import DebtForm from "./DebtForm";

const CreateDebt: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const onFinish = (values: Omit<IDebt, "id">) => {
    //@ts-ignore
    sendData({ ...values, date: values.date._d.toISOString() }).then((res) => {
      if (res.status === 200) {
        notification.success({
          message: "Success to create debt!",
        });
        history.push(`/user/${id}`);
      } else {
        notification.error({
          message: "Error to create debt!",
        });
      }
    });
  };
  const sendData = async (data: Omit<IDebt, "id">) => {
    return fetch(`http://localhost:8000/debt/user/${id}`, {
      method: "POST",
      // @ts-ignore
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  };
  return <DebtForm onFinish={onFinish} />;
};

export default CreateDebt;
