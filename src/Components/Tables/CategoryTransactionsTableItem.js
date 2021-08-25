import {
    TableRow,
    TableCell

} from '@material-ui/core'


function CategoryTransactionsTableItem({name, date, amount}) {
    return (
        <TableRow>
            <TableCell
                align="left"
            >
                {name}
            </TableCell>
            <TableCell
                align="right"
            >
                ${amount}
            </TableCell>
            <TableCell
                align="right"
            >
                {date}
            </TableCell>
        </TableRow>
    );
}

export default CategoryTransactionsTableItem;