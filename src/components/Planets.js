import React, { useState } from 'react';
import { useQuery, usePaginatedQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key) => {
  const { queryKey } = key;
  console.log(queryKey);
  const res = await fetch(`http://swapi.dev/api/planets/?page=${queryKey[1]}`);
  return res.json();
};

export const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolveData, latestData, status } = usePaginatedQuery(
    ['planets', page],
    fetchPlanets
  );
  console.log(resolveData);
  return (
    <div>
      <h2>Planets</h2>
      {/* <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button> */}
      <p>{status}</p>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((prev) =>
                !latestData || !latestData.next ? prev : prev + 1
              )
            }
            disabled={!latestData || !latestData.next}
          >
            Next Page
          </button>
          <div>
            {resolveData.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
