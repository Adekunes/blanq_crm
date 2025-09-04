import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import Icon from '../../../components/AppIcon';

const TaskBoard = ({ tasks, onEditTask, onViewTask, onDeleteTask }) => {
  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-blue-500',
      icon: 'Circle',
      tasks: tasks?.todo || []
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      color: 'bg-yellow-500',
      icon: 'Clock',
      tasks: tasks?.inProgress || []
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'bg-green-500',
      icon: 'CheckCircle',
      tasks: tasks?.completed || []
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns?.map((column) => (
          <div key={column?.id} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center space-x-3 pb-4 border-b border-border">
              <div className={`w-3 h-3 rounded-full ${column?.color}`} />
              <div className="flex items-center space-x-2">
                <Icon name={column?.icon} size={18} className="text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{column?.title}</h3>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {column?.tasks?.length}
                </span>
              </div>
            </div>

            {/* Droppable Column */}
            <Droppable droppableId={column?.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided?.innerRef}
                  {...provided?.droppableProps}
                  className={`min-h-[400px] space-y-3 p-2 rounded-lg transition-colors ${
                    snapshot?.isDraggingOver 
                      ? 'bg-muted border-2 border-dashed border-primary' :'bg-transparent'
                  }`}
                >
                  {column?.tasks?.map((task, index) => (
                    <Draggable 
                      key={task?.id?.toString()} 
                      draggableId={task?.id?.toString()} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided?.innerRef}
                          {...provided?.draggableProps}
                          {...provided?.dragHandleProps}
                          className={`transition-transform ${
                            snapshot?.isDragging ? 'rotate-2 scale-105' : ''
                          }`}
                        >
                          <TaskCard
                            task={task}
                            onEdit={() => onEditTask(task)}
                            onView={() => onViewTask(task)}
                            onDelete={() => onDeleteTask(task?.id)}
                            isDragging={snapshot?.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided?.placeholder}
                  
                  {/* Empty State */}
                  {column?.tasks?.length === 0 && !snapshot?.isDraggingOver && (
                    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border rounded-lg">
                      <Icon name="Plus" size={32} className="text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No tasks in {column?.title?.toLowerCase()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Drag tasks here or create new ones
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;