const detectIE = (window) => {
     // Internet Explorer 6-11
     const isIE = /*@cc_on!@*/ false || !!document.documentMode
     // Edge 20+
     const isEdge = !isIE && !!window.StyleMedia
     if (isIE || isEdge) return true
   };

export default detectIE