async function request(path, options = null) {
  const url = `http://localhost:5000${path}`;
  const response = await fetch(url, options);
  return response.json();
}

export function getLists() {
  return request("/lists");
}

export function postList(list) {
  return request("/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
}

export function postList1(props) {
  return request("/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
}

export function getPersonCount() {
  return request("/personcount")
}