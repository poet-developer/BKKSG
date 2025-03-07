const id = process.env.NEXT_PUBLIC_REACT_APP_ADMIN_ID;
const password = process.env.NEXT_PUBLIC_REACT_APP_ADMIN_PASSWORD;
const users = [{ id: id, password: password }];

const Auth = ({ id, password }) => {
  const user = users.find(
    // 배열에 조건을 만족하는 함수를 받아옴
    (user) => user.id === id && user.password === password, // 아이디 패스워드 확인
  );
  if (user === undefined) throw new Error();
  return user;
};

export default Auth;
