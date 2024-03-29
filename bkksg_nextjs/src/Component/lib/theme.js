/**
 * 사이트 전체 테마는 두가지로 분기된다.
 * day theme, night theme의 스타일을 object형태로 보관한다.
 */

const theme = {
  day: {
    gradient: {
      radial:
        "radial-gradient(circle, rgba(236,195,202,0.6) 4%, rgba(165,206,218,0.6) 87%)",
      linear:
        "linear-gradient(69deg, rgba(173,148,191,0.6) 0%, rgba(145, 180, 173, 0.6) 68%, rgba(226,220,185,0.4) 91%) ",
      footer:
        "radial-gradient(circle, rgba(240,210,215,1) 40%, rgba(74,166,141,0.1) 87%)",
    },

    colors: {
      main: "#B3BFCE",
      content: "rgba(255,255,255,0.1)",
      innerDetail: "rgba(169,180,195,1)",
      index: "rgba(245,245,230,1)",
      card: "rgba(155,160,180,0.5)",
      section: "rgba(100,110,130,1)",
      hover: "rgba(200,200,210,0.3)",
      modal: "rgba(225,235,240, 1)",
      backBtn: "rgba(255,255,255,1)",
      detailHeader: {
        mid: "rgba(236,195,202, 0.6)",
        end: "rgba(226,220,185,0.5)",
      },
      topic: "gold",
    },

    glass: {
      shadow: "0 8px 30px 0 rgba( 31, 38, 135, 0.37 )",
      detailShadow: "0 8px 30px 0 rgba( 31, 38, 135, 0.37 )",
      searchItemShadow: "1px 1px 8px 8px rgba(100,110,140,0.4)",
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
      innerDetail: "rgba(8,36,47,1)",
      content: "rgba(0,0,0,0.2)",
      index: "rgba(211,211,211,0.9)",
      section: "rgba(190,190,190,1)",
      card: "rgba(100,100,170,0.2)",
      hover: "rgba(100,100,170,0.4)",
      modal: "rgba(11,39,51,1)",
      backBtn: "rgba(255,255,255,1)",
      detailHeader: {
        mid: "rgba(28,37,84,0.5)",
        end: "rgba(30,0,70,0.5)",
      },
      topic: "greenyellow",
    },

    glass: {
      shadow: "0 8px 30px 0 rgba( 31, 38, 135, 0.37 )",
      detailShadow: "0 8px 30px 0 rgba( 0, 20, 10, 0.47 )",
      searchItemShadow: "1px 1px 8px 8px rgba(10,25,40,0.5)",
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
    little: "rgba(160,160,160,1)",
  },
};

export default theme;
