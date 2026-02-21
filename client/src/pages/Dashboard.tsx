import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Plus, Trash2, CheckCircle, Circle, LogOut, Calendar, ShieldAlert, ShieldCheck, Ghost } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'COMPLETED';
    createdAt: string;
}

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data.data);
        } catch (err) {
            showNotification('Failed to sync tasks with secure server', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const response = await api.post('/tasks', { title, description });
            setTasks([response.data.data, ...tasks]);
            setTitle('');
            setDescription('');
            showNotification('Task created successfully!', 'success');
        } catch (err) {
            showNotification('Failed to create task', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    const toggleTaskStatus = async (task: Task) => {
        const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
        try {
            const response = await api.put(`/tasks/${task.id}`, { status: newStatus });
            setTasks(tasks.map((t) => (t.id === task.id ? response.data.data : t)));
            showNotification(`Task marked as ${newStatus.toLowerCase()}`, 'success');
        } catch (err) {
            showNotification('Failed to update task', 'error');
        }
    };

    const deleteTask = async (id: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter((t) => t.id !== id));
            showNotification('Task deleted successfully', 'success');
        } catch (err) {
            showNotification('Failed to delete task', 'error');
        }
    };

    return (
        <div className="app-container">
            <div className="dashboard">
                <header className="dashboard-header animate-fade">
                    <div className="dashboard-brand">
                        <Logo size={40} showText={false} />
                        <div className="user-profile">
                            <div className="avatar">{user?.name[0].toUpperCase()}</div>
                            <div className="user-details">
                                <h2>{user?.name}</h2>
                                <p>{user?.email} • {user?.role}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={logout} className="logout-btn">
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                <main className="dashboard-content">
                    <section className="create-task-section animate-fade">
                        <div className="glass-card">
                            <h3>Create New Task</h3>
                            <form onSubmit={handleCreateTask} style={{ marginTop: '1rem' }}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Task Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        placeholder="Description (Optional)"
                                        rows={2}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: 'auto' }} disabled={actionLoading}>
                                    {actionLoading ? 'Creating...' : <><Plus size={18} /> Add Task</>}
                                </button>
                            </form>
                        </div>
                    </section>

                    <section className="tasks-section animate-fade">
                        {loading ? (
                            <div className="loading-tasks">
                                <div className="spinner"></div>
                                <p>Securing Connection...</p>
                            </div>
                        ) : (
                            <div className="task-grid">
                                {tasks.map((task) => (
                                    <div key={task.id} className="glass-card task-card">
                                        <div className={`task-status ${task.status === 'COMPLETED' ? 'status-completed' : 'status-pending'}`}>
                                            {task.status === 'COMPLETED' ? <ShieldCheck size={10} style={{ marginRight: '4px' }} /> : <ShieldAlert size={10} style={{ marginRight: '4px' }} />}
                                            {task.status}
                                        </div>
                                        <div className="task-content">
                                            <h3>{task.title}</h3>
                                            <p>{task.description || 'No description provided.'}</p>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Calendar size={12} /> {new Date(task.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="task-actions">
                                            <button
                                                className="btn btn-icon"
                                                title={task.status === 'COMPLETED' ? 'Mark as Pending' : 'Mark as Completed'}
                                                onClick={() => toggleTaskStatus(task)}
                                            >
                                                {task.status === 'COMPLETED' ? <Circle size={18} /> : <CheckCircle size={18} />}
                                            </button>
                                            <button
                                                className="btn btn-icon btn-delete"
                                                title="Delete Task"
                                                onClick={() => deleteTask(task.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {tasks.length === 0 && !loading && (
                            <div className="empty-tasks animate-fade">
                                <Ghost size={64} className="empty-icon" />
                                <div>
                                    <h3>Your Nest is Empty</h3>
                                    <p>No active security tasks found. Add your first task above to start monitoring.</p>
                                </div>
                            </div>
                        )}
                    </section>
                </main>

                {notification && (
                    <div className={`popup-msg popup-${notification.type}`}>
                        {notification.type === 'success' ? <CheckCircle size={18} /> : <Trash2 size={18} />}
                        {notification.message}
                    </div>
                )}
            </div>
            <Footer minimal />
        </div>
    );
};

export default Dashboard;
