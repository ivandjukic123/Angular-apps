export class SellCarModel {
  email: string;
  regNo: string;
  mileage: any;
  acceptedGdprConsent: boolean;
  sellStatus: string;
  language: string;
  phone: number;

  constructor(data?: any) {
    this.email = data && data.email ? data.email : undefined;
    this.regNo = data && data.regNo ? data.regNo : undefined;
    this.mileage = data && data.mileage ? data.mileage : undefined;
    this.acceptedGdprConsent = true;
    this.sellStatus = data && data.sellStatus ? data.sellStatus : 'SELL';
    this.language = data && data.language ? data.language : 'sv';
    this.phone = data && data.phone ? data.phone : undefined;
  }
}
