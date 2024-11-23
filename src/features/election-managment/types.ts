export type ERORRS = {
  name: string;
};

export type INITIALSTATE_ELECTION_FORM = {
  success: boolean;
  message: string;
  errors: ERORRS;
};

export type ELECTION = {
  name: string;
  proposal: string;
};
export type ELECTION_FORM_FIELDS = {
  name: string;
  proposal: string;
};
