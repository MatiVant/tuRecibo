import {
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
  Divider,
  Typography,
} from "antd";
import { useState, useMemo, useEffect } from "react";
import data from "../mocks/data.json";
import { ReceiptData } from "../types/receiptData";
import { ReceiptPDF } from "./pdf/receiptPDF";
import { pdf } from "@react-pdf/renderer";
import { formatCurrency } from "../utils/currency";
import { DynamicList } from "./dynamicList";
import { taxTypes } from "../mocks/taxTypes";
import { paymentTypes } from "../mocks/paymentTypes";

const { Option } = Select;
const { Text, Title } = Typography;

const ReceiptForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [form] = Form.useForm();
  const [discount, setDiscount] = useState<number>(0);
  const [payments, setPayments] = useState<
    { type: string; amount: number; confirmed: boolean }[]
  >([{ type: "", amount: 0, confirmed: false }]);

  const [taxes, setTaxes] = useState<
    { type: string; amount: number; confirmed: boolean }[]
  >([{ type: "", amount: 0, confirmed: false }]);

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<
    typeof data.properties
  >([]);

  const subtotal = useMemo(
    () => payments.reduce((acc, p) => acc + (p.amount || 0), 0),
    [payments]
  );

  const taxesTotal = useMemo(
    () => taxes.reduce((acc, tax) => acc + (tax.amount || 0), 0),
    [taxes]
  );
  const total = useMemo(
    () => subtotal - (discount || 0) + taxesTotal,
    [subtotal, discount, taxesTotal]
  );

  useEffect(() => {
    if (selectedClientId) {
      const filtered = data.properties.filter(
        (p) => p.clientId === selectedClientId
      );
      setFilteredProperties(filtered);
      form.setFieldsValue({ property: null, owner: null });
    }
  }, [selectedClientId]);

  const handlePropertyChange = (propertyId: string) => {
    const selected = data.properties.find((p) => p.id === propertyId);
    if (selected) {
      form.setFieldsValue({ owner: selected.owner });
    }
  };

  const handleGenerateReceipt = async (data: ReceiptData) => {
    const blob = await pdf(ReceiptPDF(data)).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const onFinish = (values: any) => {
    const client = data.clients.find((c) => c.id === values.tenant);
    const property = data.properties.find((p) => p.id === values.property);
    const fullData = {
      ...values,
      tenant: client?.name || "",
      property: property?.address || "",
      date: values.date.format("YYYY-MM-DD"),
      rentMonth: values.rentMonth.format("MM/YYYY"),
      payments,
      discount,
      taxes,

      total,
    };
    try {
      handleGenerateReceipt(fullData);
      onSubmit(fullData);
    } catch (error) {
      console.error("Error generating receipt:", error);
    }
  };
  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Fecha" name="date" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Cliente (inquilino)"
          name="tenant"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Seleccionar cliente"
            optionFilterProp="children"
            onChange={(val) => setSelectedClientId(val)}
            filterOption={(input, option) =>
              (option?.children as any)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {data.clients.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Propiedad"
          name="property"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Seleccionar propiedad"
            onChange={handlePropertyChange}
            disabled={!selectedClientId}
          >
            {filteredProperties.map((p) => (
              <Option key={p.id} value={p.id}>
                {p.address}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Nombre del propietario"
          name="owner"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Mes de alquiler"
          name="rentMonth"
          rules={[{ required: true }]}
        >
          <DatePicker
            picker="month"
            format="MM/YYYY"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <DynamicList
          title="Pagos"
          entries={payments}
          setEntries={setPayments}
          options={paymentTypes}
          addButtonText="+ Agregar pago"
        />

        <Divider> Descuentos </Divider>
        <Form.Item>
          <InputNumber
            style={{ width: "100%" }}
            prefix="- $"
            value={discount}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              parseFloat(value?.replace(/\$\s?|(,*)/g, "") || "0")
            }
            onChange={(val) => setDiscount(val ?? 0)}
          />
        </Form.Item>

        <DynamicList
          title="Impuestos"
          entries={taxes}
          setEntries={setTaxes}
          options={taxTypes}
          addButtonText="+ Agregar impuesto"
        />
        <Divider />
        <div style={{ textAlign: "right" }}>
          <Text strong>Subtotal pagos: </Text>
          <Text>{formatCurrency(subtotal)}</Text>
          <br />
          <Text strong>Descuentos: </Text>
          <Text style={{ color: "red" }}>- {formatCurrency(discount)}</Text>
          <br />
          <Text strong>Impuestos: </Text>
          <Text>
            {formatCurrency(
              taxes.reduce((acc, tax) => acc + (tax.amount || 0), 0)
            )}
          </Text>
          <Divider />
          <Title level={4} style={{ marginBottom: 0 }}>
            Total a pagar: {formatCurrency(total)}
          </Title>
        </div>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" block>
            Guardar recibo
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ReceiptForm;
