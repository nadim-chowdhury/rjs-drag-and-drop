import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDragEnd = () => {
    console.log("dragged");
  };

  return (
    <div className="container p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <ol className="list-group list-group-numbered">
          <Droppable droppableId="root" type="group">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.map((d, index) => (
                  <Draggable
                    key={d.id}
                    draggableId={d.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={d.id}
                        className="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{d.name}</div>
                          <p className="mb-0">{d.email}</p>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ol>
      </DragDropContext>
    </div>
  );
}

export default App;
