export const toEnglishDigits = (str: string) => {
  const pn = "۰۱۲۳۴۵۶۷۸۹";
  const an = "٠١٢٣٤٥٦٧٨٩";

  if (/[۰-۹]/g.test(str)) {
    console.log("Hell");
    return str.replace(/[۰-۹]/g, (d) => pn.indexOf(d).toString());
  }

  return str;
};
