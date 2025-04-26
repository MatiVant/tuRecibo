import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    paddingTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
    fontSize: 12,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e88e5", // Azul más fuerte para el título principal
  },
  receiptType: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    color: "#1e88e5",
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    color: "#1e88e5",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#e3f2fd", // Azul clarito
    padding: 4,
    marginTop: 10,
    marginBottom: 4,
  },
  table: {
    display: "flex",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: "center",
    backgroundColor: "#ffffff", // Default blanco
  },
  lastRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  labelCell: {
    width: "50%",
    fontWeight: "bold",
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    paddingRight: 4,
  },
  valueCell: {
    width: "50%",
    fontSize: 12,
    paddingLeft: 4,
    textAlign: "right",
  },
  separator: {
    borderBottom: "2px dashed #ccc",
    marginVertical: 10,
  },
  signatureContainer: {
    marginTop: 30,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  signatureLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  signatureLine: {
    width: "60%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "dashed",
    height: 1,
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#e8f5e9", // Verde clarito
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    fontWeight: "bold",
  },
});
