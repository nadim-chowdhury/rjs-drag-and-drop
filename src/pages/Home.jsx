import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleSearch = () => {
    const filteredData = data.filter((usr) =>
      usr.name.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (key) => {
    if (key === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setData(sortedData);
  }, [sortBy, sortOrder]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(sea);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">This is Home</h1>

      <div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setQuery(e.target.value)}
          />
          <span
            className="input-group-text btn btn-primary"
            id="basic-addon2"
            onClick={handleSearch}
          >
            Search
          </span>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dropabble">
          {(provided) => (
            <table
              className="table"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">
                    Name{" "}
                    <span
                      className="border btn btn-primary"
                      onClick={() => handleSort("name")}
                    >
                      Sort
                    </span>
                  </th>
                  <th scope="col">Username</th>
                  <th scope="col">
                    Email{" "}
                    <span
                      className="border btn btn-primary"
                      onClick={() => handleSort("email")}
                    >
                      Sort
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <Draggable key={user.id} draggableId={user.id.toString()}>
                    {(provided) => (
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
