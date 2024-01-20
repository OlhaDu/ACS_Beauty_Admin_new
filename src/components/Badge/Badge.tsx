import React from "react";

const Badge = ({ value, name }: {value: string, name: string}) => {
  return (
    <div>
      <p>{name}</p>
      <p>{value}</p>
    </div>
  );
};

export default Badge;
