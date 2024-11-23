export type REPRESENTATIVE = {
  name: string;
  election: string;
};

export type INITIALSTATE_REPRESENTATIVE_FORM = {
  success: boolean;
  message: string;
  errors: ERORRS;
};

export type ERORRS = {
  name: string;
};

export type ELECTION_SELECTION = {
  name: string;
};
