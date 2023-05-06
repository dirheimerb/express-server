import CalendarMember from "./CalendarMember";

export default class Calendar {
  name: string;
  description?: string;
  color?: string;
  members: string[];

  constructor(name: string) {
    this.name = name;
    this.members = [];
  }

  addMember(member: string) {
    this.members.push(member);
  }

  removeMember(member: string) {
    this.members = this.members.filter((m) => m !== member);
  }

  changeName(name: string) {
    this.name = name;
  }

  changeDescription(description: string) {
    this.description = description;
  }

  changeColor(color: string) {
    this.color = color;
  }

  static async create(name: string) {
    const calendar = new Calendar(name);
    await calendar.save();
    return calendar;
  }

  async save() {
    // save to database
  }

  static async findById(id: string) {
    // find calendar by id
  }

  static async findByName(name: string) {
    // find calendar by name
  }

  static async findAll() {
    // find all calendars
  }

  static async deleteById(id: string) {
    // delete calendar by id
  }

  static async deleteByName(name: string) {
    // delete calendar by name
  }

  static async deleteAll() {
    // delete all calendars
  }

  //   static async addMember(calendarId: string, member: CalendarMember) {
  //     return addMember(calendarId, member);
  //   }
}
