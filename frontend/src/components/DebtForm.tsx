import { Form, DatePicker, InputNumber, Input, Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import IDebt from "../interfaces/IDebt";
import "../styles/DebtForm.css";
import moment from "moment";
interface IDebtForm {
  description?: string;
  value?: number;
  date?: string;
  onFinish(values: Omit<IDebt, "id">): void;
}
const DebtForm: React.FC<IDebtForm> = ({
  description,
  value,
  date,
  onFinish,
}: IDebtForm) => {
  const [descriptionVal, setDescriptionVal] = useState(description || "");
  const [valueVal, setValueVal] = useState(value || 0);
  const [dateVal, setDateVal] = useState(date ? moment(date) : moment());
  useEffect(() => {
    description && setDescriptionVal(description);
    value && setValueVal(value);
    date && setDateVal(moment(date));
  }, [description, value, date]);
  return (
    <Card>
      <Form
        onFinish={onFinish}
        labelCol={{
          xs: { span: 24 },
          sm: { span: 8 },
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16 },
        }}
      >
        <Form.Item
          name="description"
          label="Description"
          {...descriptionConfig}
        >
          <Input
            defaultValue={descriptionVal}
            value={descriptionVal}
            onChange={(e) => setDescriptionVal(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="value" label="Value" {...valueConfig}>
          <InputNumber
            defaultValue={valueVal}
            value={valueVal}
            onChange={(v) =>
              v && setValueVal(typeof v === "string" ? parseFloat(v) : v)
            }
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "") || ""}
          />
        </Form.Item>
        <Form.Item name="date" label="Date" {...dateConfig}>
          <DatePicker
            defaultValue={dateVal}
            onChange={(dateValue) => dateValue && setDateVal(dateValue)}
            value={dateVal}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>

        <Form.Item>
          <div className="create-debt-button">
            <Button
              type="primary"
              onClick={() => {
                onFinish({
                  //@ts-ignore
                  date: dateVal,
                  value: valueVal.toString(),
                  description: descriptionVal,
                });
              }}
              onSubmit={() =>
                onFinish({
                  //@ts-ignore
                  date: dateVal,
                  value: valueVal.toString(),
                  description: descriptionVal,
                })
              }
            >
              Create
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};
const descriptionConfig = {
  rules: [
    {
      type: "string" as const,
      required: true,
      message: "Please set description!",
    },
  ],
};

const valueConfig = {
  rules: [
    { type: "number" as const, required: true, message: "Please set value!" },
  ],
};
const dateConfig = {
  rules: [
    { type: "object" as const, required: true, message: "Please select time!" },
  ],
};
export default DebtForm;
