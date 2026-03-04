import React from "react";
import PageTitle from "./PageTitle";

export default function About() {
  const h3Style = "text-xl font-bold text-primary dark:text-light mb-3";
  const pStyle = "text-gray-700 dark:text-gray-300 text-base leading-relaxed";

  return (
    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-12 font-primary">
      <PageTitle title="About Us" />
      {/* About Us Content */}
      <p className="leading-7 mb-8 text-gray-700 dark:text-gray-300 text-lg">
        <span className="text-xl font-bold text-primary dark:text-light">
          StickerVault
        </span>{" "}
        is your premier destination for premium, high-quality stickers and
        creative designs. We're dedicated to bringing you the finest collection
        of stickers that combine artistic expression with exceptional
        durability!
      </p>

      {/* Why Choose Us Section */}
      <h2 className="text-3xl leading-10 font-bold text-primary dark:text-light mb-8">
        Why Choose StickerVault?
      </h2>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Feature: Premium Quality */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-smooth">
          <h3 className={h3Style}>🏆 Premium Quality</h3>
          <p className={pStyle}>
            We strive to provide every customer with the utmost satisfaction by
            delivering high-quality vinyl stickers crafted with care and
            precision.
          </p>
        </div>

        {/* Feature: Product Innovation */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-smooth">
          <h3 className={h3Style}>🚀 Product Innovation</h3>
          <p className={pStyle}>
            Our vinyl stickers feature a premium matte or glossy finish
            lamination and are made with advanced adhesive technology. Designed
            to withstand all weather conditions and resist scratches, our
            stickers are gentle enough to preserve the surface of your beloved
            gadgets.
          </p>
        </div>

        {/* Feature: Excellent Service */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-smooth">
          <h3 className={h3Style}>⭐ Excellent Service</h3>
          <p className={pStyle}>
            Customer satisfaction is our top priority, and we’re committed to
            delivering an exceptional shopping experience.
          </p>
        </div>

        {/* Feature: Designs You’ll Love */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-smooth">
          <h3 className={h3Style}>🎨 Designs You'll Love</h3>
          <p className={pStyle}>
            With over 1,000 designs, our collection ranges from relatable and
            seriously funny to delightfully quirky. And we’re just getting
            started—stay tuned for more exciting products and designs!
          </p>
        </div>
      </div>
    </div>
  );
}
