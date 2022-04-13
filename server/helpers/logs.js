//retunr the date & time in YYYY-MM-DD HH:MM:SS format
const getDate = () => {
  let date_ob = new Date();
  return (
    date_ob.getFullYear() +
    "-" +
    ("0" + (date_ob.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date_ob.getDate()).slice(-2) +
    " " +
    date_ob.getHours() +
    ":" +
    date_ob.getMinutes() +
    ":" +
    date_ob.getSeconds()
  );
};

export const LogInfo = (message) => {
  console.info(getDate() + " " + message);
};
export const LogError = (message) => {
  console.error(getDate() + " " + message);
};
export const Log = (message) => {
  console.log(getDate() + " " + message);
};
