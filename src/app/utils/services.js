import basePath from '../api/config/basePath';

const fetchProductDetail = async (id) => (
  new Promise(async (resolve, rejected) => {
    try {
      const response = await fetch(`${basePath}/api/products/${id}`);
      const data = await response.json();
  
      resolve(data);
    } catch (error) {
      rejected(error);
    }
  })
);

const fetchProductsList = async () => (
  new Promise(async (resolve, rejected) => {
    try {
      const response = await fetch(`${basePath}/api/products`);
      const data = await response.json();

      resolve(data);
    } catch (error) {
      rejected(error);
    }
  })
);

export {
  fetchProductsList,
  fetchProductDetail,
}
