class Ajax {

	constructor() {
		this.apiURL = new URL('http://localhost:8000/api/');
		this.token = "790f6f150492ebe24c6197f53ff10010";
		this.authentication = "cb75be4a34ce9222914c0555f6faaa8d";
	}

	async getPage(key) {
		let url = this.apiURL+"pages/"+key+"?token="+this.token;
		try {
			const response = await fetch(url, {
				method: "GET"
			});
			const json = await response.json();
			return json.data;
		}
		catch (err) {
			console.log(err);
			return false;
		}
	}

	async createPage() {
		let url = this.apiURL+"pages";
		try {
			const response = await fetch(url, {
				credentials: 'same-origin',
				method: "POST",
				body: JSON.stringify({
					token: this.token,
					authentication: this.authentication,
					type: "draft"
				}),
				headers: new Headers({
					'Content-Type': 'application/json'
				}),
			});
			const json = await response.json();
			return json.data.key;
		}
		catch (err) {
			console.log(err);
			return true;
		}
	}

	updatePage(key, title, content, tags, draft) {
		log('this.updatePage()', key);

		// Type
		let type = "published";
		if (draft) {
			type = "draft";
		}

		let url = this.apiURL+"pages/"+key
		return fetch(url, {
			credentials: 'same-origin',
			method: "PUT",
			body: JSON.stringify({
				token: this.token,
				authentication: this.authentication,
				title: title,
				content: content,
				tags: tags,
				type: type
			}),
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
		})
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			return json.data.key;
		})
		.catch(err => {
			console.log(err);
			return true;
		});
	}

	deletePage(key) {
		log('this.deletePage()', key);
		let url = this.apiURL+"pages/"+key
		return fetch(url, {
			credentials: 'same-origin',
			method: "DELETE",
			body: JSON.stringify({
				token: this.token,
				authentication: this.authentication
			}),
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
		})
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			return true;
		})
		.catch(err => {
			console.log(err);
			return true;
		});
	}

	async getTags() {
		let url = this.apiURL+"tags?token="+this.token;
		try {
			const response = await fetch(url, {
				method: "GET"
			});
			const json = await response.json();
			return json.data;
		}
		catch (err) {
			console.log(err);
			return false;
		}
	}

	async getTag(key) {
		let url = this.apiURL+"tags/"+key+"?token="+this.token;
		try {
			const response = await fetch(url, {
				method: "GET"
			});
			const json = await response.json();
			return json.data;
		}
		catch (err) {
			console.log(err);
			return false;
		}
	}

	async getPagesUntagged() {
		let parameters = {
			token: this.token,
			untagged: true,
			published: true,
			draft: true
		}
		let url = this.apiURL+"pages?"+$.param(parameters);
		try {
			const response = await fetch(url, {
				method: "GET"
			});
			const json = await response.json();
			return json.data;
		}
		catch (err) {
			console.log(err);
			return true;
		}
	}
}