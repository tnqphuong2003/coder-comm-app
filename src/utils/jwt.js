import jwtDecode from "jwt-decode";

// function cho biết hết thời gian login, cần phải login lại
export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decode = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decode.exp > currentTime;
};
