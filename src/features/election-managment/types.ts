export type CREATE_ELECTION_ERORRS = {
  name: string;
};

export type INITIALSTATE_ELECTION_FORM = {
  success: boolean;
  message: string;
  errors: CREATE_ELECTION_ERORRS;
};

export type ELECTION_FORM_FIELDS = {
  name: string;
};
