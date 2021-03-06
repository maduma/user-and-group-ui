import { Component, OnInit, Input} from '@angular/core';
import { Item, Action, Method } from '../item';
import { SetService } from '../set.service';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

function setInclude(items: Item[], searchItem: Item) {
  const index = items.findIndex(
    (item) => item.id === searchItem.id);
  return index !== -1;
}

function reduce(items1: Item[], items2: Item[]) {
  return items1.filter((item) => !setInclude(items2, item));
}

function sort(items: Item[]) {
  return items.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

function getIds(items: Item[]) {
  return items.map(item => item.id).sort();
}

function getHash(items: Item[]) {
  return getIds(items).join('');
}

function removeItem(items: Item[], item: Item) {
  const index = items.findIndex(
    (element) => element.id === item.id);
  if (index !== -1) {
    items.splice(index, 1);
  }
}

function diff(original: Item[], current: Item[]): Action[] {
  const actions: Action[] = [];
  current.map(item => {
    if (!setInclude(original, item)) {
      actions.push({'method': Method.Create, 'value': item});
    }
  });
  original.map(item => {
    if (!setInclude(current, item)) {
      actions.push({'method': Method.Delete, 'value': item});
    }
  });
  return actions;
}


@Component({
  selector: 'app-setedit',
  templateUrl: './setedit.component.html',
  styleUrls: ['./setedit.component.css']
})

export class SeteditComponent implements OnInit {

  items: Item[];
  searchItems: Item[];
  searchPattern: string;
  hash: string;
  isChanged: boolean;
  originalItems: Item[];
  changes: Action[] = [];
  private searchTerms = new Subject<string>();
  toto$: Observable<string>;

  constructor(private setService: SetService) { }

  ngOnInit(): void {
    this.setService.getItems()
      .subscribe(items => {
        this.items = items;
        sort(this.items);
        this.hash = getHash(this.items);
        this.isChanged = false;
        this.originalItems = this.items.slice();
      });
    this.searchPattern = '';
    this.toto$ = this.searchTerms.pipe(
      tap(term => console.log('log', term)),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.search(term)),
    );
    //this.getSearch('');
  }

  add(item: Item): void {
    this.items.push(item);
    this.searchItems = reduce(this.searchItems, this.items);
    sort(this.items);
    this.isChanged = this.hash !== getHash(this.items);
  }
  remove(item: Item): void {
    removeItem(this.items, item);
    sort(this.items);
    this.searchItems.push(item);
    sort(this.searchItems);
    this.isChanged = this.hash !== getHash(this.items);
  }

  search(pattern) {
    console.log('search' + pattern)
    this.setService.searchItems(pattern)
      .subscribe(items => {
        this.searchItems = items;
        this.searchItems = reduce(this.searchItems, this.items);
      sort(this.searchItems);
    });
    return of('');
  }
  
  getSearch(pattern): void {
    console.log('add', pattern)
    this.searchTerms.next(pattern);
  }

  cancel(): void {
    this.ngOnInit();
  }

  save(): void {
    const actions: Action[] = diff(this.originalItems, this.items);
    this.setService.save(actions);
    this.ngOnInit();
  }
}
