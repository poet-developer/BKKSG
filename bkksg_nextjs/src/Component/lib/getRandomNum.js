/** 내가 만든 로고는 사각형 안에 텍스트가 랜덤으로 비껴서기, BKKSG, ㅂㄲㅅㄱ로 바뀌어 나온다 */
/** Html canvas에서 배경에 나오는 10가지의 이미지는 랜덤으로 나온다 */

const getRandomNum = (num) => {
  return Math.floor(Math.random() * num + 1);
};

export default getRandomNum;
