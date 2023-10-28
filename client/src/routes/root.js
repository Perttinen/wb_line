export default function Root() {
	return (
		<>
			<div id='sidebar'>
				<h1>Home</h1>
				<div>
					<form id='search-form' role='search'>
						<input
							id='q'
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='q'
						/>
						<div id='search-spinner' aria-hidden hidden={true} />
						<div className='sr-only' aria-live='polite'></div>
					</form>
					<form method='post'>
						<button type='submit'>New</button>
					</form>
				</div>
				<nav>
					<ul>
						<li>
							<a href={`/adduser`}>Add User</a>
						</li>
						<li>
							<a href={`/users`}>Users</a>
						</li>
					</ul>
				</nav>
			</div>
			<div id='detail'></div>
		</>
	)
}
