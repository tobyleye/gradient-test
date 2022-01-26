export const dateToHuman = (date) => {
  if (typeof date === "string") {
    date = new Date();
  }
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/");
};

// modified version of https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const formatAmount = (amount) => {
  if (amount === undefined  || amount === null ) {
    return "";
  }

  let currency = "₦";
  return currency + amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
