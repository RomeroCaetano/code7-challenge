import { notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import IDebt from "../interfaces/IDebt";
import DebtForm from "./DebtForm";
const EditDebt: React.FC = () => {
  const { id, debtId } = useParams<{ id: string; debtId: string }>();
  const history = useHistory();
  const [debt, setDebt] = useState<IDebt>();
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
    return fetch(`http://localhost:8000/debt/${debtId}`, {
      method: "PUT",
      // @ts-ignore
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  };
  const fetchDebt = useCallback(async () => {
    const res = await fetch(`http://localhost:8000/debt/${debtId}`);
    setDebt(await res.json());
  }, [debtId]);
  const init = () => {
    fetchDebt();
  };
  useEffect(init, [fetchDebt]);
  if (!debt) return <></>;
  return (
    <DebtForm
      onFinish={onFinish}
      description={debt?.description}
      value={debt?.value ? parseFloat(debt?.value) : undefined}
      date={debt?.date}
    ></DebtForm>
  );
};
export default EditDebt;
