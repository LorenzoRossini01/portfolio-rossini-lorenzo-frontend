import { Injectable } from '@angular/core';

interface CacheRecord<T> {
  value: T;
  expiry: number; // timestamp in ms
}
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private getKey(key: string) {
    return `cache_${key}`;
  }

  set<T>(key: string, value: T, ttlMinutes = 60): void {
    const expiry = Date.now() + ttlMinutes * 60 * 1000;
    const record: CacheRecord<T> = { value, expiry };
    localStorage.setItem(this.getKey(key), JSON.stringify(record));
  }

  get<T>(key: string): T | null {
    const item = localStorage.getItem(this.getKey(key));
    if (!item) return null;

    try {
      const record: CacheRecord<T> = JSON.parse(item);
      if (Date.now() > record.expiry) {
        localStorage.removeItem(this.getKey(key));
        return null;
      }
      return record.value;
    } catch {
      localStorage.removeItem(this.getKey(key));
      return null;
    }
  }

  clear(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clearAll(): void {
    localStorage.clear();
  }
}
