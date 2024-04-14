export class HttpConnector {
	private url: string;
	private headers = { "Content-Type": "application/json" };

	constructor(url: string) {
		this.url = url;
	}

	async get(headers: any) {
		const response = await fetch(this.url, {
			headers: headers || this.headers,
		});
		return response.json();
	}

	async post(data: any, headers: any) {
		const response = await fetch(this.url, {
			method: "POST",
			headers: headers || this.headers,
			body: JSON.stringify(data),
		});
		return response.json();
	}

	async put(data: any, headers: any) {
		const response = await fetch(this.url, {
			method: "PUT",
			headers: headers || this.headers,
			body: JSON.stringify(data),
		});
		return response.json();
	}

	async delete(id: any, headers: any) {
		const response = await fetch(`${this.url}/${id}`, {
			method: "DELETE",
			headers: headers || this.headers,
		});
		return response.json();
	}
}
