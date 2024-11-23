export type REPRESENTATIVE = {
  name: string;
};

export type INITIALSTATE_REPRESENTATIVE_FORM = {
  success: boolean;
  message: string;
  errors: ERORRS;
};

export type ERORRS = {
  name: string;
};

export type REPRESENTATIVE_FORM_FIELDS = {
  name: string;
};

export type ELECTION = {
  name: string;
  proposal: string;
};

export type ELECTIONS = {
  elections: ELECTION[];
};
