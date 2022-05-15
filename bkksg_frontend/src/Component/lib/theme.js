const theme = {
  day: {
    gradient: {
      radial:
        "radial-gradient(circle, rgba(236,195,202,0.6) 4%, rgba(165,206,218,0.6) 87%)",
      linear:
        "linear-gradient(69deg, rgba(173,148,191,0.6) 0%, rgba(145, 180, 173, 0.6) 68%, rgba(226,220,185,0.4) 91%) ",
      footer:
        "radial-gradient(circle, rgba(238,204,209,1) 20%, rgba(74,166,141,0.1) 87%)",
    },

    colors: {
      main: "#B3BFCE",
      content: "rgba(255,255,255,0.1)",
      index: "rgba(245,245,230,1)",
      card: "rgba(155,160,180,0.5)",
      section: "rgba(100,110,130,1)",
      hover: "rgba(200,200,210,0.3)",
      modal: "azure",
      cancel: "rgba(175,175,175,1)",
      detailHeader: {
        mid: "rgba(236,195,202, 0.6)",
        end: "rgba(226,220,185,0.5)",
      },
      topic: "gold",
    },

    glass: {
      shadow: "0 8px 30px 0 rgba( 31, 38, 135, 0.37 )",
      filter: "blur( 4px )",
      border: {
        radius: "0.5rem",
        line: "0.5px rgba(200, 200, 200, 0.7) solid",
      },
    },
  },

  night: {
    gradient: {
      radial:
        "radial-gradient(circle, rgba(40,100,138,0.7) 16%, rgba(55,45,78,0.7) 87%)",
      linear:
        "linear-gradient(69deg, rgba(28,37,84,0.6) 4%, rgba(102,48,108,0.6) 64%, rgba(30,110,136,0.6) 100%)",
      footer:
        "radial-gradient(circle, rgba(40,80,108,1) 28%, rgba(55,45,78,0.1) 87%)",
    },

    colors: {
      main: "rgba(11,39,51,1)",
      content: "rgba(0,0,0,0.2)",
      index: "rgba(211,211,211,0.9)",
      section: "rgba(190,190,190,1)",
      card: "rgba(100,100,170,0.2)",
      hover: "rgba(100,100,170,0.4)",
      modal: "rgba(11,39,51,1)",
      cancel: "rgba(211,211,211,0.9)",
      detailHeader: {
        mid: "rgba(28,37,84,0.5)",
        end: "rgba(30,0,70,0.5)",
      },
      topic: "greenyellow",
    },

    glass: {
      shadow: "0 8px 30px 0 rgba( 31, 38, 135, 0.37 )",
      filter: "blur( 4px )",
      border: {
        radius: "0.5rem",
        line: "0.5px rgba( 123, 104, 238, 0.5 ) solid",
      },
    },
  },

  common: {
    screen: {
      max: "1400px",
    },
    color: "azure",
    lightgrey: "lightgrey",
    little: "rgba(130,130,130,1)",
  },
};

export default theme;
