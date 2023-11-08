//TODO to test

export const isCorrectEmail = (email: string) => /^[\w\-.]+@[\w-]+\.[\w-]{2,}$/.test(email);

export const getCookie = (name: string) => {
  if (!document.cookie || document.cookie === "") return;

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Does this cookie string begin with the name we want?
    if (cookie.substring(0, name.length + 1) === name + "=") {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
};
