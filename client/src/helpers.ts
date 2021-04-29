export interface Frame {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  user: User;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
}

const makeRequest = async (
  url: string,
  method: string,
  reqBody?: Frame | User
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
