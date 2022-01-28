export default class Object {
    constructor(properties) {
        const { id, position, sprite } = properties;
        this.id = id;
        this.position = position;
        this.mask = {
            width: undefined,
            height: undefined
        };
        // Llamar funcion create
        this.create();
    }
    create() { }
    /**
     * * Generate an unique id
     *
     * @return {string}
     */
    static idGenerator() {
        return "_" + Math.random().toString(36).substr(2, 9);
    }
    static defineGroup(groupName) {
        Object.instances[groupName] = [];
    }
    static getGroup(groupName) {
        return Object.instances[groupName];
    }
    /**
     * * Create an object
     *
     * @param {object} object
     * @param {position} object
     * @return {object}
     */
    static create(group, object, properties) {
        const obj = new object({
            id: Object.idGenerator(),
            position: properties.position,
            sprite: properties.sprite
        });
        // Push the object into the array
        Object.instances[group].push(obj);
        if (group == "players") {
            console.log("jugador");
        }
        return obj;
    }
    /**
     * * Destroy an object
     *
     * @param {object} object
     *
     * @return {void}
     */
    static destroy(object) {
        for (const [index, element] of Object.instances.entries()) {
            if (element.id === object.id) {
                Object.instances.splice(index, 1);
                break;
            }
        }
    }
}
Object.instances = {};
