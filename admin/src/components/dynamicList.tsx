import { Button, Divider, InputNumber, Select, Space } from "antd";
import { Option } from "antd/es/mentions";

interface DynamicListProps {
  title: string;
  entries: { type: string; amount: number; confirmed: boolean }[];
  setEntries: (
    entries: { type: string; amount: number; confirmed: boolean }[]
  ) => void;
  options: string[];
  addButtonText?: string;
}

export const DynamicList = ({
  title,
  entries,
  setEntries,
  options,
  addButtonText = "Agregar nuevo",
}: DynamicListProps) => {
  const handleTypeChange = (idx: number, value: string) => {
    const copy = [...entries];
    copy[idx].type = value;
    setEntries(copy);
  };

  const handleAmountChange = (idx: number, value: number | null) => {
    const copy = [...entries];
    copy[idx].amount = value ?? 0;
    setEntries(copy);
  };

  const handleConfirm = (idx: number) => {
    const copy = [...entries];
    copy[idx].confirmed = true;
    setEntries([...copy, { type: "", amount: 0, confirmed: false }]);
  };

  const handleRemove = (idx: number) => {
    const copy = [...entries];
    copy.splice(idx, 1);
    setEntries(copy);
  };

  return (
    <>
      <Divider>{title}</Divider>

      {entries.map((entry, idx) => (
        <Space
          key={idx}
          style={{ width: "100%", marginBottom: 8 }}
          align="start"
        >
          <Select
            placeholder="Seleccionar tipo"
            style={{ width: "40%", minWidth: 160 }}
            value={entry.type}
            onChange={(val) => handleTypeChange(idx, val)}
          >
            {options.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>

          <InputNumber
            placeholder="Monto"
            value={entry.amount}
            onChange={(val) => handleAmountChange(idx, val)}
            prefix="$"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              parseFloat(value?.replace(/\$\s?|(,*)/g, "") || "0")
            }
            style={{
              width: "50%",
              textAlign: "right",
            }}
            onPressEnter={(e) => {
              e.preventDefault();
              handleConfirm(idx);
            }}
          />

          {entry.confirmed ? (
            <Button danger type="text" onClick={() => handleRemove(idx)}>
              ✖️
            </Button>
          ) : (
            <Button
              type="text"
              onClick={() => handleConfirm(idx)}
              disabled={!entry.type || entry.amount <= 0}
            >
              ✔️
            </Button>
          )}
        </Space>
      ))}

      <Button
        type="dashed"
        block
        onClick={() =>
          setEntries([...entries, { type: "", amount: 0, confirmed: false }])
        }
      >
        {addButtonText}
      </Button>
    </>
  );
};
