import { Injectable } from '@angular/core';
import { Item } from './item';
import { DEVELOPERS, PEOPLE } from './mock-set';
import { HttpClient, HttpHeaders } from '@angular/common/http';


function normalize(str: string) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}


@Injectable()
export class SetService {

  data: Item[];
  private url1 = 'api/developers';
  private url2 = 'api/people';

  constructor(private http: HttpClient) {
    this.data = DEVELOPERS;
  }

  getItems() {
    return this.http.get<Item[]>(this.url1);
  }

  searchItems(pattern: string) {
    pattern = normalize(pattern);
    return this.http.get<Item[]>(
      this.url2 + `/?name=${pattern}`);
    /*
    if (pattern.length === 0) {
      return PEOPLE;
    }
    return PEOPLE.filter(
      (item) => normalize(item.name)
        .includes(normalize(pattern))
    )
    */
  }

  save(actions) {
    console.log(actions);
    actions.map( action => {
      if (action.action === 'create') {
        console.log('create', action.value);
      }
      if (action.action === 'delete') {
        console.log('delete', action.value);
      }
    });
    /*
    const copy: Item[] = [];
    items.forEach((item) => copy.push(item));
    this.data = items;
    */
  }
}
