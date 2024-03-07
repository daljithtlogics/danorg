export interface CollectionMenu {
	id: string;
	name: string;
	slug: string;
	position: number;
	children: CollectionMenu[];

	constructor(
		id: string,
		name: string,
		slug: string,
		position: number,
		children: CollectionMenu[] = []
	) {
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.position = position;
		this.children = children;
	}
}