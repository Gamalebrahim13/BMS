import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { EmployeeChangeStatus, GetEmployeeTasks, type Task, type TasksResponse } from "../../../../api/module/task";
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
const STATUS_MAP: Record<string, string> = {
  "To Do": "ToDo",
  "In progress": "InProgress",
  "Done": "Done"
};

const COLUMN_MAP: Record<string, string> = {
  "ToDo": "To Do",
  "InProgress": "In progress",
  "Done": "Done"
};

interface BoardState {
  [key: string]: Task[];
}
export default function TaskBoard() {
  const [boardData, setBoardData] = useState<BoardState>({
    "To Do": [],
    "In progress": [],
    "Done": []
  });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response: TasksResponse = await GetEmployeeTasks(1, 100);
        const allTasks = response.data || []; 
        const columns: BoardState = {
          "To Do": [],
          "In progress": [],
          "Done": []
        };
        allTasks.forEach((task) => {
          const columnName = COLUMN_MAP[task.status];
          if (columnName && columns[columnName]) {
            columns[columnName].push(task);
          }
        });

        setBoardData(columns);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;

    const previousBoardData = { ...boardData };

    const newBoardData = { ...boardData };

    const startTasks = Array.from(newBoardData[startColumn]);
    const [movedTask] = startTasks.splice(source.index, 1);
    newBoardData[startColumn] = startTasks;

    const apiStatusValue = STATUS_MAP[endColumn];
    const updatedTask = { ...movedTask, status: apiStatusValue };

    const endTasks = Array.from(newBoardData[endColumn]);
    endTasks.splice(destination.index, 0, updatedTask);
    newBoardData[endColumn] = endTasks;

    setBoardData(newBoardData);

    try {
      await EmployeeChangeStatus(draggableId, { status: apiStatusValue });
    } catch (error) {
      setBoardData(previousBoardData);
    }
  };

  if (loading) {
    return <div className="p-6 text-white text-center">Loading.....</div>;
  }
  
 return (
  <div className="min-h-screen px-4 py-6">
    <CrudHeader title="Task Board" />

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4 lg:justify-center">
        
        {Object.keys(boardData).map((columnId) => {
          const tasks = boardData[columnId];

          return (
            <div
              key={columnId}
              className="
                flex-shrink-0
                w-[300px]
                sm:w-[340px]
                lg:flex-1
                bg-[#2d534f]
                rounded-2xl
                p-4
                text-white
                shadow-lg
                flex
                flex-col
                gap-6
              "
            >
              <h3 className="text-lg font-semibold capitalize px-1">
                {columnId}
              </h3>

              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      flex-1
                      min-h-[300px]
                      sm:min-h-[400px]
                      rounded-xl
                      p-2
                      transition-colors
                      duration-200
                      ${
                        snapshot.isDraggingOver
                          ? "bg-[#23413e]"
                          : "bg-transparent"
                      }
                    `}
                  >
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`
                              p-4
                              mb-3
                              bg-[#f29924]
                              rounded-xl
                              text-white
                              shadow-md
                              flex
                              justify-between
                              items-center
                              transition-all
                              ${
                                snapshot.isDragging
                                  ? "rotate-2 scale-105 shadow-2xl"
                                  : ""
                              }
                            `}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div className="flex flex-col gap-1">
                              <span className="text-sm sm:text-base font-semibold break-words">
                                {task.title}
                              </span>

                              {task.project && (
                                <span className="text-[10px] sm:text-xs text-gray-200 bg-[#2d534f] px-2 py-1 rounded-md w-fit">
                                  📁 {task.project.title}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  </div>
);
}