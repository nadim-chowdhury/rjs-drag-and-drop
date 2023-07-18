import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Contact() {
  const [data, setData] = useState([]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const newData = Array.from(data);
    const [removed] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, removed);

    setData(newData);
  };

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

  return (
    <div>
      <h1 className="text-center my-4">This is Contact</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dropabble">
          {(provided) => (
            <table ref={provided.innerRef} {...provided.droppableProps}>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>

              <tbody>
                {data.map((d, i) => (
                  <Draggable key={d.id} draggableId={d.id.toString()} index={i}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
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
