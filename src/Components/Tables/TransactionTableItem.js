import {
    TableRow,
    TableCell

} from '@material-ui/core'


function TransactionsTableItem({name, date, amount}) {
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

export default TransactionsTableItem;