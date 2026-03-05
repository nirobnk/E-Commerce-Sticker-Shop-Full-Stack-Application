import React from "react";
import PageTitle from "./PageTitle";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-3 font-primary">
      <PageTitle title="About StickerVault" />

      {/* Intro */}
      <div className="mt-9 space-y-6 text-small leading-5 text-gray-700 dark:text-gray-300">
        <p>
          StickerVault started with a simple idea — stickers should be more
          than just decoration. They’re a small way to express personality,
          creativity, and sometimes even a little humor.
        </p>

        <p>
          Whether it's on a laptop, water bottle, notebook, or phone case, the
          right sticker can say a lot about you. We created StickerVault to
          make it easier to find designs that actually feel personal.
        </p>

        <p>
          Our goal is simple: offer well-designed stickers that look great,
          last long, and make everyday items a little more fun.
        </p>
      </div>

      {/* Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-primary dark:text-light mb-10">
          What We Focus On
        </h2>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {/* Quality */}
          <div>
            <h3 className="text-lg font-semibold text-primary dark:text-light mb-3">
              Quality That Lasts
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-6">
              Our stickers are printed on durable vinyl with strong adhesive.
              They’re waterproof, scratch-resistant, and made to stay vibrant
              even after everyday use.
            </p>
          </div>

          {/* Designs */}
          <div>
            <h3 className="text-lg font-semibold text-primary dark:text-light mb-3">
              Designs People Actually Want
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-6">
              We try to keep our collection fun and relatable. From minimal
              designs to funny and quirky ones, there’s something for every
              kind of sticker lover.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold text-primary dark:text-light mb-3">
              A Simple Shopping Experience
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-6">
              We believe buying stickers should be simple and enjoyable. That’s
              why we focus on keeping the experience clean, easy, and
              straightforward.
            </p>
          </div>

          {/* Growing */}
          <div>
            <h3 className="text-lg font-semibold text-primary dark:text-light mb-3">
              Always Adding New Ideas
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-6">
              StickerVault is constantly growing. New designs and collections
              are added regularly so there’s always something new to discover.
            </p>
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-20 my-7 border-t border-gray-200 dark:border-gray-700 pt-10">
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-8 font-semibold">
          Thanks for stopping by StickerVault. We hope you find something that
          makes your laptop, notebook, or favorite gadget feel a little more
          like yours.
        </p>
      </div>
    </div>
  );
}