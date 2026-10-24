const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/** Converts ASCII digits inside a string to Bengali numerals. */
export const bn = (value: string | number): string =>
  String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

/** Bengali numeral grouping helper: 1290 → ১,২৯০ */
export const bnNumber = (value: number): string =>
  bn(value.toLocaleString('en-US'));

/** ৳ price label with Bengali numerals. */
export const taka = (value: number): string => `৳${bnNumber(value)}`;
