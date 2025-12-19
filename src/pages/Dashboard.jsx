import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "tasks"),
            where("userId", "==", currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Sort by timestamp if needed
            tasksData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
            setTasks(tasksData);
        });

        return unsubscribe;
    }, [currentUser]);

    async function handleLogout() {
        setError("");
        try {
            await logout();
            navigate("/login");
        } catch {
            setError("Failed to log out");
        }
    }

    async function addTask(e) {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            await addDoc(collection(db, "tasks"), {
                title: newTask,
                completed: false,
                userId: currentUser.uid,
                createdAt: serverTimestamp()
            });
            setNewTask("");
        } catch (err) {
            console.error("Error adding task:", err);
            setError("Failed to add task");
        }
    }

    async function toggleComplete(id, currentStatus) {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {
            completed: !currentStatus
        });
    }

    async function deleteTask(id) {
        const taskRef = doc(db, "tasks", id);
        await deleteDoc(taskRef);
    }

    async function updateTask(id, newTitle) {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {
            title: newTitle
        });
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Task Manager</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening'},
                        <span style={{ color: 'var(--accent-color)', marginLeft: '0.5rem' }}>{currentUser.email.split('@')[0]}</span>
                    </p>
                </div>
                <button onClick={handleLogout} className="btn-secondary">Log Out</button>
            </header>

            {error && <div className="alert error">{error}</div>}

            <form onSubmit={addTask} className="add-task-form">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button type="submit" className="btn-primary">Add</button>
            </form>

            <div className="task-list">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        toggleComplete={toggleComplete}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                    />
                ))}
                {tasks.length === 0 && <p className="no-tasks">No tasks yet. Add one above!</p>}
            </div>
        </div>
    );
}
