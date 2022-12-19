import LocalStorage from "./LocalStorage";

/** 현재 시각 아침 8시~저녁 6시 사이에 처음 사이트에 접근한 사람은 day theme으로 브라우저를 보게된다. 
 * 그 외 시간은 night theme 으로 브라우저를 보게된다.
 * 사용자가 사이트에 들어온 적이 있으면 이를 localstorage가 보관하여 다음에도 같은 컬러 테마를 볼 수 있도록 한다.
 */
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