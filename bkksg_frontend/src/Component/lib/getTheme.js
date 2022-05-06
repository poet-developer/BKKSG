const getTheme = () => {
  if (localStorage.getItem("Theme") === "day") return false
  else return true
};

export default getTheme
