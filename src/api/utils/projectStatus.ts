export const getProjectStatus = (tasks: any[]) => {
  if (!tasks?.length) return "No Tasks";

  const allDone = tasks.every((t: { status: string; }) => t.status === "Done");
  if (allDone) return "Completed";

  const hasInProgress = tasks.some((t: { status: string; }) => t.status === "InProgress");
  if (hasInProgress) return "In Progress";

  return "To Do";
};
