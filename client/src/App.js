import React from 'react'

const App = () => {
	const [data, setData] = React.useState(null)

	React.useEffect(() => {
		fetch('/api/user')
			.then((res) => res.json())
			.then((data) => {
				setData(data)
			})
	}, [])

	console.log(data)

	return (
		<div>
			<p>users</p>
			<p>{!data ? 'Loading...' : data[0].name}</p>
		</div>
	)
}

export default App
