import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [users, setUsers] = useState([]);

  console.log(users);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="container">
      <table className="table">
        <Droppable droppableId="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <Draggable draggableId="item1" index={0}>
              {(provided) => {
                users.map((user) => (
                  <tr
                    key={user.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <th>{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ));
              }}
            </Draggable>
          </tbody>
        </Droppable>
      </table>
    </div>
  );
}

export default App;
