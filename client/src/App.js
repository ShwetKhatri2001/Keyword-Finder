import React, { Fragment, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [complete_results, setCompleteResults] = useState([]);
  const [partial_results, setPartialResults] = useState([]);

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`/?search=${search}`);

      const parseResponse = await response.json();

      setCompleteResults(parseResponse.complete_matches);
      setPartialResults(parseResponse.partial_matches);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div className="container">
        <h1 className="my-5 text-center">🌟 Keyword Finder 🌟</h1>
        <form className="d-flex" onSubmit={onSubmitForm}>
          <input
            type="text"
            name="name"
            placeholder="Search ..."
            className="form-control"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-success ml-3">Submit</button>
        </form>

        <h3 className="mt-5"> ⭐ Complete Matches</h3>
        {!complete_results || complete_results.length === 0 ? <p>No Complete Match Found</p> : 
        <table className="table my-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Keyword</th>
            </tr>
          </thead>
          <tbody>
            {complete_results.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.keyword}</td>
              </tr>
            ))}
          </tbody>
        </table>
        }

        <h3 className="mt-5"> ⭐ Partial Matches</h3>
        {!partial_results || partial_results.length === 0 ? <p>No Partial Match Found</p> :
        <table className="table my-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Keyword</th>
            </tr>
          </thead>
          <tbody>
            {partial_results.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.keyword}</td>
              </tr>
            ))}
          </tbody>
        </table>
        }

      </div>
    </Fragment>
  );
}

export default App;
