import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        fetch('https://fakestoreapi.com/products', {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }),
        fetch('https://fakestoreapi.com/products/categories', {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }),
      ]);

      if (!productResponse.ok || !categoryResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const products = await productResponse.json();
      const categories = await categoryResponse.json();
      console.log(products);

      return { products, categories };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { errorMessage: 'Failed to load data. Please try again later.' };
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    // Pass data to the controller after the model is set
    controller.setData({
      products: model.products || [],
      categories: model.categories || [],
      errorMessage: model.errorMessage || null,
    });
  }
}
