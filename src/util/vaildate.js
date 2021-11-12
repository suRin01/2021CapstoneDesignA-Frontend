export function validate(key, value) {
  const regxId = /(?=.*\d)(?=.*[a-zA-ZS]).{6,}/;
  const regxPassword = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const regxEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  const regxPhone = /[0-9]{11,11}/;
  const regxYear = /[0-9]{4,4}/;
  const regxMonth = /[0-9]{2,2}/;

  switch (key) {
    case "id":
      return regxId.test(value);
    case "password":
      return regxPassword.test(value);
    case "email":
      return regxEmail.test(value);
    case "phone":
      return regxPhone.test(value);
    case "year":
      return regxYear.test(value);
    case "month":
    case "day":
      return regxMonth.test(value);

    default:
      return false;
  }
}
