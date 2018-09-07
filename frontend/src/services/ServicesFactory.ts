export class ServicesFactory {
  private registredInstances: Instance[] = []

  public Register(type: Function, lifeCicle: InstanceLifeCicle): void {
    this.registredInstances.push({
      instance: null,
      lifeCicle:  lifeCicle,
      name: type.name
    })
  }

  public Instance<T>(activator: { new(): T }): T {
    let register = this.registredInstances.filter(a => a.name === activator.name)

    if (register) {
      if (register[0].lifeCicle === InstanceLifeCicle.Singleton)
        return register[0].instance = register[0].instance || new activator()
    }

    return new activator()
  }
}

export enum InstanceLifeCicle {
  Singleton,
  Transient
}

export interface Instance {
  instance: any
  name: string
  lifeCicle: InstanceLifeCicle
}