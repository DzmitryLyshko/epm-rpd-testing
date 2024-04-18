import { Locator } from '@playwright/test';
import Component from './component';

export default class WidgetsGrid extends Component {
    constructor(readonly locator: Locator) {
        super(locator);
      }
}
