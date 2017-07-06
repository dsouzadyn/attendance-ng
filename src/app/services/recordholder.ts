export class RecordHolder {
  id: number;
  branch: number;
  semester: number;
  subject: {
    id: number;
    abbr: string;
    sub_type: number;
    subject_name: string;
  };
}
