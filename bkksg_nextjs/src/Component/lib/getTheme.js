import LocalStorage from "./LocalStorage";

const getTheme = () => {
  if (LocalStorage.getItem("Theme") === "day") return false
  else if(LocalStorage.getItem("Theme") === "night")
  return true 
  else{
    const now = new Date()
    let _now;
      if (now.getHours() > 18 && now.getHours()>8 ) _now= "night"
      else _now= "day"
    LocalStorage.setItem("Theme", _now); 
}
};

export default getTheme