export interface ITasks {
  taskId: string;
  title: string;
  description: string;
  daysForCompletion: number;
  dueDate: string;
  priority: number;
  isCompleted: number;
  employeeId: string;
  employeeName: string;
  projectId: string;
  projectName: string;
}

export interface AddTask {
  title: string;
  description: string;
  daysForCompletion: number;
  priority: number;
  projectId: string;
  employeeId: string;
}

export interface IAnalyticsTask {
  taskId: string;
  taskName: string;
}

export interface IresponseTask {
  completedTasks: IAnalyticsTask[];

  timeHavingTasks: IAnalyticsTask[];

  dueTasks: IAnalyticsTask[];
}
