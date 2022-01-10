import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key) => {
	const { queryKey } = key;
	console.log(queryKey);
	const res = await fetch(`http://swapi.dev/api/planets/?page=${queryKey[2]}`);
	return res.json();
};

export const Planets = () => {
	const [page, setPage] = useState(1);
	const { data, status } = useQuery(
		['planets', 'hello, ninjas', page],
		fetchPlanets
	);
	// console.log(data, status);
	return (
		<div>
			<h2>Planets</h2>
			<button onClick={() => setPage(1)}>page 1</button>
			<button onClick={() => setPage(2)}>page 2</button>
			<button onClick={() => setPage(3)}>page 3</button>
			<p>{status}</p>
			{status === 'loading' && <div>Loading data...</div>}
			{status === 'error' && <div>Error fetching data</div>}
			{status === 'success' && (
				<div>
					{data.results.map((planet) => (
						<Planet key={planet.name} planet={planet} />
					))}
				</div>
			)}
		</div>
	);
};
