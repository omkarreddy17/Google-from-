import { useState, useEffect } from 'react';
import { fetchStudents } from '../services/api';

export default function AdminDashboard({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        setErrorMsg('Failed to load registered student data from database.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="dashboard-subtitle">Total Registrations: {students.length}</p>
        </div>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {loading ? (
        <div className="dashboard-info-msg">Loading registrations...</div>
      ) : errorMsg ? (
        <div className="dashboard-error-msg">{errorMsg}</div>
      ) : students.length === 0 ? (
        <div className="dashboard-info-msg">No student registrations found yet.</div>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>College</th>
                <th>Course</th>
                <th>Course Year</th>
                <th>Parent's Name</th>
                <th>Parent's Phone</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>
                    {`${student.first_name} ${student.middle_name ? student.middle_name + ' ' : ''}${student.last_name}`}
                  </td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td>
                  <td>{student.college}</td>
                  <td>{student.course}</td>
                  <td>{student.course_year || '-'}</td>
                  <td>{student.parent_name}</td>
                  <td>{student.parent_phone}</td>
                  <td>{formatDate(student.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
