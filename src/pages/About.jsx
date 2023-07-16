import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function About() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // If dropped outside a droppable area, do nothing
    }

    const { source, destination } = result;

    // Reorder the data array based on the drag and drop result
    const newData = Array.from(data);
    const [removed] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, removed);

    setData(newData); // Update the state with the reordered data
  };

  return (
    <div>
      <h1 className="text-center my-4">This is About</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <table ref={provided.innerRef} {...provided.droppableProps}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, index) => (
                  <Draggable
                    key={d.id}
                    draggableId={d.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <tr
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <th>{d.id}</th>
                        <td>{d.name}</td>
                        <td>{d.username}</td>
                        <td>{d.email}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
