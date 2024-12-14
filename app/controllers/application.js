// app/controllers/application.js
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked products = [];
  @tracked categories = [];
  @tracked isLoading = true;
  @tracked errorMessage = null;

  setData(data) {
    this.products = data.products || [];
    this.categories = data.categories || [];
    this.errorMessage = data.errorMessage || null;
    this.isLoading = false;
  }
}
