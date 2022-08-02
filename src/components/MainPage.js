import React, { useEffect, useState } from 'react';

const MainPage = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getUsers();
        getTasks();
    }, []);

    const getUsers = async () => {
        const data = await fetch('http://localhost:3001/users');
        const dataJSON = await data.json();
        console.log(dataJSON);
        setUsers(dataJSON);
    }

    const getTasks = async () => {
        const data = await fetch('http://localhost:3001/tasks/79af7da8-8f58-45db-91e8-7e8796ee0277');
        const dataJSON = await data.json();
        setTasks(dataJSON);
    }

    return (
        <div>
            <div>
                {users.map(user => (
                    <div>
                        {user.name}
                    </div>
                ))}
            </div>
            <div>
                {tasks.map(task => (
                    <div>
                        <div>
                            {task.title}
                        </div>
                        <div>
                            {task.completed === false ? "Complete" : "Incomplete"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;