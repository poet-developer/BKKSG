const getTheme = () => {
  if (localStorage.getItem("Theme") === "day") return false
  else if(localStorage.getItem("Theme") === "night")
  return true 
};

export default getTheme