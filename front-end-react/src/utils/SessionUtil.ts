class SessionUtil {
	private sessionStorage: any;
	constructor() {
		if (!localStorage) {
			throw new Error('Current brower does not support Local Storage');
		}
		this.sessionStorage = sessionStorage;
	}
	public set(key: string, value: string): void {
		this.sessionStorage[key] = value;
	}
	public get(key: string): string {
		return this.sessionStorage[key];
	}

	public isContain(key: string): Boolean {
		return this.sessionStorage[key] ? true : false;
	}
	public setObject(key: string, value: any): void {
		this.sessionStorage[key] = JSON.stringify(value);
	}
	public getObject(key: string): any {
		return JSON.parse(this.sessionStorage[key] || null);
	}
	public remove(key: string): void {
		this.sessionStorage.removeItem(key);
	}
}

export default new SessionUtil();