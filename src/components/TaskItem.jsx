import React, { useState } from "react";

export default function TaskItem({ task, toggleComplete, deleteTask, updateTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleUpdate = () => {
        updateTask(task.id, newTitle);
        setIsEditing(false);
    };

    return (
        <div className={`task-item ${task.completed ? "completed" : ""}`}>
            <div className="task-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id, task.completed)}
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="edit-input"
                        autoFocus
                        onBlur={handleUpdate}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                    />
                ) : (
                    <span className="task-title">{task.title}</span>
                )}
            </div>
            <div className="task-actions">
                {isEditing ? (
                    <button onClick={handleUpdate} className="btn-icon save" title="Save">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="btn-icon edit" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                )}
                <button onClick={() => deleteTask(task.id)} className="btn-icon delete" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            </div>
        </div>
    );
}
