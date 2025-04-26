import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { ReceiptData } from "../../types/receiptData";
import { styles } from "../styles/receiptPDF.styles";

const formatCurrency = (value: number) => {
  return `$ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

const TableRow = ({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string | number;
  isLast?: boolean;
}) => (
  <View style={isLast ? styles.lastRow : styles.tableRow}>
    <Text style={styles.labelCell}>{label}</Text>
    <Text style={styles.valueCell}>{value}</Text>
  </View>
);

const SingleReceipt = ({
  data,
  type,
}: {
  data: ReceiptData;
  type: "ORIGINAL" | "DUPLICADO";
}) => {
  // 🔥 Subtotales
  const paymentsSubtotal = data.payments?.reduce(
    (acc, payment) => acc + (payment.amount || 0),
    0
  );

  const taxesSubtotal = data.taxes?.reduce(
    (acc, tax) => acc + (tax.amount || 0),
    0
  );

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.title}>RECIBO</Text>

      <View style={styles.headerRow}>
        <Text style={styles.receiptType}>{type}</Text>
        <Text style={styles.companyName}>Studio Inmobiliaria</Text>
        <Image
          style={styles.logo}
          src="http://localhost:3000/static/Logo2025.png"
        />
      </View>

      {/* Datos principales */}
      <View style={styles.table}>
        <TableRow label="Fecha de emisión:" value={data.date} />
        <TableRow label="Cliente:" value={data.tenant} />
        <TableRow label="Propiedad:" value={data.property} />
        <TableRow label="Propietario:" value={data.owner} />
        <TableRow label="Mes de alquiler:" value={data.rentMonth} isLast />
      </View>

      {/* Pagos */}
      <Text style={styles.sectionTitle}>Pagos</Text>
      <View style={styles.table}>
        {data.payments
          .filter((payment) => payment.type && payment.amount > 0)
          .map((payment, idx, arr) => (
            <TableRow
              key={idx}
              label={payment.type}
              value={formatCurrency(payment.amount)}
              isLast={idx === arr.length - 1}
            />
          ))}
      </View>

      {/* Impuestos */}
      {data.taxes?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Impuestos</Text>
          <View style={styles.table}>
            {data.taxes
              .filter((tax) => tax.type && tax.amount > 0)
              .map((tax, idx, arr) => (
                <TableRow
                  key={idx}
                  label={tax.type}
                  value={formatCurrency(tax.amount)}
                  isLast={idx === arr.length - 1}
                />
              ))}
          </View>
        </>
      )}

      {/* 🔥 Resumen final compacto */}
      <Text style={styles.sectionTitle}>Resumen</Text>
      <View style={styles.table}>
        <TableRow label="Pagos:" value={formatCurrency(paymentsSubtotal)} />
        <TableRow label="Impuestos:" value={formatCurrency(taxesSubtotal)} />
        <TableRow
          label="Descuento:"
          value={`-${formatCurrency(data.discount)}`}
        />
        <TableRow
          label="Total a pagar:"
          value={formatCurrency(data.total)}
          isLast
        />
      </View>

      {/* Firma */}
      <View style={styles.signatureContainer}>
        <Text style={styles.signatureLabel}>Recibí:</Text>
        <View style={styles.signatureLine} />
      </View>
    </View>
  );
};

export const ReceiptPDF = (data: ReceiptData) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <SingleReceipt data={data} type="ORIGINAL" />
      {/* <View style={styles.separator} />
      <SingleReceipt data={data} type="DUPLICADO" /> */}
    </Page>
  </Document>
);

export default ReceiptPDF;
