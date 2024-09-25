const categoryRoutes = require("./category_routes");
const subCategoryRoute = require("./subcategory_routes");
const brandRoute = require("./brand_route");
const productRoute = require("./product_route");
const userRoute = require("./user_route");
const authRoute = require("./auth_route");
const reviewRoute = require("./review_route");
const wishlistRoute = require("./wishlist_route");
const addressRoute = require("./address_route");
const couponRoute = require("./coupon_route");
const cartRoute = require('./cart_route');


const mountRoutes = (app) => {
    app.use('/api/v1/categories', categoryRoutes);
    app.use('/api/v1/subcategories', subCategoryRoute);
    app.use('/api/v1/brands', brandRoute);
    app.use('/api/v1/products', productRoute);
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/reviews', reviewRoute);
    app.use('/api/v1/wishlist', wishlistRoute);
    app.use('/api/v1/addresses', addressRoute);
    app.use('/api/v1/coupons', couponRoute);
    app.use('/api/v1/cart', cartRoute);
};

module.exports = mountRoutes;