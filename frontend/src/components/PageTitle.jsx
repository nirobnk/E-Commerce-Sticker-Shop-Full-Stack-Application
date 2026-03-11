import React from "react";

export default function PageTitle({ title }) {
  return (
    <h1 className="text-2xl md:text-3xl font-primary font-extrabold text-center bg-gradient-to-r bg-primary bg-clip-text text-transparent mt-2 py-1">
      {title}
    </h1>
  );
}
