import { Injectable } from '@angular/core'

@Injectable()
export class LocalStorageRepository {
  public set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return localStorage.getItem(key)
    }
  }

  public has(key: string): boolean {
    return this.get(key) != null
  }

  public remove(key: string) {
    localStorage.removeItem(key)
  }

  public clear() {
    localStorage.clear()
  }
}
