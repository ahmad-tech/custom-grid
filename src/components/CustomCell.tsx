import React from "react";

interface CustomCellProps {
    rowIndex: number;
    value: string;
    data: any;
  }

const CustomCell: React.FC<CustomCellProps> = ({ value, data, rowIndex }) => {
  return (
    <div style={{ color: "red", fontWeight: "bold" }}>
      {value}
    </div>
  );
};

export default CustomCell;
