import React from "react";
import PageTitle from "./PageTitle";

export default function PageHeading({ title, children }) {
  return (
    <div className="text-center max-w-[700px] mx-auto px-4 py-8 mb-8">
      <PageTitle title={title} />
      <p className="font-primary text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
        {children}
      </p>
    </div>
  );
}
