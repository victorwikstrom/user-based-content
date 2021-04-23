export interface Post {
  title: string;
  description: string;
  author: string;
  date: string;
}

export interface User {
  username: string;
  password: string;
  role: string;
}

const makeRequest = async (
  url: string,
  method: string,
  reqBody?: Post | User
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  return response.json();
};

export default makeRequest;
