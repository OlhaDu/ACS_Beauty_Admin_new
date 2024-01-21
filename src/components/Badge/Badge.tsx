import React from "react";
import { ProductElem } from "src/types";
import ClearIcon from '@mui/icons-material/Clear';
import { BadgeButton, BadgeButtons, BadgeName } from "./BadgeTheme";

const Badge = ({ elem }: { elem: ProductElem }) => {
  const { name, discount, hit, novelty } = elem;
  const productDiscount = +discount !== 0 ? true : null;

  const handleButtonEditBadge = async (badgeType: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Delete Badge:", badgeType);
  };

  return (
    <div>
      <BadgeName>{name}</BadgeName>
      <BadgeButtons>
        {hit && <BadgeButton>HIT <ClearIcon onClick={(event) => handleButtonEditBadge('hit', event)}/></BadgeButton>}
        {productDiscount && <BadgeButton>SALE <ClearIcon onClick={(event) => handleButtonEditBadge('discount', event)}/></BadgeButton>}
        {novelty && <BadgeButton>NEW <ClearIcon onClick={(event) => handleButtonEditBadge('novelty', event)}/></BadgeButton>}
      </BadgeButtons>
    </div>
  );
};

export default Badge;
