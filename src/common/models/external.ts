export interface ActBlue {
  requestContribution(config: ActBlueConfig): Promise<ActBlueContribution>;
  addEventListener(eventName: string, completion: ActBlueCompletionCallback);
}

export type ActBlueCompletionCallback = (
  contribution: ActBlueContribution
) => void;

export interface ActBlueConfig {
  token: string; // the config token for this embed, the only required attribute
  amount?: string; // a pre-selected amount
  donorData?: ActBlueDonor; // pre-entered information about the donor
  express?: boolean; // maybe a bool indicating if express should be used?
  refcodes?: string; // comma-sep ref codes
}

export interface ActBlueDonor {
  firstname?: string;
  lastname?: string;
  email?: string;
  zip?: string;
}

export interface ActBlueContribution {
  amount: number;
  embedId: string;
  email?: string;
  name: string;
  order_number: string;
  refcode?: string;
}
