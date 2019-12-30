export interface BugData {
  id: string;
  title: string;
  category: string;
  errorCode: string;
  errorMessage: string;
  steps: string;
  startDate: string;
  build: string;
}

export interface NewBugData extends Omit<BugData, "id"> {}
