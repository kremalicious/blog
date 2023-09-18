declare module 'dms2dec' {
  export default function dms2dec(
    lat: readonly number[],
    latRef: string,
    lon: readonly number[],
    lonRef: string
  ): [latDec: string, lonDec: string]
}
