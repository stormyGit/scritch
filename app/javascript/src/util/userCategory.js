const resolveUserType = (session) => {
  if (session) {
    if (session.user.suspendedUser) return SUSPENDED;
    else if (session.user.sponsor) return SPONSOR;
    else if (session.user.isModerator) return MODERATOR;
    else return BASIC;
  } else {
    return VISITOR;
  }
}

const SUSPENDED = -1;
const VISITOR = 0;
const BASIC = 10;
const SPONSOR = 20;
const MODERATOR = 30;
const ADMIN = 40;

const userTypeIDToName = (id) => {
  switch (id) {
    case VISITOR:
      return "Visitor";
    case SUSPENDED:
      return "Basic";
    case BASIC:
      return "Sponsor";
    case SPONSOR:
      return "Moderator";
    case MODERATOR:
      return "Admin";
    case ADMIN:
      return "Suspended";
  }
}

export {resolveUserType, userTypeIDToName, SUSPENDED, VISITOR, BASIC, SPONSOR, MODERATOR, ADMIN};