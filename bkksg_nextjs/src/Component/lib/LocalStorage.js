
/** React 특징때문에 브라우저의 local/sessiong storage를 받아올때 class 로 따로 관리해줘야 작동한다. */

class LocalStorage { 
     constructor() {}
   
     static setItem(key, item) {
       if (typeof window !== "undefined") {
         localStorage.setItem(key, item);
       }
     }
   
     static getItem(key) {
       if (typeof window !== "undefined") {
         return localStorage.getItem(key);
       }
       return null;
     }
   
     static removeItem(key) {
       if (typeof window !== "undefined") {
         localStorage.removeItem(key);
       }
     }
   }
   
   export default LocalStorage;