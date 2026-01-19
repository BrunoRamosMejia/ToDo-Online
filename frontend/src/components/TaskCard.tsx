import React from "react";

interface TaskCardProps {
    task: {
        id?: string;
        taskName: string;
        description: string;
        status: boolean; // o string, según tu modelo
    };
    onStatusChange?: (taskId: string, newStatus: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange }) => {
    const handleCheckboxChange = () => {
        if (onStatusChange && task.id) {
            onStatusChange(task.id, !task.status);
        }
    };

    return (
        <div className="flex items-center gap-3 rounded-lg border p-4 bg-[#fff8f1] shadow">
            <input
                type="checkbox"
                checked={!!task.status}
                onChange={handleCheckboxChange}
                className="shrink-0 mt-1 accent-[#A47551] w-7 h-7"
            />
            <div>
                <h3 className="font-semibold text-[#4B3A23]">{task.taskName}</h3>
                <p className="text-[#7C5E3C]">{task.description}</p>
            </div>
        </div>
    );
};

export default TaskCard;