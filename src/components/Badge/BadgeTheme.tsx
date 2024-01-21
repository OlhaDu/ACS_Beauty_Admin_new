import { Container, Typography, styled } from "@mui/material";
import "/src/styles/variables.scss";

export const BadgeButtons = styled(Container)({
    display: 'flex',
    gap: 12,
    padding: '0!important'
})

export const BadgeButton = styled(Container)({
    padding: '7px 8px!important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 4,
    background: '#E8E6E6',
    color: '#5C5E60',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500
})

export const BadgeName = styled(Typography)({
    color:'#5C5E60',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 400,
    padding: '12px 2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
})