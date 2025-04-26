export const formatCurrency = (value: number) => {
  return `$ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
