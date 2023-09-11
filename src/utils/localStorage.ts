export const setLocalStorageItem = (key: string, data: any) => {
  let tempData: string;
  if (typeof data === "object") {
    tempData = JSON.stringify(data);
  } else {
    tempData = data;
  }
  window.localStorage.setItem(key, tempData);
};

export const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

export const removeLocalStorageItem = (key: string) => {
  return window.localStorage.removeItem(key);
};

export const getLocalStorageJsonItem = (key: string) => {
  let tempData: string = window.localStorage.getItem(key) || "";
  if (tempData !== "") {
    return JSON.parse(tempData);
  } else {
    return null;
  }
};
