export enum CalendarRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export default class CalendarMember {
  name: string;
  email: string;
  role: CalendarRole;

  constructor(name: string, email: string, role: CalendarRole) {
    this.name = name;
    this.email = email;
    this.role = role;
  }

  changeName(name: string) {
    this.name = name;
  }

  changeEmail(email: string) {
    this.email = email;
  }

  changeRole(role: CalendarRole) {
    this.role = role;
  }

  static async create(member: CalendarMember) {
    const newMember = new CalendarMember(
      member.name,
      member.email,
      member.role
    );
    await newMember.save();
    return newMember;
  }

  async save() {
    // save to database
  }
}
