class Request {

	/* Authentication string for API requests. (Bearer Token) */
	static auth: string|null;

	/* Base URL for API requests. */
	static base: string = process.env.REACT_APP_API_BASE_URL + '/' + process.env.REACT_APP_API_VERSION;

	/* Holds standard headers and cache information for every fetch call. */
	static meta: any = {
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'no-cache'
	}

	/**
	 * Prepares the API call by adding authorisation headers.
	 */
	static prepare() {
		/*
		this.auth = (localStorage.getItem('SESSION') ?? null);

		if(this.auth !== null) {
			this.meta.headers['Authorization'] = 'Bearer ' + this.auth;
		}
		*/
	}

	/**
	 * Queues GET fetch requests to the specified API path.
	 * @param path string
	 * @returns Promise<any>
	 */
	static async get(path: string): Promise<any> {
		this.prepare();

		return await window.fetch(this.base + path,
			{
				method: 'GET',
				...this.meta
			});
	}

	/**
	 * Queues POST fetch requests to the specified API path.
	 * @param path string
	 * @param body string
	 * @returns Promise<any>
	 */
	static async post(path: string, body: object): Promise<any> {
		this.prepare();

		return await window.fetch(this.base + path,
			{
				method: 'POST',
				...this.meta,
				body: JSON.stringify(body)
			});
	}

	/**
	 * Queues PUT fetchh requests to the specified API path.
	 * @param path
	 * @param body
	 */
	static async put(path: string, body: string): Promise<any> {
		this.prepare();

		return await window.fetch(this.base + path,
			{
				method: 'PUT',
				...this.meta,
				body: JSON.stringify(body)
			});
	}

	/**
	 * Queues DELETE requests to the specified API path.
	 * @param path
	 */
	static async delete(path: string): Promise<any> {
		this.prepare();

		return await window.fetch(this.base + path,
			{
				method: 'DELETE',
				...this.meta
			});
	}

}

export default Request;