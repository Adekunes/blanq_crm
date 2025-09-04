import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import TaskBoard from './components/TaskBoard';
import TaskFilters from './components/TaskFilters';
import TaskModal from './components/TaskModal';
import { DragDropContext } from 'react-beautiful-dnd';
import { format } from 'date-fns';

const CollaborativeToDoManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    assignedTo: '',
    priority: '',
    status: '',
    search: '',
    dueDateFrom: '',
    dueDateUntil: ''
  });

  // Mock data for tasks organized by status
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: "Review quarterly financial reports",
        description: "Analyze Q3 revenue, expenses, and profit margins for business partner review",
        assignedTo: "You",
        priority: "high",
        dueDate: "2024-09-10",
        status: "todo",
        createdAt: "2024-09-04",
        comments: [
          { id: 1, author: "Business Partner", text: "Need this by end of week", timestamp: "2024-09-04 09:00" }
        ],
        dependencies: [],
        tags: ["finance", "review"],
        estimatedHours: 4
      },
      {
        id: 2,
        title: "Update client contract templates",
        description: "Revise standard contract templates with new Quebec legal requirements",
        assignedTo: "Business Partner",
        priority: "medium",
        dueDate: "2024-09-12",
        status: "todo",
        createdAt: "2024-09-04",
        comments: [],
        dependencies: [],
        tags: ["legal", "contracts"],
        estimatedHours: 6
      },
      {
        id: 3,
        title: "Plan marketing strategy for Q4",
        description: "Develop comprehensive marketing strategy for the upcoming quarter with budget allocation",
        assignedTo: "You",
        priority: "medium",
        dueDate: "2024-09-15",
        status: "todo",
        createdAt: "2024-09-04",
        comments: [
          { id: 1, author: "You", text: "Started competitor analysis", timestamp: "2024-09-04 14:30" }
        ],
        dependencies: [1],
        tags: ["marketing", "strategy", "quarterly"],
        estimatedHours: 8
      }
    ],
    inProgress: [
      {
        id: 4,
        title: "Implement new CRM system",
        description: "Set up and configure the new customer relationship management system for both partners",
        assignedTo: "Business Partner",
        priority: "high",
        dueDate: "2024-09-18",
        status: "inProgress",
        createdAt: "2024-08-28",
        comments: [
          { id: 1, author: "Business Partner", text: "Database migration completed", timestamp: "2024-09-02 10:15" },
          { id: 2, author: "You", text: "Great progress! Need training schedule", timestamp: "2024-09-03 16:45" }
        ],
        dependencies: [],
        tags: ["crm", "technology", "setup"],
        estimatedHours: 12,
        progress: 65
      },
      {
        id: 5,
        title: "Prepare presentation for investors",
        description: "Create comprehensive business presentation for upcoming investor meeting",
        assignedTo: "You",
        priority: "high",
        dueDate: "2024-09-08",
        status: "inProgress",
        createdAt: "2024-08-30",
        comments: [
          { id: 1, author: "Business Partner", text: "Include Q3 metrics in slides 8-10", timestamp: "2024-09-01 11:20" }
        ],
        dependencies: [1],
        tags: ["presentation", "investors", "business"],
        estimatedHours: 10,
        progress: 40
      }
    ],
    completed: [
      {
        id: 6,
        title: "Office lease renewal negotiation",
        description: "Successfully negotiated favorable terms for office lease renewal",
        assignedTo: "Business Partner",
        priority: "medium",
        dueDate: "2024-09-01",
        status: "completed",
        createdAt: "2024-08-15",
        completedAt: "2024-08-31",
        comments: [
          { id: 1, author: "Business Partner", text: "Secured 15% reduction in rent!", timestamp: "2024-08-31 15:30" },
          { id: 2, author: "You", text: "Excellent negotiation! 🎉", timestamp: "2024-08-31 16:00" }
        ],
        dependencies: [],
        tags: ["office", "lease", "negotiation"],
        estimatedHours: 8,
        actualHours: 6
      },
      {
        id: 7,
        title: "Team building event planning",
        description: "Organized and executed quarterly team building event",
        assignedTo: "You",
        priority: "low",
        dueDate: "2024-08-25",
        status: "completed",
        createdAt: "2024-08-01",
        completedAt: "2024-08-25",
        comments: [
          { id: 1, author: "You", text: "Event was a great success! Team loved it", timestamp: "2024-08-25 18:00" }
        ],
        dependencies: [],
        tags: ["team", "event", "culture"],
        estimatedHours: 5,
        actualHours: 7
      }
    ]
  });

  // Partner options for assignment
  const partnerOptions = [
    { value: "You", label: "You" },
    { value: "Business Partner", label: "Business Partner" }
  ];

  // Filter tasks based on current filters
  const filteredTasks = useMemo(() => {
    const filterTasksArray = (tasksArray) => {
      return tasksArray?.filter(task => {
        const matchesAssignedTo = !filters?.assignedTo || task?.assignedTo === filters?.assignedTo;
        const matchesPriority = !filters?.priority || task?.priority === filters?.priority;
        const matchesStatus = !filters?.status || task?.status === filters?.status;
        const matchesSearch = !filters?.search || 
          task?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
          task?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
          task?.tags?.some(tag => tag?.toLowerCase()?.includes(filters?.search?.toLowerCase()));
        const matchesDueDateFrom = !filters?.dueDateFrom || task?.dueDate >= filters?.dueDateFrom;
        const matchesDueDateUntil = !filters?.dueDateUntil || task?.dueDate <= filters?.dueDateUntil;

        return matchesAssignedTo && matchesPriority && matchesStatus && 
               matchesSearch && matchesDueDateFrom && matchesDueDateUntil;
      });
    };

    return {
      todo: filterTasksArray(tasks?.todo),
      inProgress: filterTasksArray(tasks?.inProgress),
      completed: filterTasksArray(tasks?.completed)
    };
  }, [tasks, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      assignedTo: '',
      priority: '',
      status: '',
      search: '',
      dueDateFrom: '',
      dueDateUntil: ''
    });
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setSelectedTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setSelectedTask(null);
    setShowTaskModal(true);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        Object.keys(newTasks)?.forEach(status => {
          newTasks[status] = newTasks?.[status]?.filter(task => task?.id !== taskId);
        });
        return newTasks;
      });
    }
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        const currentStatus = editingTask?.status;
        const newStatus = taskData?.status;
        
        // Remove from current status
        newTasks[currentStatus] = newTasks?.[currentStatus]?.filter(task => task?.id !== editingTask?.id);
        
        // Add to new status
        const updatedTask = {
          ...editingTask,
          ...taskData,
          updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm')
        };
        
        if (!newTasks?.[newStatus]) {
          newTasks[newStatus] = [];
        }
        newTasks[newStatus] = [...newTasks?.[newStatus], updatedTask];
        
        return newTasks;
      });
    } else {
      // Create new task
      const newTask = {
        ...taskData,
        id: Math.max(...Object.values(tasks)?.flat()?.map(t => t?.id)) + 1,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
        comments: [],
        dependencies: []
      };
      
      setTasks(prevTasks => ({
        ...prevTasks,
        [taskData?.status]: [...prevTasks?.[taskData?.status], newTask]
      }));
    }
    setShowTaskModal(false);
    setEditingTask(null);
    setSelectedTask(null);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If no destination or same position, do nothing
    if (!destination || 
        (destination?.droppableId === source?.droppableId && 
         destination?.index === source?.index)) {
      return;
    }

    const sourceStatus = source?.droppableId;
    const destStatus = destination?.droppableId;
    const taskId = parseInt(draggableId);

    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      
      // Find and remove the task from source
      let draggedTask = null;
      newTasks[sourceStatus] = newTasks?.[sourceStatus]?.filter(task => {
        if (task?.id === taskId) {
          draggedTask = { ...task };
          return false;
        }
        return true;
      });

      // Update task status and add to destination
      if (draggedTask) {
        draggedTask.status = destStatus;
        if (destStatus === 'completed' && !draggedTask?.completedAt) {
          draggedTask.completedAt = format(new Date(), 'yyyy-MM-dd HH:mm');
        }
        
        newTasks?.[destStatus]?.splice(destination?.index, 0, draggedTask);
      }

      return newTasks;
    });
  };

  const getTaskCounts = () => {
    const allTasks = Object.values(tasks)?.flat();
    const yourTasks = allTasks?.filter(task => task?.assignedTo === 'You');
    const partnerTasks = allTasks?.filter(task => task?.assignedTo === 'Business Partner');
    const overdueTasks = allTasks?.filter(task => 
      task?.status !== 'completed' && new Date(task?.dueDate) < new Date()
    );

    return {
      total: allTasks?.length,
      todo: tasks?.todo?.length,
      inProgress: tasks?.inProgress?.length,
      completed: tasks?.completed?.length,
      yourTasks: yourTasks?.length,
      partnerTasks: partnerTasks?.length,
      overdue: overdueTasks?.length
    };
  };

  const taskCounts = getTaskCounts();

  return (
    <>
      <Helmet>
        <title>Collaborative To-Do Management - BLANQ CRM</title>
        <meta name="description" content="Shared task coordination between business partners with real-time synchronization and accountability tracking" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Collaborative To-Do Management
                </h1>
                <p className="text-muted-foreground">
                  Shared task coordination between business partners with real-time synchronization
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Tasks
                </Button>
                <Button
                  onClick={handleNewTask}
                  iconName="Plus"
                  iconPosition="left"
                >
                  New Task
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckSquare" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold text-foreground">{taskCounts?.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Icon name="Circle" size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">To Do</p>
                    <p className="text-2xl font-bold text-foreground">{taskCounts?.todo}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-foreground">{taskCounts?.inProgress}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">{taskCounts?.completed}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Tasks</p>
                    <p className="text-2xl font-bold text-foreground">{taskCounts?.yourTasks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Partner Tasks</p>
                    <p className="text-2xl font-bold text-foreground">{taskCounts?.partnerTasks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-2xl font-bold text-foreground">{taskCounts?.overdue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <TaskFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              partnerOptions={partnerOptions}
            />

            {/* Task Board */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <TaskBoard
                tasks={filteredTasks}
                onEditTask={handleEditTask}
                onViewTask={handleViewTask}
                onDeleteTask={handleDeleteTask}
              />
            </DragDropContext>
          </div>
        </main>

        {/* Task Modal */}
        <TaskModal
          isOpen={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
            setSelectedTask(null);
          }}
          onSave={handleSaveTask}
          task={editingTask}
          viewTask={selectedTask}
          partnerOptions={partnerOptions}
        />
      </div>
    </>
  );
};

export default CollaborativeToDoManagement;