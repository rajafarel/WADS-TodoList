
function TodoFilter({ setFilter }) {
    return (
      <div className="filter-select">
        <label htmlFor="filter">Filter tasks: </label>
        <select
            id="filter"
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border-gray-300 border rounded-md text-gray-700 py-1 px-2 my-4 leading-tight focus:outline-none focus:shadow-outline"
            >
            <option value="all">Show All Tasks</option>
            <option value="completed">Show Completed tasks</option>
            <option value="uncompleted">Show Uncompleted tasks</option>
        </select>

      </div>
    );
  }
  
  export default TodoFilter;
  