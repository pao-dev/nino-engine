import { position } from './interfaces/interfaces';

/**
 * Main object handler module
 * @module Entity
 */
export default class Entity {
  public static entities: any = {};
  public static entitiesCount: number = 0;

  public id: number;
  private mask: any;

  constructor(params: any) {
    const { id } = params;

    this.id = id;

    this.mask = {
      width: null,
      height: null
    };
  }
  public init(): void {}

  public static defineGroup(groupName: string): void {
    Entity.entities[groupName] = [];
  }

  public static getGroup(groupName: string): any {
    return Entity.entities[groupName];
  }

  /**
   * * Create an object
   *
   * @param {object} entity
   * @param {position} entity
   * @return {object}
   */
  public static create(group: string, entity: any, properties: any): any {
    const object = new entity({
      id: Entity.idGenerator(),
    });
    Entity.entities[group].push(object);
    return object;
  }

  /**
   * Destroy an object
   *
   * @param {object} object
   * @return {void}
   */
  public static destroy(object: any): void {
    for (const [index, element] of Entity.entities.entries()) {
      if (element.id === object.id) {
        Entity.entities.splice(index, 1);
        break;
      }
    }
  }

  /**
   * Generate an unique id
   *
   * @return {string}
   */
  private static idGenerator(): number {
    return ++Entity.entitiesCount;
  }
}
