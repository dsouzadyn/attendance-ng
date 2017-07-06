export class AttendanceHolder {
  id: number;
  student: {
    id: number,
    branch: number,
    created: string,
    first_name: string,
    last_name: string,
    roll_no: number,
    semester: number
  };
  subs: Array<{
    id: number;
    practical: Array<{
      id: number,
      actual: number,
      total: number,
    }>;
    theory: Array<{
      id: number,
      actual: number,
      total: number,
    }>;
    subject: {
      id: number,
      abbr: string,
      sub_type: number,
      subject_name: string,
    };
  }>;
}
