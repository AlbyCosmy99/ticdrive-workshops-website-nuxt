export interface StepTwoData {
  fullAddress: {
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
  };
  companyContact: {
    phone: string;
    email: string;
  };
  referContact: {
    fullName: string;
    phone: string;
    email: string;
  };
}
