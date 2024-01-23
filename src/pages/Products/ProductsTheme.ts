import { Container, styled } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

export const ProductsWallpaper = styled(Container)({
  width: 1200,
  '& .MuiDataGrid-root':{
  color: '#5C5E60',
  fontFamily: 'Roboto',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  }
})

export const ProductTable = styled(Container)({
    height: 'auto',
    width: '100%',
    margin: '20px auto',
    padding: '0!important',
})

export const SubHeaderProduct = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '35px 0',
  padding: '0!important'
})

export const ProductsTable = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: ' #F8F0FB',
  },
  //   '& .MuiPaper-root-MuiPopover-paper-MuiMenu-paper' : {
  //     minHeight: '30px!important',
  //     color: 'red!important'
  // },
})

export const ButtonActions = styled(GridActionsCellItem)({
  backgroundColor: 'transparent',
  padding: '0 10px',
  '& .MuiSvgIcon-root': {
    width: 25,
    height: 25
  }
})

export const ProductsHeader = styled('div')({
  position: 'relative',
  zIndex: 3
})