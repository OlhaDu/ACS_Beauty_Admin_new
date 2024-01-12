import { Button, Container, styled } from "@mui/material";

export const ProductsWallpaper = styled(Container)({
  '& ul li:hover': {
    lineHeight: 1.5,
  }
})

export const ProductNewProductButton = styled(Button)({
    borderRadius: 4,
    background: '#948AD0',
    width: '197',
    padding: '12px 9px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    color: 'white',
    '&:hover': {
      color: '#948AD0',
    }
  });

export const ProductTable = styled(Container)({
    height: 'auto',
    width: '100%',
    margin: 20,
})

export const SubHeaderProduct = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '35px 0'
})
