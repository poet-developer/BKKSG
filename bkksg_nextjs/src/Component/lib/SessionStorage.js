
/** React 특징때문에 브라우저의 local/sessiong storage를 받아올때 class 로 따로 관리해줘야 작동한다. */

class SessionStorage {
     constructor() {}
   
     static setItem(key, item) {
       if (typeof window !== "undefined") {
         sessionStorage.setItem(key, item);
       }
     }
   
     static getItem(key) {
       if (typeof window !== "undefined") {
         return sessionStorage.getItem(key);
       }
       return null;
     }
   
     static removeItem(key) {
       if (typeof window !== "undefined") {
         sessionStorage.removeItem(key);
       }
     }
   }
   
   export default SessionStorage;