import { action, makeObservable, observable } from 'mobx';

import { BasePage } from './BasePage';
import { MainPageStore } from './MainPageStore';

export class PagesController {
  currentPage: BasePage;

  constructor() {
    this.currentPage = new MainPageStore(this);

    makeObservable(this, {
      currentPage: observable,
      next: action.bound,
    });
  }

  next(page: BasePage) {
    this.currentPage = page;
  }
}