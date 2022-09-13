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