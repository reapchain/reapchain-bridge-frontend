export const setItem = (key: string, data: any) => {
  let tempData: string;
  if (typeof data === "object") {
    tempData = JSON.stringify(data);
  } else {
    tempData = data;
  }
  window.localStorage.setItem(key, tempData);
};

export const getItem = (key: string) => {
  return window.localStorage.getItem(key);
};

export const removeItem = (key: string) => {
  return window.localStorage.removeItem(key);
};

export const getJsonItem = (key: string) => {
  let tempData: string = window.localStorage.getItem(key) || "";
  if (tempData !== "") {
    return JSON.parse(tempData);
  } else {
    return null;
  }
};
