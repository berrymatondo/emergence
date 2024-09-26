export enum CurrencyList {
  USR = "USD",
  EUR = "EUR",
  CDF = "CDF",
}

export enum CouponBasisList {
  AA = "AA",
  A0 = "A0",
  A5 = "A5",
}

export const CouponFreqList = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export const SwapFreqList = [
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months",
  "7 months",
  "8 months",
  "9 months",
  "10 months",
  "11 months",
  "1 year",
  "2 years",
];

export const AmortizedCouponFreqList = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "32",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
];

export const LabelList = [
  "1M",
  "2M",
  "3M",
  "4M",
  "5M",
  "6M",
  "7M",
  "8M",
  "9M",
  "10M",
  "11M",
  "12M",
];

export const valuationTypes = [
  {
    id: 1,
    label: "Straight Bond",
    modality: 1,
    value: "straightbond",
  },
  {
    id: 2,
    label: "Amortized Bond",
    modality: 2,
    value: "amortizedbond",
  },
];

export const ModalityTypes = [
  {
    id: 1,
    name: "Due date",
  },
  {
    id: 2,
    name: "Amortized",
  },
];

export const ratings = [
  { id: 1, label: "AAA" },
  { id: 2, label: "AA" },
  { id: 3, label: "A" },
  { id: 4, label: "B" },
  { id: 5, label: "BBB" },
  { id: 6, label: "BB" },
  { id: 7, label: "B" },
  { id: 8, label: "CCC/C" },
];
