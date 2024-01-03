const showRows = (rowName) => {
    console.log(rowName)
}

export const RowsOnPageFilterData = [ 
    {
        rowName: '10',
        handler: () => showRows('10'),
    },
    {
        rowName: '20',
        handler: () => showRows('20'),
    },
    {
        rowName: '50',
        handler: () => showRows('50'),
    },
    {
        rowName: '100',
        handler: () => showRows('100'),
    }
]