import { Locator } from '@playwright/test';
import Component from './component';
export default class Footer extends Component {
    constructor(readonly locator: Locator) {
        super(locator);
      }
}
