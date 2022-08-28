import LocalStorage from "../../src/Component/lib/LocalStorage";

export default function handler(req, res) {
     const theme = LocalStorage.getItem("Theme");
     res.status(200).json({ theme: theme })
   }
   