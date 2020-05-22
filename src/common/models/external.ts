export interface ActBlue {
  requestContribution(config: ActBlueConfig): void;
}

export interface ActBlueConfig {
  token: string;
  amount?: string; // a pre-selected amount
  donorData?: ActBlueDonor; // pre-entered information about the donor
  //   express?: any; // maybe a bool indicating if express should be used?
  refcodes?: string; // comma-sep ref codes
}

export interface ActBlueDonor {
  firstname?: string;
  lastname?: string;
  email?: string;
  zip?: string;
}
