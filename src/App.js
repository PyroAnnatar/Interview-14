import React, { useEffect, useState } from "react";
// import axios from "axios";

function App() {
  return <Pagination />;
}

const Pagination = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function fetchy() {
      try {
        console.log("fetching");
        const response = await fetch(
          "https://randomuser.me/api?results=19&format=pretty"
        );
        let data = await response.json();
        data = data.results.map((person) => ({
          name: `${person.name.first} ${person.name.last}`,
          age: person.registered.age,
          email: person.email,
        }));
        setData(data);
      } catch (error) {
        console.error("Whoopsie", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchy();
  }, []);
  console.log(data);

  return (
    <div>
      {isLoading ? <p>Loading..</p> : <Pages content={data} itemsPerPage={5} />}
    </div>
  );
};

const Pages = ({ content, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const total = Math.ceil(content.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const current = content.slice(start, end);
  // const someContent = content.slice(itemsPerPage - 5, itemsPerPage);

  function handlePageChange(page) {
    setCurrentPage(page);
  }
  return (
    <>
      <div className="grid grid-cols-3 font-bold place-items-center">
        {content.length > 0 &&
          Object.keys(content[0]).map((objKey) => (
            <span key={objKey}>{`${objKey[0].toUpperCase()}${objKey.slice(
              1
            )}`}</span>
          ))}
      </div>
      <div className="my-4 min-h-[120px]">
        {current.map((person, index) => (
          <div key={index} className="grid grid-cols-3 place-items-center ">
            <span>{person.name}</span>
            <span>{person.age}</span>
            <span>{person.email}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-center">
          {Array.from({ length: total }, (_, index) => index + 1).map(
            (page) => (
              <div key={page} className="inline p-2">
                <span
                  className={`${
                    currentPage === page
                      ? `text-blue-800`
                      : `text-blue-500  hover:text-blue-600`
                  } font-semibold cursor-pointer`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default App;
